<template>
  <div class="w-100 flex flex-column">
    <BaseBreadCrumbs />
    <div class="w-100 flex flex-wrap justify-center">
      <CategoryCard
        class="w-350-px mx-5 mt-10"
        v-for="data in dataSource"
        :key="data.id"
        :data="data"
      />
    </div>
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

const categoryStore = useCategoryStore();

const modalState = ref(false);
const modalController = () => {
  modalState.value = !modalState.value;
};

const dataSource = computed(() => {
  return categoryStore.getList;
});

onMounted(async () => {
  await categoryController.list();
});
</script>
