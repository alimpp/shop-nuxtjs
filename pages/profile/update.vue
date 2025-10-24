<template>
  <div class="container">
    <div class="flex w-100">
      <BaseAvatar
        width="50px"
        height="50px"
        :character="profile.fristname[0] ? profile.fristname[0] : ''"
        avatar="/image/avatar.jpg"
      />
      <div class="flex flex-column justify-center px-10">
        <span class="f-s-14 f-w-500 color-primary">{{
          profile.fristname ? profile.fullname : profile.phone
        }}</span>
        <span class="f-s-11 f-w-500">{{
          profile.fristname ? profile.phone : 'Active User'
        }}</span>
      </div>
    </div>
    <BaseDivider class="mt-20" title="My Orders" />
    <OrdersMyOrders class="mt-20" />
    <BaseDivider class="mt-20" title="Profile Information" />
    <BaseInput
      class="w-100 mt-5"
      placeholder="Enter fristname"
      label="Fristname"
      v-model="form.fristname"
    />

    <BaseInput
      class="w-100 mt-5"
      placeholder="Enter lastname"
      label="Lastname"
      v-model="form.lastname"
    />
    <BaseInput
      class="w-100 mt-5"
      placeholder="Enter email"
      label="Email"
      v-model="form.email"
    />
    <BaseButton
      name="Submit Profile"
      @click="submit"
      icon="gg:check-o"
      :loading="loading"
      class="mt-15"
    />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

import { userController } from '@/controllers/User';

const userStore = useUserStore();

const profile = computed(() => {
  return userStore._state.user;
});

const loading = ref(false);
const form = ref({
  fristname: '',
  lastname: '',
  email: '',
});

const submit = async () => {
  loading.value = true;
  await userController.updateProfile({
    ...form.value,
    avatarUrl: '',
  });
  loading.value = false;
  router.push('/profile');
};

onMounted(async () => {
  await userController.profile();
  form.value.fristname = userStore.getUser.fristname;
  form.value.lastname = userStore.getUser.lastname;
  form.value.email = userStore.getUser.email;
});

definePageMeta({
  middleware: 'auth',
});
</script>
