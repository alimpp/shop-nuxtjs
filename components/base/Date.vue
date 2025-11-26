<template>
  <span
    :class="{
      'f-s-10': getDateSize == 'standard',
      'f-s-12': getDateSize == 'semiBold',
      'f-s-14': getDateSize == 'bold',
    }"
  >
    <slot></slot>
  </span>
</template>

<script setup>
const props = defineProps({});

const applicationStore = useApplicationStore();

const getDateSize = computed(() => {
  return applicationStore._state.date;
});
</script>
