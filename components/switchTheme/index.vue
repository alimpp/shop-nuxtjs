<template>
  <div class="flex flex-column">
    <div class="flex mt-15">
      <span
        :class="{ 'bg-primary': appTheme == 'dark' }"
        class="flex align-center f-s-12 f-w-600 px-15 py-5 border-rounded cursor-pointer"
        @click="setTheme('dark')"
      >
        <BaseIcon width="18px" name="line-md:moon-loop" class="mx-5" />
        Dark
      </span>
      <span
        :class="{ 'bg-primary': appTheme == 'light' }"
        class="flex align-center f-s-12 f-w-600 px-15 py-5 border-rounded cursor-pointer mx-10"
        @click="setTheme('light')"
      >
        <BaseIcon width="18px" name="line-md:sun-rising-loop" class="mx-5" />
        Light
      </span>
    </div>
  </div>
</template>

<script setup>
const applicationStore = useApplicationStore();

const setTheme = (theme) => {
  applicationStore.setTheme(theme);
};

const appTheme = computed(() => {
  return applicationStore._state.theme;
});
</script>
