<template>
  <LayoutsShop />
</template>

<script setup>
import { notificationController } from '~/controllers/Notification';
import { userController } from "~/controllers/User";

onMounted(async () => {
  await userController.profile();
  notificationController.startPolling()
});
</script>
