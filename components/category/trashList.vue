<template>
  <BaseModal
    @close="close"
    :isOpen="isOpen"
    title="Trash List"
    text="Category Trash list"
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
          <CategoryTrashCard :item="item" @restore="openRestoreConfrim" />
        </div>
      </div>
    </template>
  </BaseModal>

  <BaseConfrim
    :isOpen="confrimState"
    @cancel="confrimState = false"
    @confrim="restoreCategory"
    confrimText="Yes Move To the Category"
    icon="solar:refresh-bold"
    :type="lastTargetCategoryData.type"
    title="Restore the Category?"
    text="Are you sure you want to Restore the Category?"
  ></BaseConfrim>
</template>

<script setup>
import { categoryController } from "@/controllers/Category";

const categoryStore = useCategoryStore();

const trashList = computed(() => {
  return categoryStore._state.trashList;
});

const emit = defineEmits(["close"]);
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const lastTargetCategoryData = ref({});

const confrimState = ref(false);
const openRestoreConfrim = (data) => {
  lastTargetCategoryData.value = data;
  confrimState.value = true;
};

const restoreCategory = async () => {
  confrimState.value = false;
  await categoryController.restoreCategory(
    lastTargetCategoryData?.value?.id,
    false
  );
};

const close = () => {
  emit("close");
};
</script>
