<template>
  <BaseCard class="flex flex-column px-15 py-15">
    <span class="f-s-17 f-w-600 color-primary-1">{{ data.name }}</span>
    <span class="f-s-14 f-w-500 py-10">{{ data.content }}</span>
    <span class="f-s-14 f-w-500">{{ data.postalCode }}</span>
    <div class="flex justify-end">
      <BaseIconContent
        bgClass="bg-primary-2"
        name="solar:pen-linear"
        size="20"
        class="mx-5 cursor-pointer"
      />
      <BaseIconContent
        bgClass="bg-danger-2"
        name="solar:trash-bin-minimalistic-linear"
        size="20"
        class="mx-5 cursor-pointer"
      />
    </div>
  </BaseCard>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: {},
  },
});
</script>
