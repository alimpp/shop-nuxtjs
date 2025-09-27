<template>
  <BaseModal
    @close="close"
    :isOpen="isOpen"
    title="Address"
    text="Create new address"
  >
    <template #icon>
      <BaseIcon name="line-md:my-location" size="30" />
    </template>
    <template #content>
      <div class="flex flex-column w-100 px-5">
        <BaseInput
          validate="true"
          v-model:access="access"
          v-model="form.name"
          rules="length"
          min-length="3"
          max-length="20"
          class="w-100 mt-5"
          placeholder="Enter address name"
          label="Name"
        />
        <BaseInput
          validate="true"
          v-model:access="access"
          v-model="form.content"
          rules="length"
          min-length="15"
          max-length="100"
          class="w-100 mt-5"
          placeholder="Enter address content"
          label="Content"
        />
        <BaseInput
          validate="true"
          v-model:access="access"
          v-model="form.postalCode"
          rules="length"
          min-length="10"
          max-length="10"
          class="w-100 mt-5"
          placeholder="Enter address postal code"
          label="Postal Code"
          type="number"
        />
      </div>
    </template>
    <template #footer>
      <div class="flex w-100 align-center py-5 px-5">
        <BaseButton
          name="Create address"
          @click="create"
          width="130px"
          icon="gg:check-o"
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
const emit = defineEmits(['close']);
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const access = ref(false);
const loading = ref(false);
const form = ref({
  name: '',
  content: '',
  postalCode: '',
});

const disabled = computed(() => {
  return !access.value ||
    !form.value.name ||
    !form.value.content ||
    !form.value.postalCode
    ? true
    : false;
});

const close = () => {
  form.value = {
    name: '',
    content: '',
    postalCode: '',
  };
  access.value = false;
  loading.value = false;
  emit('close');
};

const create = async () => {
  loading.value = true;
  loading.value = false;
  close();
};
</script>
