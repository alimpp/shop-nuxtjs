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
      class="w-340-px f-s-16 f-w-500"
      :class="{
        'color-dark-1': appTheme == 'white',
        'color-white': appTheme == 'dark',
      }"
      v-model="message"
    >
    </textarea>
    <div
      class="w-35-px h-35-px flex align-center justify-center bg-secondary-1 border-circle"
    >
      <baseIcon
        v-if="sendState == 'sending'"
        name="svg-spinners:90-ring"
        @click="send"
        class="cursor-pointer"
        size="25"
      />
      <baseIcon
        v-if="sendState == 'sended'"
        name="line-md:confirm-circle-filled"
        @click="send"
        class="cursor-pointer"
        size="25"
      />
      <baseIcon
        v-if="sendState == ''"
        name="line-md:arrow-up"
        @click="send"
        class="cursor-pointer"
        size="25"
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
  sendState: {
    type: String,
    default: '',
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
