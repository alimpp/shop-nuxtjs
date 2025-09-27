<template>
  <BaseCard px="px-10">
    <div class="w-100 flex">
      <div class="flex flex-column w-70">
        <BaseIcon
          name="material-symbols-light:mail-outline-rounded"
          size="20"
          v-if="data.type == 'message'"
        />
        <span class="f-s-12 f-w-500 pt-10">{{ data.content }}</span>
      </div>
      <div class="flex flex-column align-end w-30">
        <span class="color-gray f-s-10 f-w-100 pt-5 px-5">{{
          data.created_at
        }}</span>
        <span
          class="bg-danger-3 border-rounded f-s-11 f-w-100 px-5 mt-15"
          v-if="!data.seen"
          >New</span
        >
      </div>
    </div>
  </BaseCard>
</template>

<script setup>
const emit = defineEmits(['seen']);
const props = defineProps({
  data: {
    type: Object,
    default: {},
  },
});

onMounted(() => {
  if (!props.data.seen) {
    emit('seen', props.data.id);
  }
});
</script>
