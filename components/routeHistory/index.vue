<template>
  <div class="horizontal-scroll">
    <div
      class="custom-style px-10 mx-2 h-30-px flex align-center custom-radius cursor-pointer"
      :class="{
        'bg-secondary-3': route.path == item.path,
        'color-secondary-1': route.path == item.path,
      }"
      v-for="item in dataSource"
      :key="item.id"
      @click="navigateTo(item.path)"
    >
      <BaseIcon :name="item.icon" size="15" />
      <BaseSubTitle class="pt-4 px-4">
        {{ item.name }}
      </BaseSubTitle>
    </div>
  </div>
</template>

<script setup>
import { navigateTo } from 'nuxt/app';

const route = useRoute();
const routeHistory = useRouteHistoryStore();

const dataSource = computed(() => {
  return routeHistory.history;
});
</script>

<style scoped>
@import url('@/assets/scss/theme_colors.scss');

.custom-style {
  border: 1px solid var(--secondary1-);
  color: var(--secondary1-);
}

.horizontal-scroll {
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
}

.horizontal-scroll::-webkit-scrollbar {
  display: none;
}

.item {
  flex: 0 0 auto;
  width: 150px;
  margin-right: 10px;
  padding: 12px;
  background-color: #f0f0f0;
  border-radius: 6px;
  text-align: center;
}

.custom-radius {
  border-radius: 100px;
}
</style>
