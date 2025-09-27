<template>
  <BaseModal
    @close="close"
    :isOpen="isOpen"
    title="Category"
    text="Create new category"
  >
    <template #icon>
      <BaseIcon name="line-md:plus" />
    </template>
    <template #content>
      <div class="flex flex-column w-100 px-5 py-30">
        <BaseInput
          :validate="true"
          v-model:access="access"
          v-model="name"
          rules="length"
          min-length="3"
          max-length="15"
          class="w-100 mt-5"
          placeholder="Enter category name"
          label="Category name"
        />
      </div>
    </template>
    <template #footer>
      <div class="flex w-100 align-center py-5 px-5">
        <BaseButton
          name="Create category"
          @click="createCategory"
          width="130px"
          icon="gg:check-o"
          :loading="loading"
          :disabled="!access"
        />
        <BaseButton
          name="Cancel"
          @click="close"
          icon="line-md:close"
          class="mx-5"
          bg="bg-danger-3"
        />
      </div>
    </template>
  </BaseModal>
</template>

<script setup>
import { categoryController } from '@/controllers/Category';

const emit = defineEmits(['close']);
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const close = () => {
  name.value = '';
  access.value = false;
  loading.value = false;
  emit('close');
};

const access = ref(false);
const loading = ref(false);
const name = ref('');

const createCategory = async () => {
  loading.value = true;
  await categoryController.createCategory(name.value);
  loading.value = false;
  close();
};
</script>
