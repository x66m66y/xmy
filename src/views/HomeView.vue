<script setup>
import { ref } from 'vue'
import AppHeader from '../components/navigation/AppHeader.vue'
import HeroScene from '../components/hero/HeroScene.vue'
import AppMenuDrawer from '../components/overlays/AppMenuDrawer.vue'
import StoryDialog from '../components/overlays/StoryDialog.vue'

const menuOpen = ref(false)
const storyOpen = ref(false)
</script>

<template>
  <main class="hero-shell">
    <AppHeader
      @open-menu="menuOpen = true"
      @open-story="storyOpen = true"
    />
    <HeroScene />
    <AppMenuDrawer v-model="menuOpen" @open-story="storyOpen = true" />
    <StoryDialog v-model="storyOpen" />
  </main>
</template>

<style scoped src="../assets/styles/views/home-view.css"></style>
