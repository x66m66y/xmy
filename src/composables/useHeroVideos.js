import { nextTick, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { HERO_MEDIA } from '../constants/heroMedia'

export function useHeroVideos({ rootRef, yellowVideoRef, blueVideoRef }) {
  const active = reactive({ yellow: false, blue: false })
  const isHeroVisible = ref(true)
  const isDocumentVisible = ref(true)
  const schedulers = []
  let observer

  function createScheduler({ key, videoRef, initialDelay, repeatDelay }) {
    let timer = null
    let remaining = initialDelay
    let scheduledAt = 0
    let disposed = false
    let isPlaying = false

    const canRun = () => isHeroVisible.value && isDocumentVisible.value

    function clearTimer() {
      if (!timer) return
      window.clearTimeout(timer)
      timer = null
      remaining = Math.max(0, remaining - (Date.now() - scheduledAt))
    }

    function schedule(delay = remaining) {
      if (disposed || timer || isPlaying || !canRun()) return
      remaining = delay
      scheduledAt = Date.now()
      timer = window.setTimeout(play, delay)
    }

    async function play() {
      timer = null
      if (!canRun()) return
      const video = videoRef.value
      if (!video) return

      try {
        video.currentTime = 0
        active[key] = true
        isPlaying = true
        await video.play()
      } catch {
        isPlaying = false
        active[key] = false
        remaining = repeatDelay
        schedule(repeatDelay)
      }
    }

    function handleEnded() {
      isPlaying = false
      active[key] = false
      remaining = repeatDelay
      schedule(repeatDelay)
    }

    function sync() {
      const video = videoRef.value
      if (!video || disposed) return

      if (!canRun()) {
        clearTimer()
        if (isPlaying && !video.paused) video.pause()
        return
      }

      if (isPlaying) video.play().catch(() => {})
      else schedule(remaining)
    }

    function mount() {
      videoRef.value?.addEventListener('ended', handleEnded)
      schedule(initialDelay)
    }

    function dispose() {
      disposed = true
      clearTimer()
      videoRef.value?.removeEventListener('ended', handleEnded)
    }

    return { mount, sync, dispose }
  }

  function syncAmbientVideos() {
    const ambientVideos = rootRef.value?.querySelectorAll('[data-ambient]') ?? []
    ambientVideos.forEach((video) => {
      if (!isHeroVisible.value || !isDocumentVisible.value) video.pause()
      else video.play().catch(() => {})
    })
  }

  function syncAllVideos() {
    schedulers.forEach((scheduler) => scheduler.sync())
    syncAmbientVideos()
  }

  function handleVisibilityChange() {
    isDocumentVisible.value = !document.hidden
    syncAllVideos()
  }

  onMounted(async () => {
    await nextTick()
    isDocumentVisible.value = !document.hidden

    schedulers.push(
      createScheduler({ key: 'yellow', videoRef: yellowVideoRef, ...HERO_MEDIA.timing.yellow }),
      createScheduler({ key: 'blue', videoRef: blueVideoRef, ...HERO_MEDIA.timing.blue }),
    )
    schedulers.forEach((scheduler) => scheduler.mount())

    observer = new IntersectionObserver(
      ([entry]) => {
        isHeroVisible.value = entry.isIntersecting && entry.intersectionRatio > 0.15
        syncAllVideos()
      },
      { threshold: [0, 0.15, 0.5] },
    )
    observer.observe(rootRef.value)
    document.addEventListener('visibilitychange', handleVisibilityChange)
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    schedulers.forEach((scheduler) => scheduler.dispose())
    document.removeEventListener('visibilitychange', handleVisibilityChange)
  })

  return { active }
}
