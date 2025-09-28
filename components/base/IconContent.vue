<template>
  <div
    class="style"
    :class="[bgClass]"
    :style="{ width: `${width}`, height: `${height}` }"
  >
    <Icon :icon="name" :width="size" :height="size" :color="color" />
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue';

const props = defineProps({
  bgClass: {
    type: String,
    default: 'bg-primary-1',
  },
  width: {
    type: String,
    default: '30px',
  },
  height: {
    type: String,
    default: '30px',
  },
  name: { type: String, required: true },
  size: { type: [String, Number], default: 24 },
  color: { type: String, default: 'currentColor' },
});
</script>

<style scoped>
.style {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
}
</style>
