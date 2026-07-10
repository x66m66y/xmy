<script setup>
import { ArrowDown, VideoPlay } from '@element-plus/icons-vue'

defineEmits(['open-menu', 'open-story'])
</script>

<template>
  <header class="topbar" aria-label="Primary navigation">
    <el-button class="menu-button" circle aria-label="Open menu" @click="$emit('open-menu')">
      <span class="menu-icon" aria-hidden="true"><i></i><i></i></span>
    </el-button>

    <div class="top-actions">
      <el-button class="story-button" :icon="VideoPlay" round @click="$emit('open-story')">
        <span class="desktop-label">Watch the Story</span>
        <span class="mobile-label">Story</span>
      </el-button>
      <el-button class="download-button" type="primary" round>
        <el-icon><ArrowDown /></el-icon>
        <span class="download-copy"><small>Discover the</small><strong>XMY App</strong></span>
      </el-button>
    </div>
  </header>
</template>

<style scoped src="../../assets/styles/components/app-header.css"></style>
