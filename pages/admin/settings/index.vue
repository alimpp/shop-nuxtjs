<template>
  <div>
    <BaseBreadCrumbs></BaseBreadCrumbs>
    <SettingsForm />
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
