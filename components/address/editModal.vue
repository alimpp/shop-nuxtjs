<template>
  <BaseModal
    @close="close"
    :isOpen="isOpen"
    title="Address"
    text="Edit your address"
  >
    <template #icon>
      <BaseIcon name="entypo:address" size="30" />
    </template>
    <template #content>
      <BaseInput
        :validate="true"
        v-model:access="access"
        v-model="props.form.name"
        rules="length"
        min-length="3"
        max-length="20"
        class="w-100 mt-5"
        placeholder="Enter address name"
        label="Name"
      />
      <BaseInput
        :validate="true"
        v-model:access="access"
        v-model="props.form.content"
        rules="length"
        min-length="15"
        max-length="100"
        class="w-100 mt-5"
        placeholder="Enter address content"
        label="Content"
      />
      <BaseInput
        :validate="true"
        v-model:access="access"
        v-model="props.form.postalCode"
        rules="length"
        min-length="10"
        max-length="10"
        class="w-100 mt-5"
        placeholder="Enter address postal code"
        label="Postal Code"
        type="number"
      />
    </template>
    <template #footer>
      <div class="flex w-100 align-center py-5 px-5">
        <BaseButton
          name="Update address"
          @click="edit"
          icon="gg:check-o"
          :loading="loading"
          :disabled="disabled"
        />
        <BaseButton
          name="Cancel"
          icon="line-md:close"
          @click="close"
          class="mx-5"
          bg="bg-danger-2"
        />
      </div>
    </template>
  </BaseModal>
</template>

<script setup>
import { addressController } from '~/controllers/Address';

const emit = defineEmits(['close']);
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  form: {
    id: '',
    name: '',
    content: '',
    postalCode: '',
    userId: '',
  },
});

const access = ref(false);
const loading = ref(false);

const disabled = computed(() => {
  return !access.value ||
    !props.form.name ||
    !props.form.content ||
    !props.form.postalCode
    ? true
    : false;
});

const close = () => {
  props.form = {
    id: '',
    name: '',
    content: '',
    postalCode: '',
    userId: '',
  };
  access.value = false;
  loading.value = false;
  emit('close');
};

const edit = async () => {
  loading.value = true;
  await addressController.edit(props.form);
  loading.value = false;
  close();
};
</script>
