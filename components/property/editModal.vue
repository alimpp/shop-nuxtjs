<template>
  <BaseModal
    @close="close"
    :isOpen="isOpen"
    title="Property"
    text="Create new Property"
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
        placeholder="Enter Property name"
        label="Property name"
      />
    </template>
    <template #footer>
      <div class="flex w-100 align-center py-5 px-5">
        <BaseButton
          name="Update Property"
          @click="editProperty"
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
import { propertyController } from "@/controllers/Property";

const emit = defineEmits(["close"]);
const props = defineProps({
  type: {
    type: String,
    default: "",
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
    name: "",
  };
  access.value = false;
  loading.value = false;
  emit("close");
};

const access = ref(false);
const loading = ref(false);

const editProperty = async () => {
  loading.value = true;
  const bodyRequest = {
    name: props.form.name,
  };
  emit("close");
  await propertyController.editProperty(props.form.id, bodyRequest);
  close();
};

const disabled = computed(() => {
  return !access.value || !props.form.name ? true : false;
});
</script>
