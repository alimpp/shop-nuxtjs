<template>
  <div class="flex flex-column">
    <BaseBreadCrumbs>
      <BaseButton
        icon="solar:trash-bin-minimalistic-broken"
        bg="bg-primary-3"
        color="color-primary-1"
        iconSize="22"
        padding="10px 7px"
      />
      <BaseButton
        :responsive="width < 650 ? true : false"
        name="Create Property value"
        icon="line-md:plus"
        class="mx-8"
        @click="createPropertyValueState = true"
        :padding="width < 650 ? '10px 9px' : '0 10px'"
      />
    </BaseBreadCrumbs>

    <div class="flex flex-column mt-15">
      <BaseLoading
        text="Fetch List"
        sub="Fetching Property Value List Please Wait"
        v-if="moduleState == 'loading'"
      />
      <BaseEmptyState
        v-if="moduleState == 'empty'"
        title="Empty List"
        text="Property Value List Is Empty"
      />
      <div class="flex flex-wrap justify-center align-center w-100">
        <div
          class="w-385-px mt-10 mx-10"
          v-if="dataSource.length != 0"
          v-for="item in dataSource"
        >
          <PropertyValueCard
            :item="item"
            @remove="openRemoveConfrim"
            @edit="openEditPropertyModal"
          />
        </div>
      </div>
    </div>
    <PropertyValueCreateModal
      :isOpen="createPropertyValueState"
      @close="createPropertyValueState = false"
    />
    <PropertyValueEditModal
      type="edit"
      :isOpen="editPropertyModalState"
      @close="editPropertyModalState = false"
      :form="lastTargetPropertyData"
    />
    <BaseConfrim
      :isOpen="removeConfrimState"
      @cancel="removeConfrimState = false"
      @confrim="removeProperty"
      confrimText="Yes Remove Property Value"
      :type="lastTargetPropertyData.type"
      title="Remove Property Value?"
      text="Are you sure you want to delete the Property Value?"
    ></BaseConfrim>
  </div>
</template>

<script setup>
const { width } = useScreenSize();

import { propertyController } from '../../../controllers/Property';
import { propertyValueController } from '../../../controllers/PropertyValue';

definePageMeta({
  middleware: 'auth',
  layout: 'admin',
});

const createPropertyValueState = ref(false);

const propertyValueStore = usePropertyValueStore();

const dataSource = computed(() => {
  return propertyValueStore.getList;
});

const moduleState = computed(() => {
  return propertyValueStore.getModuleState;
});

const lastTargetPropertyData = ref({});

const removeConfrimState = ref(false);
const openRemoveConfrim = (data) => {
  lastTargetPropertyData.value = data;
  removeConfrimState.value = true;
};
const removeProperty = async () => {
  removeConfrimState.value = false;
  await propertyValueController.remove(lastTargetPropertyData?.value?.id);
};

const editPropertyModalState = ref(false);
const openEditPropertyModal = (data) => {
  lastTargetPropertyData.value = data;
  editPropertyModalState.value = true;
};

const route = useRoute();
const routeHistory = useRouteHistoryStore();

onMounted(async () => {
  routeHistory.addHistory(route.path);
  await propertyValueController.list();
  await propertyController.list();
});
</script>
