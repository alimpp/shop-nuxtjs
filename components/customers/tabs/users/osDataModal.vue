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
        <div class="flex flex-column mt-5 mb-5">
          <span class="f-s-15 f-w-500 color-primary-1">Cores</span>
          <span class="f-s-12 f-w-500">{{ info.cores }}</span>
          <BaseDivider class="mt-5" />
        </div>
        <div class="flex flex-column mt-5 mb-5">
          <span class="f-s-15 f-w-500 color-primary-1">Memory Total</span>
          <span class="f-s-12 f-w-500">{{ info.memory.total }}</span>
          <BaseDivider class="mt-5" />
        </div>
        <div class="flex flex-column mt-5 mb-5">
          <span class="f-s-15 f-w-500 color-primary-1">Memory Used</span>
          <span class="f-s-12 f-w-500">{{ info.memory.used }}</span>
          <BaseDivider class="mt-5" />
        </div>
        <div class="flex flex-column mt-5 mb-5">
          <span class="f-s-15 f-w-500 color-primary-1">Memory Limit</span>
          <span class="f-s-12 f-w-500">{{ info.memory.limit }}</span>
          <BaseDivider />
        </div>
        <div class="flex flex-column mt-5 mb-5">
          <span class="f-s-15 f-w-500 color-primary-1">Platform</span>
          <span class="f-s-12 f-w-500">{{ info.platform }}</span>
          <BaseDivider class="mt-5" />
        </div>
        <div class="flex flex-column mt-5 mb-5">
          <span class="f-s-15 f-w-500 color-primary-1">User Agent</span>
          <span class="f-s-12 f-w-500">{{ info.userAgent }}</span>
          <BaseDivider class="mt-5" />
        </div>
        <div class="flex flex-column mt-5 mb-5">
          <span class="f-s-15 f-w-500 color-primary-1">Device Memory</span>
          <span class="f-s-12 f-w-500">{{ info.deviceMemory }}</span>
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
    default: {},
  },
});

const close = () => {
  emit('close');
};
</script>
