<script setup>
import { ref } from 'vue'
import { HERO_MEDIA } from '../../constants/heroMedia'
import { useHeroVideos } from '../../composables/useHeroVideos'

const sceneRoot = ref(null)
const yellowVideo = ref(null)
const blueVideo = ref(null)

const { active } = useHeroVideos({
  rootRef: sceneRoot,
  yellowVideoRef: yellowVideo,
  blueVideoRef: blueVideo,
})
</script>

<template>
  <section ref="sceneRoot" class="hero-content" aria-labelledby="xmy-title">
    <h1 id="xmy-title" class="sr-only">XMY</h1>

    <div class="xmy-scene" aria-hidden="true">
      <span class="contact-shadow shadow-pink"></span>
      <span class="contact-shadow shadow-purple"></span>
      <span class="contact-shadow shadow-green"></span>

      <video class="character character-teal" data-ambient autoplay loop muted playsinline preload="auto">
        <source :src="HERO_MEDIA.ambient.teal" type="video/webm" />
      </video>

      <svg class="xmy-word" viewBox="0 0 1160 325" role="presentation">
        <g fill="#1d1d1f">
          <path d="M18 0h112l54 91L238 0h112L242 161l112 164H240l-56-94-58 94H12l114-164z" />
          <path d="M395 325V0h93l90 145L668 0h94v325h-91V149l-72 116h-42l-72-116v176z" />
          <path d="M805 0h112l69 116L1055 0h112l-130 204v121H936V204z" />
        </g>
      </svg>

      <video class="character character-pink" data-ambient autoplay loop muted playsinline preload="auto">
        <source :src="HERO_MEDIA.ambient.pink" type="video/webm" />
      </video>
      <video class="character character-purple" data-ambient autoplay loop muted playsinline preload="auto">
        <source :src="HERO_MEDIA.ambient.purple" type="video/webm" />
      </video>
      <video class="character character-green" data-ambient autoplay loop muted playsinline preload="auto">
        <source :src="HERO_MEDIA.ambient.green" type="video/webm" />
      </video>
    </div>

    <p class="tagline">A little world that understands you</p>
  </section>

  <video
    ref="yellowVideo"
    class="giant-character giant-yellow"
    :class="{ 'is-active': active.yellow }"
    muted
    playsinline
    preload="auto"
    aria-hidden="true"
  >
    <source :src="HERO_MEDIA.giant.yellow" type="video/webm" />
  </video>
  <video
    ref="blueVideo"
    class="giant-character giant-blue"
    :class="{ 'is-active': active.blue }"
    muted
    playsinline
    preload="auto"
    aria-hidden="true"
  >
    <source :src="HERO_MEDIA.giant.blue" type="video/webm" />
  </video>

  <div class="scroll-cue" aria-hidden="true"><span></span>Meet your little world</div>
</template>

<style scoped src="../../assets/styles/components/hero-scene.css"></style>
