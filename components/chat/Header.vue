<template>
  <div
    class="w-100 h-10-dvh chat-header flex align-center"
    :class="{
      'bg-dark-1': appTheme == 'dark',
      'bg-app-light': appTheme == 'light',
    }"
  >
    <div class="w-80 flex align-center px-10">
      <BaseAvatar
        width="50px"
        height="50px"
        :character="info.name[0]"
        avatar="/image/avatar.jpg"
      />
      <div class="flex flex-column px-10 justify-center">
        <span class="f-s-14 f-w-600">{{ info.name }}</span>
        <span class="f-s-11 f-w-100 pt-5">{{ info.sub }}</span>
      </div>
    </div>
    <div class="w-20 flex align-center justify-end px-10">
      <BaseIcon
        class="cursor-pointer"
        name="line-md:menu-to-close-alt-transition"
        @click="emit('close')"
      />
    </div>
  </div>
</template>

<script setup>
const applicationStore = useApplicationStore();
const appTheme = computed(() => {
  return applicationStore._state.theme;
});

const emit = defineEmits(['close']);

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  info: {
    type: Object,
    default: {},
  },
});
</script>
