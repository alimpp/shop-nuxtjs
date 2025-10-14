<template>
  <div
    :class="[
      {
        'base-card-dark': appTheme == 'dark',
        'base-card-light': appTheme == 'light',
      },
    ]"
    v-if="dataSource.state"
    class="content-style w-100 h-15-dvh flex flex-column justify-center align-center slid-up-animation-3"
  >
    <BaseLoading :text="dataSource.text" :sub="dataSource.sub" />
  </div>
</template>

<script setup>
const dataStore = useApplicationStore();

const dataSource = computed(() => {
  return dataStore.getLoading;
});

const appTheme = computed(() => {
  return dataStore._state.theme;
});
</script>

<style scoped>
.content-style {
  z-index: 2000;
  position: fixed;
  bottom: 0;
  border-radius: 30px 30px 0 0;
}
</style>
