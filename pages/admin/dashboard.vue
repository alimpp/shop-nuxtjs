<template>
  <div class="w-100 flex flex-column">
    <BaseBreadCrumbs />
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth',
  layout: 'admin',
});

const route = useRoute();
const routeHistory = useRouteHistoryStore();

onMounted(() => {
  routeHistory.addHistory(route.path);
});
</script>

<style scoped>
.status-active {
  color: green;
  font-weight: bold;
}

.status-inactive {
  color: orange;
  font-weight: bold;
}

.btn-view {
  background: #17a2b8;
  color: white;
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: 3px;
  cursor: pointer;
}

.custom-empty {
  text-align: center;
  padding: 3rem;
  color: #6c757d;
}
</style>
