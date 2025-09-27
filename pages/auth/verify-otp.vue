<template>
  <div class="w-100 flex flex-column">
    <div class="w-100 flex flex-column justify-start">
      <span class="f-s-16 f-w-500 color-primary-4">Please enter otp code</span>
      <span class="f-s-12 f-w-500 color-primary-1 pt-5"
        >Authentication with otp code</span
      >
    </div>
    <div class="mt-10">
      <BaseOtp
        v-model="otp"
        :length="6"
        @complete="sendOtp"
        ref="otpInputRef"
        :loading="loading"
      />
      <BaseButton
        class="mt-15"
        name="Confrim Otp Code"
        width="100%"
        height="40px"
        :loading="loading"
        :disabled="true"
        @click="sendPhone"
      />
    </div>
  </div>
</template>

<script setup>
import { userController } from '@/controllers/User';

const userStore = useUserStore();

definePageMeta({
  layout: 'auth',
});

const loading = ref(false);
const otp = ref('');

const sendOtp = async () => {
  const phone = userStore.getUserPhone;
  loading.value = !loading.value;
  await userController.verifyOtp({ phoneNumber: phone, otp: otp.value });
  loading.value = !loading.value;
};
</script>
