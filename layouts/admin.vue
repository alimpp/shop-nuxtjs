<template>
  <LayoutsAdmin />
</template>

<script setup>
import { adminController } from '@/controllers/Admin';
import { applicationController } from '../controllers/Application';

onMounted(async () => {
  await adminController.getInfo();
  await applicationController.getStyles('admin');
});
</script>
