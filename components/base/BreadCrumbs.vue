<template>
  <div class="flex align-center w-100">
    <div class="w-40 flex align-center">
      <BaseTitle class="color-primary">APPLICATION</BaseTitle>
      <BaseTitle class="px-4">/</BaseTitle>
      <BaseTitle class="">{{ parent }}</BaseTitle>
      <BaseTitle class="px-4">/</BaseTitle>
      <BaseTitle class="">{{ child }}</BaseTitle>
    </div>
    <div class="flex justify-end w-60">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();

const parent = computed(() => {
  return route.path.split('/')[1].toUpperCase();
});

const child = computed(() => {
  return route.path.split('/')[2].toUpperCase();
});
</script>
