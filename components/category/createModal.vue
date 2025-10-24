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
      <BaseInput
        :validate="true"
        v-model="form.name"
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
          name="Create category"
          @click="createCategory"
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
import { filesController } from '@/controllers/Files';
import { computed } from 'vue';

const emit = defineEmits(['close']);
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const close = () => {
  form.value = '';
  access.value = false;
  loading.value = false;
  emit('close');
};

const access = ref(false);
const loading = ref(false);
const loadingImage = ref(false);
const loadingIcon = ref(false);

const handleAccess = () => {
  access.value = !access.value;
};

const form = ref({
  name: '',
  imageId: '',
  iconId: '',
});
const preView = ref({
  image: '',
  icon: '',
});

// const createCategory = async () => {
//   loading.value = true;
//   await categoryController.createCategory(name.value);
//   loading.value = false;
//   close();
// };

const uploadImage = async (event) => {
  loadingImage.value = true;
  const serverResponse = await filesController.uploadFile(
    event.target.files[0],
  );
  if (serverResponse?.id) {
    preView.value.image = await filesController.downloadFileById(
      serverResponse.id,
    );
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
  }
  loadingIcon.value = false;
};

const handleUpload = () => {
  if (preView.value.image && preView.value.icon && form.value.name !== '') {
    console.log('filled');
    access.value = true;
  } else {
    console.log('not filled');
  }
};
</script>
