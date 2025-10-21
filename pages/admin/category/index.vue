<template>
  <div class="flex flex-column">
    <BaseBreadCrumbs>
      <BaseButton icon="solar:filter-linear" bg="bg-secondary-3" />
      <BaseButton
        :responsive="width < 650 ? true : false"
        name="Create Category"
        icon="line-md:plus"
        class="mx-8"
      />
    </BaseBreadCrumbs>
    <div class="flex flex-column mt-15">
      <CategoryCard v-for="item in dataSource" :item="item" />
    </div>
  </div>
</template>

<script setup>
const { width } = useScreenSize();

import { categoryController } from '../../../controllers/Category';

definePageMeta({
  middleware: 'auth',
  layout: 'admin',
});

const categoryStore = useCategoryStore();

const dataSource = computed(() => {
  return categoryStore.getList;
});

onMounted(async () => {
  await categoryController.list();
});
</script>
