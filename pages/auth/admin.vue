<template>
  <div class="w-100 flex flex-column">
    <div class="w-100 flex flex-column justify-start">
      <span class="f-s-16 f-w-500 color-primary-4"
        >Welcome back to admin pannel</span
      >
      <span class="f-s-12 f-w-100 color-primary-1 pt-5"
        >Please authentication with username and password</span
      >
    </div>
    <BaseInput
      :validate="true"
      v-model:access="access"
      v-model="form.username"
      rules="length"
      min-length="8"
      max-length="15"
      class="mt-15"
      label="Username"
      placeholder="Please Enter Username"
    />
    <BaseInput
      :validate="true"
      v-model:access="access"
      v-model="form.password"
      rules="length"
      min-length="8"
      max-length="15"
      class="mt-15"
      label="Password"
      placeholder="Please Enter Password"
    />
    <BaseButton
      padding="12px 8px"
      class="mt-15"
      name="Send"
      :loading="loading"
      :disabled="disabled"
      @click="login"
    />
  </div>
</template>

<script setup>
import { adminController } from '@/controllers/Admin';

definePageMeta({
  layout: 'auth',
});

const access = ref(false);
const loading = ref(false);

const form = ref({
  username: '',
  password: '',
});

const disabled = computed(() => {
  return !access.value || !form.value.username || !form.value.password
    ? true
    : false;
});

const login = async () => {
  loading.value = !loading.value;
  await adminController.login(form.value);
  loading.value = !loading.value;
};
</script>
