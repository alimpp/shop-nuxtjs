<template>
  <span
    :class="{
      'f-s-13': getTitleSize == 'standard',
      'f-s-16': getTitleSize == 'semiBold',
      'f-s-20': getTitleSize == 'bold',
    }"
  >
    <slot></slot>
  </span>
</template>

<script setup>
const props = defineProps({});

const applicationStore = useApplicationStore();

const getTitleSize = computed(() => {
  return applicationStore._state.title;
});
</script>
