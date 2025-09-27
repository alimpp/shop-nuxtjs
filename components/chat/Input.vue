<template>
  <div
    class="chat-input w-100 h-10-dvh flex align-center"
    :class="{
      'bg-dark-1': appTheme == 'dark',
      'bg-app-light': appTheme == 'light',
    }"
  >
    <textarea
      placeholder="Enter message"
      class="w-330-px f-s-16 f-w-500"
      :class="{
        'color-dark-1': appTheme == 'white',
        'color-white': appTheme == 'dark',
      }"
      v-model="message"
    >
    </textarea>
    <div class="w-70-px flex align-center justify-center">
      <baseIcon
        :name="
          sendLoading
            ? 'svg-spinners:eclipse-half'
            : 'emojione-monotone:up-arrow'
        "
        @click="send"
        class="cursor-pointer"
        size="40"
      />
    </div>
  </div>
</template>

<script setup>
const applicationStore = useApplicationStore();
const appTheme = computed(() => {
  return applicationStore._state.theme;
});

const message = ref('');

const emit = defineEmits(['send']);

const props = defineProps({
  sendLoading: {
    type: Boolean,
    default: false,
  },
});

const send = () => {
  if (message.value) {
    emit('send', { content: message.value, type: 'txt' });
    message.value = '';
  }
};
</script>

<style scoped>
textarea {
  background: none;
  border: none;
  outline: none;
  resize: none;
  padding-left: 15px;
}
textarea::-webkit-scrollbar {
  display: none;
}
</style>
