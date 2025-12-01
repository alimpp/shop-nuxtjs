<template>
  <div class="flex flex-column">
    <BaseBreadCrumbs>
      <BaseButton icon="solar:filter-linear" bg="bg-secondary-3" />
      <BaseButton
        :responsive="width < 650 ? true : false"
        name="Create Property"
        icon="line-md:plus"
        class="mx-8"
        @click="createPropertyState = true"
        :padding="width < 650 ? '0 5px' : '0 10px'"
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
            @remove="openRemoveConfrim"
            @edit="openEditPropertyModal"
          />
        </div>
      </div>
    </div>
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
      :isOpen="removeConfrimState"
      @cancel="removeConfrimState = false"
      @confrim="removeProperty"
      confrimText="Yes Remove Property"
      :type="lastTargetPropertyData.type"
      title="Remove Property?"
      text="Are you sure you want to delete the Property?"
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

const PropertyStore = usePropertyStore();

const dataSource = computed(() => {
  return PropertyStore.getList;
});

const moduleState = computed(() => {
  return PropertyStore.getModuleState;
});

const lastTargetPropertyData = ref({});

const removeConfrimState = ref(false);
const openRemoveConfrim = (data) => {
  lastTargetPropertyData.value = data;
  removeConfrimState.value = true;
};
const removeProperty = async () => {
  removeConfrimState.value = false;
  await propertyController.remove(lastTargetPropertyData?.value?.id);
};

const editPropertyModalState = ref(false);
const openEditPropertyModal = (data) => {
  lastTargetPropertyData.value = data;
  editPropertyModalState.value = true;
};

onMounted(async () => {
  await propertyController.list();
});
</script>
