<template>
  <div class="chat-input w-100 h-10-dvh flex align-center">
    <textarea
      placeholder="Type message"
      class="w-340-px f-s-16 f-w-500"
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
.chat-input {
  background: rgba(255, 255, 255, 0.07);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(9.4px);
  color: #fff !important;
}
textarea::placeholder {
  color: #fff;
  opacity: 1; /* Important for Firefox */
}
textarea {
  background: none;
  border: none;
  outline: none;
  resize: none;
  padding-left: 15px;
  color: #fff !important;
}
textarea::-webkit-scrollbar {
  display: none;
}
</style>
