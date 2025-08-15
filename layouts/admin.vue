<template>
  <LayoutsAdmin />
</template>

<script setup>
import { adminController } from "@/controllers/Admin";

onMounted(async () => {
  await adminController.getInfo();
});
</script>
