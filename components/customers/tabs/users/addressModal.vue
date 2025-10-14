<template>
  <BaseModal
    @close="close"
    :isOpen="isOpen"
    :title="data.name"
    :text="data.phone"
    :hasFooter="false"
  >
    <template #icon>
      <BaseIcon name="qlementine-icons:system-monitor-16" />
    </template>

    <template #content>
      <div class="flex flex-column">
        <div
          class="flex flex-column mt-5 mb-5"
          v-for="data in info"
          :key="data.id"
        >
          <span class="f-s-15 f-w-500 color-primary-1">Address Name</span>
          <span class="f-s-12 f-w-500">{{ data.name }}</span>
          <span class="f-s-15 f-w-500 color-primary-1">Address Content</span>
          <span class="f-s-12 f-w-500">{{ data.content }}</span>
          <span class="f-s-15 f-w-500 color-primary-1">Postal Code</span>
          <span class="f-s-12 f-w-500">{{ data.postalCode }}</span>
          <span class="f-s-15 f-w-500 color-primary-1">Created Time</span>
          <span class="f-s-12 f-w-500">{{ data.created_at }}</span>
          <BaseDivider class="mt-5" />
        </div>
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
