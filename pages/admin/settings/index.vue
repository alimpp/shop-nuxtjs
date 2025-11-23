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
    <div class="flex align-center mt-10">
      <BaseButton
        :icon="getTextSize == 'standard' ? 'bi:patch-check' : ''"
        :bg="getTextSize == 'standard' ? 'bg-secondary-1' : 'bg-primary-1'"
        name="Standard"
        @click="setTextSize('standard')"
      />
      <BaseButton
        :icon="getTextSize == 'semiBold' ? 'bi:patch-check' : ''"
        :bg="getTextSize == 'semiBold' ? 'bg-secondary-1' : 'bg-primary-1'"
        name="Semi Bold"
        class="mx-10"
        @click="setTextSize('semiBold')"
      />
      <BaseButton
        :icon="getTextSize == 'bold' ? 'bi:patch-check' : ''"
        :bg="getTextSize == 'bold' ? 'bg-secondary-1' : 'bg-primary-1'"
        name="Bold"
        @click="setTextSize('bold')"
      />
    </div>
    <BaseText class="mt-10"
      >Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
      necessitatibus incidunt, sequi illum provid...</BaseText
    >
    <div class="flex align-center mt-10">
      <BaseButton
        :icon="getDescrptionSize == 'standard' ? 'bi:patch-check' : ''"
        :bg="
          getDescrptionSize == 'standard' ? 'bg-secondary-1' : 'bg-primary-1'
        "
        name="Standard"
        @click="setDescrptionSize('standard')"
      />
      <BaseButton
        :icon="getDescrptionSize == 'semiBold' ? 'bi:patch-check' : ''"
        :bg="
          getDescrptionSize == 'semiBold' ? 'bg-secondary-1' : 'bg-primary-1'
        "
        name="Semi Bold"
        class="mx-10"
        @click="setDescrptionSize('semiBold')"
      />
      <BaseButton
        :icon="getDescrptionSize == 'bold' ? 'bi:patch-check' : ''"
        :bg="getDescrptionSize == 'bold' ? 'bg-secondary-1' : 'bg-primary-1'"
        name="Bold"
        @click="setDescrptionSize('bold')"
      />
    </div>
    <BaseDescription class="mt-10"
      >Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
      necessitatibus incidunt, sequi illum provid...</BaseDescription
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

const setTextSize = async (param) => {
  applicationStore.setTextSize(param);
  await applicationController.updateStyle({ text: param });
};

const setDescrptionSize = async (param) => {
  applicationStore.setDescrptionSize(param);
  await applicationController.updateStyle({ descrption: param });
};

const getTitleSize = computed(() => {
  return applicationStore._state.title;
});

const getSubTitleSize = computed(() => {
  return applicationStore._state.subTitle;
});

const getTextSize = computed(() => {
  return applicationStore._state.text;
});

const getDescrptionSize = computed(() => {
  return applicationStore._state.descrption;
});
</script>
