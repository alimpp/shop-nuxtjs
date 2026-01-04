<template>
  <div class="flex flex-column">
    <BaseBreadCrumbs>
      <BaseButton
        icon="solar:trash-bin-minimalistic-broken"
        bg="bg-primary-3"
        color="color-primary-1"
        iconSize="22"
        padding="10px 7px"
        @click="getTrashList"
        :loading="trashListLoading"
      />
      <BaseButton
        :responsive="width < 650 ? true : false"
        icon="line-md:plus"
        class="mx-8"
        @click="createCategoryState = true"
        :padding="width < 650 ? '0 9px' : '0 10px'"
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
            @trash="openTrashConfirm"
            @edit="openEditCategoryModal"
          />
        </div>
      </div>
    </div>
    <CategoryTrashList
      :isOpen="trashListState"
      @close="trashListState = false"
    />
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
      :isOpen="trashConfirmState"
      @cancel="trashConfirmState = false"
      @confrim="trashCategory"
      confrimText="Yes Trash Category"
      :type="lastTargetCategoryData.type"
      title="Trash Category?"
      text="Are you sure you want to trash the category?"
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

const trashConfirmState = ref(false);
const openTrashConfirm = (data) => {
  lastTargetCategoryData.value = data;
  trashConfirmState.value = true;
};
const trashCategory = async () => {
  trashConfirmState.value = false;
  await categoryController.trashCategory(
    lastTargetCategoryData?.value?.id,
    true
  );
};

const editCategoryModalState = ref(false);
const openEditCategoryModal = (data) => {
  lastTargetCategoryData.value = data;
  editCategoryModalState.value = true;
};

const trashListState = ref(false);
const trashListLoading = ref(false);
const getTrashList = async () => {
  trashListLoading.value = true;
  await categoryController.trashList();
  trashListLoading.value = false;
  trashListState.value = true;
};

onMounted(async () => {
  await categoryController.list();
});
</script>
