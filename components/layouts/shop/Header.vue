<template>
  <div class="w-100 h-60-px custom-style flex">
    <div class="w-30 flex align-center">
      <img src="/public/logo/logo.png" width="100" />
    </div>
    <div class="w-70 flex justify-end px-10 align-center">
      <div class="flex mx-5 align-center" v-show="width > 700">
        <span
          class="f-s-14 f-w-500 px-10 cursor-pointer py-5"
          :class="{ 'border-bottom-primary': route.path == item.path }"
          v-for="(item, index) in menuItems"
          :key="index"
          @click="router.push(item.path)"
          >{{ item.name }}</span
        >
      </div>
      <div class="flex align-center" v-if="userStore.getAuthenticated">
        <BaseIcon
          @click="router.push('/profile')"
          class="cursor-pointer"
          name="solar:user-hand-up-broken"
          width="25"
          height="25"
        />
        <NotificationCount :count="notificationCount" />
        <BaseIcon
          @click="router.push('/basket')"
          name="solar:bag-2-linear"
          width="28"
          height="28"
          class="cursor-pointer"
        />
      </div>
      <BaseButton
        v-else
        name="Login"
        bg="bg-primary-3"
        color="color-primary-1"
        icon="solar:login-2-linear"
        class="mx-2"
        @click="navigateTo('/auth/request-otp')"
      />
      <BaseIcon
        class="cursor-pointer"
        width="30"
        name="gg:menu-right"
        @click="chnageSideMenuState"
        v-show="width < 700"
      />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

import { useRoute } from '#vue-router';
import { navigateTo } from 'nuxt/app';
const route = useRoute();

const userStore = useUserStore();
const { width } = useScreenSize();

const notificationStore = useNotificationStore();

const notificationCount = computed(() => {
  return notificationStore.getNotificationCount;
});

const emit = defineEmits(['chnageSideMenuState']);

const menuItems = ref([
  {
    name: 'Support',
    path: '/support',
  },
  {
    name: 'Blogs',
    path: '/blogs',
  },
  {
    name: 'Products',
    path: '/products',
  },
  {
    name: 'Home',
    path: '/',
  },
]);

const chnageSideMenuState = () => {
  emit('chnageSideMenuState');
};
</script>

<style scoped>
.custom-style {
  box-shadow: 0px 1px 0px 0px #53535320;
}
</style>
