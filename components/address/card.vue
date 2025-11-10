<template>
  <BaseCard class="flex flex-column px-10 py-10">
    <div class="w-100 flex">
      <div class="w-40 flex align-start">
        <BaseDropMenu v-model:dropMenu="dropMenu">
          <div
            class="flex align-center color-secondary-1 cursor-pointer"
            @click="
              (emit('edit', { ...data, type: 'success' }), (dropMenu = false))
            "
          >
            <BaseIcon name="solar:pen-broken" size="20" />
            <span class="f-s-12 f-w-500 px-5 pt-5">Update Address</span>
          </div>
          <div
            class="flex align-center color-secondary-1 mt-10 cursor-pointer"
            @click="(emit('setDefault', data), (dropMenu = false))"
          >
            <BaseIcon name="solar:check-circle-broken" size="20" />
            <span class="f-s-12 f-w-500 px-5 pt-5">Set Default</span>
          </div>
          <div
            class="flex align-center color-danger-3 mt-10 cursor-pointer"
            @click="
              (emit('remove', { id: data.id, type: 'danger' }),
              (dropMenu = false))
            "
          >
            <BaseIcon name="solar:trash-bin-trash-linear" size="20" />
            <span class="f-s-12 f-w-500 px-5 pt-5">Remove Address</span>
          </div>
        </BaseDropMenu>
      </div>
      <div class="w-60 flex justify-end align-center color-primary-1">
        <span class="f-s-12 px-5" v-if="data.default">Default</span>
        <BaseIcon
          name="solar:check-circle-broken"
          size="20"
          v-if="data.default"
        />
      </div>
    </div>
    <span class="f-s-16 f-w-600 color-primary-1 pt-10">{{ data.name }}</span>
    <span class="f-s-14 f-w-500 py-5 color-gray-1">{{ data.content }}</span>
    <span class="f-s-14 f-w-500">{{ data.postalCode }}</span>
  </BaseCard>
</template>

<script setup>
const emit = defineEmits(['edit', 'remove']);
const props = defineProps({
  data: {
    type: Object,
    default: {},
  },
});

const dropMenu = ref(false);
</script>
