<template>
  <div class="flex flex-column">
    <BaseBreadCrumbs>
      <BaseButton icon="solar:filter-linear" bg="bg-secondary-3" />
      <BaseButton
        :responsive="width < 650 ? true : false"
        name="Create Category"
        icon="line-md:plus"
        class="mx-8"
        @click="createCategoryState = true"
      />
    </BaseBreadCrumbs>

    <div class="flex flex-column mt-15">
      <CategoryCard
        v-for="item in dataSource"
        :item="item"
        @remove="openRemoveConfrim"
        @edit="openEditConfrim"
      />
    </div>
  </div>

  <CategoryCreateModal
    :isOpen="createCategoryState"
    @close="createCategoryState = false"
  />

  <BaseConfrim
    :isOpen="removeConfrimState"
    @cancel="removeConfrimState = false"
    @confrim="removeCategory"
    confrimText="Yes Remove Category"
    :type="lastTargetCategoryData.type"
    title="Remove Category?"
    text="Are you sure you want to delete the category?"
  ></BaseConfrim>

  <BaseConfrim
    :isOpen="editConfrimState"
    @cancel="editConfrimState = false"
    @confrim="openEditCategoryModal"
    confrimText="Yes Edit Category"
    :type="lastTargetCategoryData.type"
    title="Edit Category?"
    text="Are you sure you want to edit the category?"
    icon="solar:ruler-pen-broken"
  ></BaseConfrim>
</template>

<script setup>
const { width } = useScreenSize();

import { categoryController } from '../../../controllers/Category';

definePageMeta({
  middleware: 'auth',
  layout: 'admin',
});

const createCategoryState = ref(false);

const categoryStore = useCategoryStore();

const dataSource = computed(() => {
  return categoryStore.getList;
});

const lastTargetCategoryData = ref({});

const removeConfrimState = ref(false);
const openRemoveConfrim = (data) => {
  lastTargetCategoryData.value = data;
  removeConfrimState.value = true;
};
const removeCategory = () => {
  removeConfrimState.value = false;
  console.log('lastTargetCategoryData', lastTargetCategoryData.value);
};

const editConfrimState = ref(false);
const openEditConfrim = (data) => {
  lastTargetCategoryData.value = data;
  editConfrimState.value = true;
};
const openEditCategoryModal = () => {
  editConfrimState.value = false;
  console.log('lastTargetCategoryData.value', lastTargetCategoryData.value);
};

onMounted(async () => {
  await categoryController.list();
});
</script>
