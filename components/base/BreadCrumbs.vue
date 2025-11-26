<template>
  <div class="flex align-center w-100">
    <div class="w-40 flex align-center">
      <span
        class="f-s-12 color-primary"
        :class="{
          'f-s-11': getBreadCrumbSize == 'standard',
          'f-s-13': getBreadCrumbSize == 'semiBold',
          'f-s-15': getBreadCrumbSize == 'bold',
        }"
        >APPLICATION</span
      >
      <span class="px-4">/</span>
      <span
        class="f-s-12"
        :class="{
          'f-s-12': getBreadCrumbSize == 'standard',
          'f-s-14': getBreadCrumbSize == 'semiBold',
          'f-s-16': getBreadCrumbSize == 'bold',
        }"
        >{{ parent }}</span
      >
      <span class="px-4">/</span>
      <span
        class="f-s-12"
        :class="{
          'f-s-12': getBreadCrumbSize == 'standard',
          'f-s-14': getBreadCrumbSize == 'semiBold',
          'f-s-16': getBreadCrumbSize == 'bold',
        }"
        >{{ child }}</span
      >
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

const applicationStore = useApplicationStore();

const getBreadCrumbSize = computed(() => {
  return applicationStore._state.breadCrumb;
});
</script>
