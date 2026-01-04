<template>
  <BaseModal
    @close="close"
    :isOpen="isOpen"
    title="Trash List"
    text="Property value Trash list"
    :hasFooter="false"
  >
    <template #icon>
      <BaseIcon name="solar:trash-bin-trash-linear" />
    </template>
    <template #content>
      <div class="flex flex-wrap justify-center align-center w-100">
        <div class="w-385-px mt-10 mx-10" v-for="item in trashList">
          <PropertyValueTrashCard :item="item" @restore="openRestoreConfrim" />
        </div>
      </div>
    </template>
  </BaseModal>
  <BaseConfrim
    :isOpen="restoreConfrimState"
    @cancel="restoreConfrimState = false"
    @confrim="restoreProperty"
    confrimText="Yes Move To the Property Value"
    :type="lastTargetPropertyValueData.type"
    title="Restore the Property value?"
    text="Are you sure you want to Restore the Property value?"
  ></BaseConfrim>
</template>

<script setup>
import { propertyValueController } from "@/controllers/PropertyValue";

const propertyValueStore = usePropertyValueStore();

const trashList = computed(() => {
  return propertyValueStore._state.trashList;
});

const emit = defineEmits(["close"]);
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const lastTargetPropertyValueData = ref({});

const restoreConfrimState = ref(false);
const openRestoreConfrim = (data) => {
  lastTargetPropertyValueData.value = data;
  restoreConfrimState.value = true;
};

const restoreProperty = async () => {
  restoreConfrimState.value = false;
  await propertyValueController.restorePropertyValue(
    lastTargetPropertyValueData?.value?.id,
    false
  );
};

const close = () => {
  emit("close");
};
</script>
