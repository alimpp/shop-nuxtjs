<template>
  <BaseModal
    @close="close"
    :isOpen="isOpen"
    :title="data.name"
    :text="data.phone"
    :hasFooter="false"
  >
    <template #icon>
      <BaseIcon name="entypo:address" />
    </template>

    <template #content>
      <div class="flex flex-column">
        <BaseCard
          class="flex flex-column py-10 px-10 mb-10 mt-10"
          v-for="data in info"
          :key="data.id"
        >
          <BaseFieldView label="Address Name" :content="data.name" />
          <BaseFieldView label="Address Content" :content="data.content" />
          <BaseFieldView label="Postal Code" :content="data.postalCode" />
          <BaseFieldView label="Created Time" :content="data.created_at" />
        </BaseCard>
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

  data: {
    type: Object,
    default: { name: '', phone: '' },
  },

  info: {
    type: Object,
    default: [],
  },
});

const close = () => {
  emit('close');
};
</script>
