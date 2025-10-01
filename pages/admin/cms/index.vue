<template>
  <div class="w-100 flex flex-column">
    <BaseBreadCrumbs />
    <BaseTab :tabs="tabs" initial-tab="0">
      <template #0>
        <CmsHero />
      </template>
      <template #1>
        <CmsBrands />
      </template>
      <template #2>
        <CmsBanners />
      </template>
      <template #3>
        <CmsServices />
      </template>
    </BaseTab>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth',
  layout: 'admin',
});

const tabs = [
  {
    id: 0,
    label: 'Hero',
    icon: 'pajamas:container-image',
  },
  {
    id: 1,
    label: 'Brands',
    icon: 'tabler:brand-stackoverflow',
  },
  {
    id: 2,
    label: 'Banners',
    icon: 'ph:flag-banner-fold-light',
  },
  {
    id: 3,
    label: 'My Services',
    icon: 'hugeicons:service',
  },
];
</script>
