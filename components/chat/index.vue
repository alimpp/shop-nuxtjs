<template>
    <div class="container" v-if="isOpen">
       <div 
        class="content flex flex-column slid-right-animation-8 w-380-px h-100-dvh"
        :class="{
            'bg-app-dark': appTheme == 'dark',
            'bg-app-light': appTheme == 'light',
        }"
       >
       <ChatHeader @close="emit('close')" />
       <ChatContent />
       <ChatInput />
       </div>
    </div>
</template>

<script setup>
const applicationStore = useApplicationStore();
const appTheme = computed(() => {
  return applicationStore._state.theme;
});

const emit = defineEmits(['close'])

const props = defineProps({
    isOpen: {
        type: Boolean,
        default: false
    }
})
</script>


<style scoped>
.container {
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

.content{
  border-radius: 0 15px 15px 0;
  background-repeat: no-repeat;
  background-position: center;
  background-size: calc();
  overflow: hidden;
}
</style>