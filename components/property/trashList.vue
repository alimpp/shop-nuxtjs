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
        <BaseEmptyState
          v-if="trashList.length == 0"
          title="Empty List"
          text="Trash List Is Empty"
        />
        <div class="w-385-px mt-10" v-for="item in trashList" v-else>
          <PropertyTrashCard :item="item" @restore="openRestoreConfrim" />
        </div>
      </div>
    </template>
  </BaseModal>

  <BaseConfrim
    :isOpen="confrimState"
    @cancel="confrimState = false"
    @confrim="trashProperty"
    confrimText="Yes Move To the Property"
    icon="solar:refresh-bold"
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

const confrimState = ref(false);
const openRestoreConfrim = (data) => {
  lastTargetPropertyData.value = data;
  confrimState.value = true;
};

const trashProperty = async () => {
  confrimState.value = false;
  await propertyController.restoreProperty(
    lastTargetPropertyData?.value?.id,
    false
  );
};

const close = () => {
  emit("close");
};
</script>
