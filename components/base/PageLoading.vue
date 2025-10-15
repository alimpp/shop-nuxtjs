<template>
  <div
    v-if="dataSource.state"
    class="bg-secondary-1 content-style flex flex-column justify-center align-center slid-left-animation-3"
  >
    <BaseLoading :text="dataSource.text" :sub="dataSource.sub" />
  </div>
</template>

<script setup>
const dataStore = useApplicationStore();

const dataSource = computed(() => {
  return dataStore.getLoading;
});
</script>

<style scoped>
.content-style {
  max-width: 385px;
  max-height: 110px;
  width: 385px;
  min-height: 70px;
  z-index: 2000;
  position: fixed;
  bottom: 20px;
  right: 20px;
  border-radius: 15px;
}
</style>
