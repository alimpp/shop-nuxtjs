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
      <BaseFieldView label="Cores" :content="info.cores" />
      <BaseFieldView label="Memory Total" :content="info.memory.total" />
      <BaseFieldView label="Memory Used" :content="info.memory.used" />
      <BaseFieldView label="Memory Limit" :content="info.memory.limit" />
      <BaseFieldView label="Platform" :content="info.platform" />
      <BaseFieldView label="User Agent" :content="info.userAgent" />
      <BaseFieldView label="Device Memory" :content="info.deviceMemory" />
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
