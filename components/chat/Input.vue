<template>
    <div 
    class="chat-input w-100 h-10-dvh flex align-center"
    :class="{
      'bg-dark': appTheme == 'dark',
      'bg-app-light': appTheme == 'light',
    }"
    >
      <textarea 
        placeholder="Enter message" 
        class="w-335-px f-s-16 f-w-500" 
        v-model="message">
      </textarea>
      <baseIcon 
        name="emojione-monotone:up-arrow" 
        @click="send"
      />
    </div>
</template>

<script setup>
const applicationStore = useApplicationStore();
const appTheme = computed(() => {
  return applicationStore._state.theme;
});

const message = ref('')

const emit = defineEmits(['send'])

const props = defineProps({
    sendLoading: {
        type: Boolean,
        default: false
    },
})

const send = () => {
  if(message.value) {
    emit('send', message)
  }
}
</script>

<style scoped>
.chat-input {
    border-radius: 20px 20px 0 0;
}
textarea {
    background: none;
    border: none;
    outline: none;
    color: #fff;
    resize: none;
}
</style>