<template>
  <div class="flex flex-column">
    <span class="f-s-13 f-w-500 color-primary-4" v-if="title">{{ title }}</span>
    <div
      class="style"
      :class="{ 'mt-5': title }"
      :style="{ width: width, height: height }"
    ></div>
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
.style {
  background: #c9b9b944;
}
</style>
