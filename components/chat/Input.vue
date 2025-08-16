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
        class="w-330-px f-s-16 f-w-500" 
        v-model="message">
      </textarea>
      <div class="w-70-px flex align-center justify-center">
        <baseIcon 
          name="emojione-monotone:up-arrow" 
          @click="send"
          class="cursor-pointer"
        />
      </div>
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
}
textarea {
    background: none;
    border: none;
    outline: none;
    color: #fff;
    resize: none;
    padding-left: 15px;
}
textarea::-webkit-scrollbar {
  display: none;
}
</style>