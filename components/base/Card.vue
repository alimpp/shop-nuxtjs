<template>
  <div
    class="border-rounded base-card"
    :class="[
      {
        'base-card-dark': appTheme == 'dark',
        'base-card-light': appTheme == 'light',
      },
      px,
      py,
    ]"
    :style="{ 'min-height': minHeight }"
  >
    <slot></slot>
  </div>
</template>

<script setup>
const applicationStore = useApplicationStore();
const appTheme = computed(() => {
  return applicationStore._state.theme;
});

const props = defineProps({
  bgClass: {
    type: String,
    default: '',
  },
  px: {
    type: String,
    default: 'px-5',
  },
  py: {
    type: String,
    default: 'py-5',
  },
  minHeight: { type: String, default: 'auto' },
});
</script>

<style scoped>
.base-card {
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  overflow: hidden;
}
</style>
