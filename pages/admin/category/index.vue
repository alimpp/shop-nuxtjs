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
        :padding="width < 650 ? '0 5px' : '0 10px'"
      />
    </BaseBreadCrumbs>

    <div class="flex flex-column mt-15">
      <BaseLoading
        text="Fetch List"
        sub="Fetching Category List Please Wait"
        v-if="moduleState == 'loading'"
      />
      <BaseEmptyState
        v-if="moduleState == 'empty'"
        title="Empty List"
        text="Category List Is Empty"
      />
      <div class="flex flex-wrap justify-center align-center w-100">
        <div
          class="w-385-px mt-10 mx-10"
          v-if="dataSource.length != 0"
          v-for="item in dataSource"
        >
          <CategoryCard
            :item="item"
            @remove="openRemoveConfrim"
            @edit="openEditCategoryModal"
          />
        </div>
      </div>
    </div>
    <CategoryCreateModal
      :isOpen="createCategoryState"
      @close="createCategoryState = false"
    />
    <CategoryEditModal
      type="edit"
      :isOpen="editCategoryModalState"
      @close="editCategoryModalState = false"
      :form="lastTargetCategoryData"
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
  </div>
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

const moduleState = computed(() => {
  return categoryStore.getModuleState;
});

const lastTargetCategoryData = ref({});

const removeConfrimState = ref(false);
const openRemoveConfrim = (data) => {
  lastTargetCategoryData.value = data;
  removeConfrimState.value = true;
};
const removeCategory = async () => {
  removeConfrimState.value = false;
  await categoryController.remove(lastTargetCategoryData?.value?.id);
};

const editCategoryModalState = ref(false);
const openEditCategoryModal = (data) => {
  lastTargetCategoryData.value = data;
  editCategoryModalState.value = true;
};

onMounted(async () => {
  await categoryController.list();
});
</script>
