<template>
  <div>
    {{ profile }}
    -----
    {{ userStore }}
  </div>
</template>

<script setup>
const userStore = useUserStore();

const profile = computed(() => {
  return userStore._state.user;
});
</script>
