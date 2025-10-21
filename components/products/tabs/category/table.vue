<template>
  <BaseTable :data="dataSource" :columns="columns" searchable showColumnToggle>
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
        <BaseIconContent
          bgClass="bg-secondary-2"
          name="solar:info-circle-linear"
          size="20"
          class="mx-5 cursor-pointer"
        />
      </div>
    </template>
  </BaseTable>
</template>

<script setup>
const categoryStore = useCategoryStore();

const columns = ref([
  { key: 'id', label: 'Category Id', sortable: true, visible: true },
  { key: 'created_at', label: 'Create Time', sortable: true, visible: true },
  { key: 'name', label: 'Name', sortable: true, visible: true },
  { key: 'submiter', label: 'Create By', sortable: true, visible: true },
]);

const dataSource = computed(() => {
  return categoryStore.getList;
});
</script>
