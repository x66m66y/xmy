<script setup>
const model = defineModel({ type: Boolean, default: false })
const emit = defineEmits(['open-story'])

function openStory() {
  model.value = false
  emit('open-story')
}
</script>

<template>
  <el-drawer v-model="model" direction="ltr" size="min(420px, 88vw)" class="xmy-drawer">
    <template #header><span class="drawer-mark">XMY</span></template>
    <nav class="drawer-links" aria-label="Menu">
      <a href="#" @click.prevent="model = false">Home <span>01</span></a>
      <a href="#" @click.prevent="openStory">Our Story <span>02</span></a>
      <a href="#" @click.prevent="model = false">Characters <span>03</span></a>
    </nav>
    <p class="drawer-note">A small corner of the universe,<br />made to understand you.</p>
  </el-drawer>
</template>
