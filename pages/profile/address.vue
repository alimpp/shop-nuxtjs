<template>
  <div class="w-100 flex flex-column">
    <div class="flex align-center w-100">
      <div class="flex align-center w-100">
        <BaseIcon name="entypo:address" size="30" />
        <span class="f-s-14 f-w-600 pt-10">All Your Address</span>
      </div>
      <div class="flex aligb-center">
        <BaseButton
          name="Add New Address"
          width="150px"
          icon="line-md:plus"
          @click="modalController"
        />
      </div>
    </div>
    <BaseDivider class="mt-10" />
    <BaseLoading text="Address waiting to loaded" />
    <AddressModalAdd :isOpen="modalState" @close="modalController" />
  </div>
</template>

<script setup>
const modalState = ref(false);
const modalController = () => {
  modalState.value = !modalState.value;
};
</script>
