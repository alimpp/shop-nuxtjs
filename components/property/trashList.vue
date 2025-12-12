<template>
  <BaseModal
    @close="close"
    :isOpen="isOpen"
    title="Trash List"
    text="Property Trash list"
    :hasFooter="false"
  >
    <template #icon>
      <BaseIcon name="solar:trash-bin-trash-linear" />
    </template>
    <template #content>
      {{ trashList }}
    </template>
  </BaseModal>
</template>

<script setup>
import { propertyController } from "@/controllers/Property";

const propertyStore = usePropertyStore();

const trashList = computed(() => {
  return propertyStore._state.trashList;
});

const emit = defineEmits(["close"]);
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const close = () => {
  emit("close");
};
</script>
