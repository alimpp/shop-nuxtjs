<template>
  <div class="flex flex-column">
    <BaseBreadCrumbs></BaseBreadCrumbs>
    <SwitchTheme />
    <BaseDivider class="mt-20" title="All Title Fonts Size" />
    <div class="flex align-center mt-10">
      <BaseButton
        :icon="getTitleSize == 'standard' ? 'bi:patch-check' : ''"
        :bg="getTitleSize == 'standard' ? 'bg-secondary-1' : 'bg-primary-1'"
        name="Standard"
        @click="setTitleSize('standard')"
      />
      <BaseButton
        :icon="getTitleSize == 'semiBold' ? 'bi:patch-check' : ''"
        :bg="getTitleSize == 'semiBold' ? 'bg-secondary-1' : 'bg-primary-1'"
        name="Semi Bold"
        class="mx-10"
        @click="setTitleSize('semiBold')"
      />
      <BaseButton
        :icon="getTitleSize == 'bold' ? 'bi:patch-check' : ''"
        :bg="getTitleSize == 'bold' ? 'bg-secondary-1' : 'bg-primary-1'"
        name="Bold"
        @click="setTitleSize('bold')"
      />
    </div>
    <BaseTitle class="mt-10"
      >Lorem ipsum dolor sit, amet consectetur adipisicing elit.</BaseTitle
    >
  </div>
</template>

<script setup>
const applicationStore = useApplicationStore();

definePageMeta({
  middleware: 'auth',
  layout: 'admin',
});

const setTitleSize = (param) => {
  applicationStore.setTitleSize(param);
};

const getTitleSize = computed(() => {
  return applicationStore._state.title;
});
</script>
