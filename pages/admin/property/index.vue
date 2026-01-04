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
        @click="createPropertyState = true"
        :padding="width < 650 ? '10px 9px' : '0 10px'"
      />
    </BaseBreadCrumbs>
    <div class="flex flex-column mt-15">
      <BaseLoading
        text="Fetch List"
        sub="Fetching Property List Please Wait"
        v-if="moduleState == 'loading'"
      />
      <BaseEmptyState
        v-if="moduleState == 'empty'"
        title="Empty List"
        text="Property List Is Empty"
      />
      <div class="flex flex-wrap justify-center align-center w-100">
        <div
          class="w-385-px mt-10 mx-10"
          v-if="dataSource.length != 0"
          v-for="item in dataSource"
        >
          <PropertyCard
            :item="item"
            @trash="openTrashConfrim"
            @edit="openEditPropertyModal"
          />
        </div>
      </div>
    </div>
    <PropertyTrashList
      :isOpen="trashListState"
      @close="trashListState = false"
    />
    <PropertyCreateModal
      :isOpen="createPropertyState"
      @close="createPropertyState = false"
    />
    <PropertyEditModal
      type="edit"
      :isOpen="editPropertyModalState"
      @close="editPropertyModalState = false"
      :form="lastTargetPropertyData"
    />
    <BaseConfrim
      :isOpen="trashConfrimState"
      @cancel="trashConfrimState = false"
      @confrim="trashProperty"
      confrimText="Yes Move To Trash"
      :type="lastTargetPropertyData.type"
      title="Trash Property?"
      text="Are you sure you want to trash the Property?"
    ></BaseConfrim>
  </div>
</template>

<script setup>
const { width } = useScreenSize();

import { propertyController } from "../../../controllers/Property";

definePageMeta({
  middleware: "auth",
  layout: "admin",
});

const createPropertyState = ref(false);

const propertyStore = usePropertyStore();

const dataSource = computed(() => {
  return propertyStore.getList;
});

const moduleState = computed(() => {
  return propertyStore.getModuleState;
});

const lastTargetPropertyData = ref({});

const trashConfrimState = ref(false);
const openTrashConfrim = (data) => {
  lastTargetPropertyData.value = data;
  trashConfrimState.value = true;
};
const trashProperty = async () => {
  trashConfrimState.value = false;
  await propertyController.trashProperty(
    lastTargetPropertyData?.value?.id,
    true
  );
};

const editPropertyModalState = ref(false);
const openEditPropertyModal = (data) => {
  lastTargetPropertyData.value = data;
  editPropertyModalState.value = true;
};

const trashListState = ref(false);
const trashListLoading = ref(false);
const getTrashList = async () => {
  trashListLoading.value = true;
  await propertyController.trashList();
  trashListLoading.value = false;
  trashListState.value = true;
};

onMounted(async () => {
  await propertyController.list();
});
</script>
