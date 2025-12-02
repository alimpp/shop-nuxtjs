<template>
  <div class="flex content" :class="{ 'mx-5': unReadCount != 0 }">
    <BaseIcon
      class="cursor-pointer mx-5"
      name="solar:bell-outline"
      width="25"
      height="25"
      v-if="!sideMenuState"
    />
    <div
      v-if="unReadCount != 0 && !sideMenuState"
      class="f-s-12 bg-danger-3 flex align-center justify-center w-20-px h-20-px border-circle counter-style"
    >
      {{ unReadCount }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ sideMenuState: { default: false } });
const supportStore = useSupportStore();

const unReadCount = computed(() => {
  return supportStore._state.unReadCount;
});
</script>

<style scoped>
.content {
  position: relative;
}

.counter-style {
  position: absolute;
  z-index: 100;
  top: 10;
  left: 20px;
}
</style>
