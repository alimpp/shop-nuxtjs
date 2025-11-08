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
      @edit="edit"
      @remove="remove"
    />
    <AddressCreateModal :isOpen="modalState" @close="modalController" />
    <AddressEditModal :isOpen="editModalodalState" :alreadyData="editData" @close="editModalController" />
  </div>
</template>

<script setup>
import { addressController } from '~/controllers/Address';

const modalState = ref(false);
const modalController = () => {
  modalState.value = !modalState.value;
};
const editModalodalState = ref(false);
const editModalController = () => {
  editModalodalState.value = !editModalodalState.value;
};

const addressStore = useAddressStore();

const dataSource = computed(() => {
  return addressStore.getList;
});

const setDefault = async (data) => {
  await addressController.setDefault(data.id, true);
};
const editData = ref({})
const edit =  (data) => {
     editModalodalState.value = !editModalodalState.value;
    editData.value = data
  
};
const remove = async (data) => {
  await addressController.remove(data.id);
};

onMounted(async () => {
  await addressController.list();
});
</script>
