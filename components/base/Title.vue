<template>
  <span
    :class="{
      'f-s-10': getTitleSize == 'standard',
      'f-s-12': getTitleSize == 'semiBold',
      'f-s-13': getTitleSize == 'bold',
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
