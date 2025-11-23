<template>
  <span
    :class="{
      'f-s-11': getSubTitleSize == 'standard',
      'f-s-13': getSubTitleSize == 'semiBold',
      'f-s-16': getSubTitleSize == 'bold',
    }"
  >
    <slot></slot>
  </span>
</template>

<script setup>
const props = defineProps({});

const applicationStore = useApplicationStore();

const getSubTitleSize = computed(() => {
  return applicationStore._state.subTitle;
});
</script>
