<template>
  <div class="flex content" :class="{ 'mx-5': count != 0 }">
    <BaseIcon
      class="cursor-pointer mx-5"
      name="solar:bell-outline"
      width="25"
      height="25"
      v-if="!sideMenuState"
    />
    <div
      v-if="count != 0 && !sideMenuState"
      class="f-s-12 bg-danger-3 flex align-center justify-center w-20-px h-20-px border-circle counter-style"
    >
      {{ count }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  sideMenuState: { default: false },
  count: { default: 0 },
});
</script>

<style scoped>
.content {
  position: relative;
}

.counter-style {
  position: absolute;
  z-index: 90;
  top: 10;
  left: 20px;
}
</style>
