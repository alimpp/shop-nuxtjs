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
      {{ info }}
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
    default: {},
  },
});

const close = () => {
  emit('close');
};
</script>
