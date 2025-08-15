<template>
  <div class="w-100 flex flex-column">
    <BaseBreadCrumbs />
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
  layout: "admin",
});
</script>
