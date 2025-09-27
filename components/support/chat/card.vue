<template>
  <div :dir="data.itsMe ? 'rtl' : 'ltr'">
    <div
      :class="{
        'its-me-style': data.itsMe,
        'not-its-me-style': !data.itsMe,
      }"
      class="mx-10 mt-10 px-15 py-10 flex flex-column card"
    >
      <span class="f-s-16 f-w-500" v-html="data.content"></span>
      <div class="flex justify-end mt-6">
        <span
          class="f-s-10 f-w-100 bg-danger-3 border-rounded px-5 mx-5"
          v-if="!data.seen && !data.itsMe"
          >New</span
        >
        <span class="f-s-10 f-w-100 color-gray">{{ data.created_at }}</span>
      </div>
    </div>
  </div>
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
  if (!props.data.seen && !props.data.itsMe) {
    emit('seen', props.data);
  }
});
</script>

<style scoped>
.card {
  width: fit-content;
  max-width: 300px;
  word-wrap: break-word; /* Break long words if needed */
  overflow-wrap: break-word; /* Modern alternative to word-wrap */
  white-space: normal;
}
.its-me-style {
  background: #e9dcdc;
  color: #303030;
  border-radius: 15px 2px 15px 15px;
}
.not-its-me-style {
  background: #2ef08f;
  color: #303030;
  border-radius: 2px 15px 15px 15px;
}
</style>
