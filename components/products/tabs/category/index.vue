<script setup>
import { categoryController } from '../../../../controllers/Category';

const modalState = ref(false);
const modalController = () => {
  modalState.value = !modalState.value;
};

onMounted(async () => {
  await categoryController.list();
});
</script>

<template>
  <CategoryModalAdd :isOpen="modalState" @close="modalController" />
</template>
