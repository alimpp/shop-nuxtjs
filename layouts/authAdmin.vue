<template>
  <div class="auth-layout bg-primary-3">
    <img src="/public/logo/logo.png" alt="logo" width="150" height="150" />
    <div class="flex flex-column w-380-px">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.auth-layout {
  width: 100%;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
