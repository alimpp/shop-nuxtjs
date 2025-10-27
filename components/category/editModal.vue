<template>
  <BaseModal
    @close="close"
    :isOpen="isOpen"
    title="Category"
    text="Create new category"
  >
    <template #icon>
      <BaseIcon name="solar:pen-broken" />
    </template>
    <template #content>
      <BaseInput
        :validate="true"
        v-model="props.form.name"
        v-model:access="access"
        rules="length"
        min-length="3"
        max-length="15"
        class="w-100 mt-5"
        placeholder="Enter category name"
        label="Category name"
      />
      <BaseUploadImage
        class="mt-10"
        title="Upload Category Image"
        @uploadImage="uploadImage"
        :loading="loadingImage"
        :previewImage="preView.image"
      />
      <BaseUploadImage
        class="mt-10"
        title="Upload Category Icon"
        @uploadImage="uploadIcon"
        :loading="loadingIcon"
        :previewImage="preView.icon"
      />
    </template>
    <template #footer>
      <div class="flex w-100 align-center py-5 px-5">
        <BaseButton
          name="Update category"
          @click="editCategory"
          icon="solar:pen-broken"
          :loading="loading"
          :disabled="disabled"
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
import { filesController } from '@/controllers/Files';

const emit = defineEmits(['close']);
const props = defineProps({
  form: {
    type: Object,
    default: {},
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const close = () => {
  props.form = {
    name: '',
    imageId: '',
    iconId: '',
  };
  preView.value = {
    image: '',
    icon: '',
  };
  access.value = false;
  loading.value = false;
  emit('close');
};

const access = ref(false);
const loading = ref(false);
const loadingImage = ref(false);
const loadingIcon = ref(false);

const form = ref({
  name: '',
  imageId: '',
  iconId: '',
});
const preView = ref({
  image: '',
  icon: '',
});

const editCategory = async () => {
  loading.value = true;
  await categoryController.editCategory(props.form.id, props.form);
  close();
};

const uploadImage = async (event) => {
  loadingImage.value = true;
  const serverResponse = await filesController.uploadFile(
    event.target.files[0],
  );
  if (serverResponse?.id) {
    preView.value.image = await filesController.downloadFileById(
      serverResponse.id,
    );
    props.form.imageId = serverResponse?.id;
  }
  loadingImage.value = false;
};

const uploadIcon = async (event) => {
  loadingIcon.value = true;
  const serverResponse = await filesController.uploadFile(
    event.target.files[0],
  );
  if (serverResponse?.id) {
    preView.value.icon = await filesController.downloadFileById(
      serverResponse.id,
    );
    props.form.iconId = serverResponse?.id;
  }
  loadingIcon.value = false;
};

const disabled = computed(() => {
  return !access.value ||
    !props.form.name ||
    !props.form.imageId ||
    !props.form.iconId
    ? true
    : false;
});
</script>
