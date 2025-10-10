<template>
  <div class="w-100 flex flex-column">
    <BaseBreadCrumbs />
    <BaseTab :tabs="tabs" initial-tab="0">
      <template #0> Products . . . </template>
      <template #1>
        <ProductsTabsCategoryTable />
      </template>
      <template #2> Property . . . </template>
      <template #3> Property Value . . . </template>
    </BaseTab>
  </div>
</template>

<script setup>
import { categoryController } from "../../../controllers/Category";

definePageMeta({
  middleware: "auth",
  layout: "admin",
});

const tabs = [
  {
    id: 0,
    label: "Products",
    icon: "eos-icons:products",
  },
  {
    id: 1,
    label: "Category",
    icon: "iconamoon:category-light",
  },
  {
    id: 2,
    label: "Property",
    icon: "hugeicons:property-new",
  },
  {
    id: 3,
    label: "Property Value",
    icon: "solar:circle-top-down-linear",
  },
];

onMounted(async () => {
  await categoryController.list();
});
</script>
