<template>
  <div class="w-100 flex flex-column">
    <BaseBreadCrumbs />
    <BaseTab :tabs="tabs" initial-tab="0">
      <template #0>
        <CustomersTabsUsersTable />
      </template>
      <template #1> All Users Data . . . </template>
    </BaseTab>
  </div>
</template>

<script setup>
import { customersController } from '../../../controllers/Customers';

definePageMeta({
  middleware: 'auth',
  layout: 'admin',
});

const tabs = [
  {
    id: 0,
    label: 'All Customers',
    icon: 'solar:users-group-two-rounded-linear',
  },
  {
    id: 1,
    label: 'All Users Data',
    icon: 'solar:database-broken',
  },
];

const route = useRoute();
const routeHistory = useRouteHistoryStore();

onMounted(async () => {
  routeHistory.addHistory(route.path);
  await customersController.customersList();
});
</script>
