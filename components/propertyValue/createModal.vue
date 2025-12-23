<template>
  <BaseModal
    @close="close"
    :isOpen="isOpen"
    title="Property Value"
    text="Create new Property Value"
  >
    <template #icon>
      <BaseIcon name="line-md:plus" />
    </template>
    <template #content>
      <BaseSelect
        label="Property"
        placeholder="Select property"
        :items="propertyList"
        v-model="form.propertyId"
      />
      <BaseInput
        :validate="true"
        v-model="form.name"
        v-model:access="access"
        rules="length"
        min-length="3"
        max-length="15"
        class="w-100 mt-5"
        placeholder="Enter Property Value name"
        label="Property Value name"
      />
    </template>
    <template #footer>
      <div class="flex w-100 align-center py-5 px-5">
        <BaseButton
          name="Create Property Value"
          @click="createProperty"
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
import { propertyValueController } from '../../controllers/PropertyValue';

const propertyStore = usePropertyStore();

const propertyList = computed(() => {
  return propertyStore.getList;
});

const emit = defineEmits(['close']);
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const form = ref({
  name: '',
  propertyId: null,
});

const close = () => {
  form.value = {
    name: '',
  };
  access.value = false;
  loading.value = false;
  emit('close');
};

const access = ref(false);
const loading = ref(false);

const createProperty = async () => {
  loading.value = true;
  await propertyValueController.createPropertyValue({
    name: form.value.name,
    properttyId: form.value.propertyId.id,
    trash: false,
  });
  close();
};

const disabled = computed(() => {
  return !access.value && form.value.name && form.value.propertyId;
});
</script>
