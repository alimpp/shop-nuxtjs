<template>
  <div class="flex flex-column">
    <span class="f-s-13 f-w-500 color-primary" v-if="title">{{ title }}</span>
    <div class="color mt-5" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: '100%',
  },
  height: {
    type: String,
    default: '1px',
  },
});
</script>

<style scoped>
.color {
  background: #6a69692a;
}
</style>
