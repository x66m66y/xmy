<script setup>
const model = defineModel({ type: Boolean, default: false })
</script>

<template>
  <el-dialog v-model="model" width="min(560px, 90vw)" class="story-dialog" align-center>
    <div class="story-orbit"><span>X</span><span>M</span><span>Y</span></div>
    <h2>Every feeling has a place here.</h2>
    <p>XMY is a tiny animated world of curious companions — always nearby, always ready to listen.</p>
  </el-dialog>
</template>
