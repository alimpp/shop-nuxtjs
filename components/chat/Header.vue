<template>
    <div 
     class="w-100 h-10-dvh chat-header flex align-center"
     :class="{
      'bg-dark': appTheme == 'dark',
      'bg-app-light': appTheme == 'light',
    }"
    >
   <div class="w-50 flex align-center px-10">
      <BaseAvatar :character="info.name[0]"  />
      <div class="flex flex-column px-10 justify-center">
         <span class="f-s-12 f-w-500">{{ info.name }}</span>
         <span class="f-s-10 f-w-100">{{ info.sub }}</span>
      </div>
   </div>
   <div class="w-50 flex align-center justify-end px-10">
    <BaseIcon name="line-md:menu-to-close-alt-transition" @click="emit('close')" />
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
    loading: {
        type: Boolean,
        default: false
    },
    info: {
        type: Object,
        default: {}
    }
})
</script>

<style scoped>
.chat-header {
    border-radius: 0 0 20px 20px ;
}
</style>