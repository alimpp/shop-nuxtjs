<template>
  <div class="w-100 flex flex-column">
    <BaseBreadCrumbs />
    <BaseFloatingButton @eventHandler="modalController" />
    <CategoryModalAdd :isOpen="modalState" @close="modalController" />
  </div>
</template>

<script setup>
import { categoryController } from '../../../controllers/Category';

definePageMeta({
  middleware: 'auth',
  layout: 'admin',
});

const modalState = ref(false);
const modalController = () => {
  modalState.value = !modalState.value;
};

onMounted(async () => {
  await categoryController.list();
});
</script>
