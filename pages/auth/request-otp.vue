<template>
  <div class="w-100 flex flex-column">
    <div class="w-100 flex flex-column justify-start">
      <span class="f-s-16 f-w-500 color-primary-4"
        >Welcome back to online shop</span
      >
      <span class="f-s-12 f-w-100 color-primary-1 pt-5"
        >Request for otp code</span
      >
    </div>
    <BaseInput
      :validate="true"
      v-model:access="access"
      v-model="phone"
      rules="phone"
      class="mt-15"
      label="Phone Number"
      placeholder="Please Enter Your phone number"
    />
    <BaseButton
      class="mt-15"
      name="Send"
      :loading="loading"
      :disabled="disabled"
      @click="sendPhone"
    />
  </div>
</template>

<script setup>
import { userController } from "@/controllers/User";

definePageMeta({
  layout: "auth",
});

const access = ref(false);
const loading = ref(false);

const phone = ref("");

const disabled = computed(() => {
  return !access.value || !phone.value ? true : false;
});

const sendPhone = async () => {
  loading.value = !loading.value;
  await userController.requestOtp(phone.value);
  loading.value = !loading.value;
};
</script>
