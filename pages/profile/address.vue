<template>
  <div class="w-100 flex flex-column">
    <BaseLoading text="Address waiting to loaded" />
    <BaseFloatingButton @eventHandler="modalController" />
    <AddressModalAdd :isOpen="modalState" @close="modalController" />
  </div>
</template>

<script setup>
const modalState = ref(false);
const modalController = () => {
  modalState.value = !modalState.value;
};
</script>
