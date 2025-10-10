<template>
  <div class="chat-container" v-if="isOpen">
    <div
      class="content flex flex-column slid-right-animation-8 h-100-dvh"
      :class="{
        'bg-app-dark': appTheme == 'dark',
        'bg-app-light': appTheme == 'light',
        'w-100': width < 400,
        'w-400-px': width > 400,
      }"
    >
      <ChatHeader :info="info" :loading="loading" @close="emit('close')" />
      <BaseDivider />
      <ChatContent :messages="messages" :loading="loading" @seen="seen" />
      <BaseDivider />
      <ChatInput :sendLoading="sendLoading" @send="send" />
    </div>
  </div>
</template>

<script setup>
const applicationStore = useApplicationStore();
const appTheme = computed(() => {
  return applicationStore._state.theme;
});

const emit = defineEmits(['close', 'send', 'seen']);

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  sendLoading: {
    type: Boolean,
    default: false,
  },
  messages: {
    type: Array,
    default: [],
  },
  chatId: {
    type: String,
    default: '',
  },
  info: {
    type: Object,
    default: {},
  },
});

const send = (data) => {
  emit('send', data);
};

const seen = (data) => {
  emit('seen', data);
};

const { width } = useScreenSize();
</script>

<style scoped>
.chat-container {
  width: 100%;
  height: 100dvh;
  position: fixed;
  z-index: 1000;
  background: #00000096;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: start;
  align-items: center;
}

.content {
  background-repeat: no-repeat;
  background-position: center;
  background-size: calc();
  overflow: hidden;
}
</style>
