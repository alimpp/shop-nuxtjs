<script setup>
import { categoryController } from '../../../controllers/Category';

const modalState = ref(false);
const modalController = () => {
  modalState.value = !modalState.value;
};

onMounted(async () => {
  await categoryController.list();
});
</script>

<template>
  <div class="w-100 flex flex-column">
    <div id="topbar" class="w-100 flex justify-end">
      <BaseButton
        name="New Category"
        width="150px"
        icon="line-md:plus"
        @click="modalController"
      />
    </div>
    <ProductsTabsCategoryTable />
    <CategoryModalAdd :isOpen="modalState" @close="modalController" />
  </div>
</template>
