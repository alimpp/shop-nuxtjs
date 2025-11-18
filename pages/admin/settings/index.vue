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
    <BaseDivider class="mt-20" title="All Sub Title Fonts Size" />
    <div class="flex align-center mt-10">
      <BaseButton
        :icon="getSubTitleSize == 'standard' ? 'bi:patch-check' : ''"
        :bg="getSubTitleSize == 'standard' ? 'bg-secondary-1' : 'bg-primary-1'"
        name="Standard"
        @click="setSubTitleSize('standard')"
      />
      <BaseButton
        :icon="getSubTitleSize == 'semiBold' ? 'bi:patch-check' : ''"
        :bg="getSubTitleSize == 'semiBold' ? 'bg-secondary-1' : 'bg-primary-1'"
        name="Semi Bold"
        class="mx-10"
        @click="setSubTitleSize('semiBold')"
      />
      <BaseButton
        :icon="getSubTitleSize == 'bold' ? 'bi:patch-check' : ''"
        :bg="getSubTitleSize == 'bold' ? 'bg-secondary-1' : 'bg-primary-1'"
        name="Bold"
        @click="setSubTitleSize('bold')"
      />
    </div>
    <BaseSubTitle class="mt-10"
      >Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
      necessitatibus incidunt, sequi illum provid...</BaseSubTitle
    >
  </div>
</template>

<script setup>
import { applicationController } from '../../../controllers/Application';
const applicationStore = useApplicationStore();

definePageMeta({
  middleware: 'auth',
  layout: 'admin',
});

const setTitleSize = async (param) => {
  applicationStore.setTitleSize(param);
  await applicationController.updateStyle({ title: param });
};

const setSubTitleSize = async (param) => {
  applicationStore.setSubTitleSize(param);
  await applicationController.updateStyle({ subTitle: param });
};

const getTitleSize = computed(() => {
  return applicationStore._state.title;
});

const getSubTitleSize = computed(() => {
  return applicationStore._state.subTitle;
});
</script>
