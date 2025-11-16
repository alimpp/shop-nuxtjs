<template>
  <div class="flex flex-column">
    <BaseTitle v-if="title" class="color-primary-4">{{ title }}</BaseTitle>
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
