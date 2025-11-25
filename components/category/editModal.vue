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
  type: {
    type: String,
    default: '',
  },
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

const preView = ref({
  image: '',
  icon: '',
});

const editCategory = async () => {
  loading.value = true;
  const bodyRequest = {
    iconId: props.form.iconId,
    imageId: props.form.imageId,
    name: props.form.name,
  };
  await categoryController.editCategory(props.form.id, bodyRequest);
  close();
};

const uploadImage = async (event) => {
  loadingImage.value = true;
  const serverResponse = await filesController.uploadFile(
    event.target.files[0]
  );
  if (serverResponse?.id) {
    access.value = true;
    props.form.imageId = serverResponse?.id;
    preView.value.image = await filesController.downloadFileById(
      serverResponse.id
    );
  }
  loadingImage.value = false;
};

const uploadIcon = async (event) => {
  loadingIcon.value = true;
  const serverResponse = await filesController.uploadFile(
    event.target.files[0]
  );
  if (serverResponse?.id) {
    access.value = true;
    props.form.iconId = serverResponse?.id;
    preView.value.icon = await filesController.downloadFileById(
      serverResponse.id
    );
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

watch(
  () => props.form.imageId || props.form.iconId,
  (n, o) => {
    preView.value.image = props.form.preViewImage;
    preView.value.icon = props.form.preViewIcon;
  },
  { deep: true }
);
</script>
