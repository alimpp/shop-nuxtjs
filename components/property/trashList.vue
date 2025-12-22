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
      <div class="flex flex-wrap justify-center align-center w-100">
        <div class="w-385-px mt-10 mx-10" v-for="item in trashList">
          <PropertyTrashCard :item="item" @remove="openRemoveConfrim" />
        </div>
      </div>
    </template>
  </BaseModal>
  <BaseConfrim
    :isOpen="removeConfrimState"
    @cancel="removeConfrimState = false"
    @confrim="trashProperty"
    confrimText="Yes Move To the Property"
    :type="lastTargetPropertyData.type"
    title="Restore the Property?"
    text="Are you sure you want to Restore the Property?"
  ></BaseConfrim>
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

const lastTargetPropertyData = ref({});

const removeConfrimState = ref(false);
const openRemoveConfrim = (data) => {
  lastTargetPropertyData.value = data;
  removeConfrimState.value = true;
};

const trashProperty = async () => {
  removeConfrimState.value = false;
  await propertyController.restoreProperty(
    lastTargetPropertyData?.value?.id,
    false
  );
};

const close = () => {
  emit("close");
};
</script>
