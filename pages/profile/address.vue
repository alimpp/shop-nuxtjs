<template>
  <div class="container">
    <div class="flex align-center w-100">
      <div class="flex align-center w-50">
        <BaseIcon name="entypo:address" size="30" />
        <span class="f-s-14 f-w-600 pt-10">All Your Address</span>
      </div>
      <div class="flex align-center justify-end w-50">
        <BaseButton
          name="Add New Address"
          icon="line-md:plus"
          @click="modalController"
        />
      </div>
    </div>
    <BaseDivider class="mt-10" />
    <BaseLoading
      :text="addressStore.getModuleState"
      v-if="addressStore.getModuleState == 'loading' || dataSource == []"
    />
    <AddressCard
      v-else
      class="mt-10"
      v-for="data in dataSource"
      :key="data.id"
      :data="data"
      @setDefault="setDefault"
      @edit="openEditAddressModal"
      @remove="openRemoveConfrim"
    />
    <AddressCreateModal :isOpen="modalState" @close="modalController" />
    <AddressEditModal
      :isOpen="editAddressModalState"
      :form="lastTargetAddressData"
      @close="editModalController"
    />
  </div>

  <BaseConfrim
    :isOpen="removeConfrimState"
    @cancel="removeConfrimState = false"
    @confrim="removeAddress"
    confrimText="Yes Remove Address"
    :type="lastTargetAddressData.type"
    title="Remove Address?"
    text="Are you sure you want to delete the Address?"
  ></BaseConfrim>
</template>

<script setup>
import { addressController } from "~/controllers/Address";

const modalState = ref(false);
const modalController = () => {
  modalState.value = !modalState.value;
};
const editAddressModalState = ref(false);
const editModalController = () => {
  editAddressModalState.value = false;
};

const addressStore = useAddressStore();

const dataSource = computed(() => {
  return addressStore.getList;
});

const setDefault = async (data) => {
  await addressController.setDefault(data.id, true);
};

const lastTargetAddressData = ref({});
const openEditAddressModal = (data) => {
  editAddressModalState.value = true;
  lastTargetAddressData.value = data;
};

const removeConfrimState = ref(false);
const openRemoveConfrim = (data) => {
  lastTargetAddressData.value = data;
  removeConfrimState.value = true;
};
const removeAddress = async () => {
  removeConfrimState.value = false;
  await addressController.remove(lastTargetAddressData?.value?.id);
};

onMounted(async () => {
  await addressController.list();
});
</script>
