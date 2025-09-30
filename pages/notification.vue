<template>
  <div class="container">
    <NotificationCard
      v-for="data in notificationList"
      :key="data.id"
      :data="data"
      class="mt-5"
      @seen="seen"
    />
  </div>
</template>

<script setup>
import { notificationController } from '~/controllers/Notification';
const notificationStore = useNotificationStore();

const notificationList = computed(() => {
  return notificationStore.getNotification;
});

const seen = (id) => {
  setTimeout(async () => {
    await notificationController.seen(id);
  }, 1000);
};

definePageMeta({
  middleware: 'auth',
});
</script>
