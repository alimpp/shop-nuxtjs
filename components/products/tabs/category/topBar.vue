<template>
  <div class="flex justify-end">
    <BaseButton
      name="New Category"
      width="150px"
      icon="line-md:plus"
      @click="emit('createSignal')"
    />
  </div>
</template>

<script setup>
const emit = defineEmits(['createSignal']);
</script>
