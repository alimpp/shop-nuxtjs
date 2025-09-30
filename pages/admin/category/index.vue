<template>
  <div class="w-100 flex flex-column">
    <BaseBreadCrumbs>
      <BaseButton
        name="New Category"
        width="150px"
        icon="line-md:plus"
        @click="modalController"
      />
    </BaseBreadCrumbs>
    <BaseTable
      :data="dataSource"
      :columns="columns"
      searchable
      showColumnToggle
    >
      <template #actions="{ row }">
        <div class="flex">
          <BaseIconContent
            bgClass="bg-primary-2"
            name="solar:pen-linear"
            size="20"
            class="mx-5 cursor-pointer"
          />
          <BaseIconContent
            bgClass="bg-danger-2"
            name="solar:trash-bin-minimalistic-linear"
            size="20"
            class="mx-5 cursor-pointer"
          />
        </div>
      </template>
    </BaseTable>
    <CategoryModalAdd :isOpen="modalState" @close="modalController" />
  </div>
</template>

<script setup>
import { categoryController } from '../../../controllers/Category';

definePageMeta({
  middleware: 'auth',
  layout: 'admin',
});

const columns = ref([
  { key: 'id', label: 'Category Id', sortable: true, visible: true },
  { key: 'created_at', label: 'Create Time', sortable: true, visible: true },
  { key: 'name', label: 'Name', sortable: true, visible: true },
  { key: 'submiter', label: 'Create By', sortable: true, visible: true },
]);

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
