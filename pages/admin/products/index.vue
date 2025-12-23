<template>
  <div class="flex flex-column">
    <BaseBreadCrumbs />
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
    label: 'Products',
    icon: 'eos-icons:products',
  },
  {
    id: 1,
    label: 'Category',
    icon: 'iconamoon:category-light',
  },
  {
    id: 2,
    label: 'Property',
    icon: 'hugeicons:property-new',
  },
  {
    id: 3,
    label: 'Property Value',
    icon: 'solar:circle-top-down-linear',
  },
];
</script>
