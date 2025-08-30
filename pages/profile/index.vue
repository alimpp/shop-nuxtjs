<template>
  <div class="flex flex-column w-100 pt-10 slid-left-animation-8">
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
    <BaseDivider class="mt-20" title="Theme" />
    <SwitchTheme />
    <div class="flex flex-column" v-for="item in listItems" :key="item.key">
      <div
        class="flex align-center mt-20 cursor-pointer"
        @click="signalController(item.signal)"
      >
        <BaseIcon :name="item.icon" :size="item.size" />
        <span class="f-s-14 f-w-500 px-5">{{ item.name }}</span>
      </div>
      <BaseDivider class="mt-5" />
    </div>
    <div class="flex align-center mt-10 cursor-pointer" @click="logout">
      <BaseIcon name="game-icons:exit-door" size="25" color="#eb5f5f" />
      <span class="f-s-14 f-w-500 px-5 color-danger">LogOut</span>
    </div>
  </div>
</template>

<script setup>
import { userController } from '../../controllers/User';

import { useRouter } from 'vue-router';
const router = useRouter();

const userStore = useUserStore();

const profile = computed(() => {
  return userStore._state.user;
});

const listItems = ref([
  {
    id: 0,
    name: 'Profile Information',
    signal: 'profileInformation',
    icon: 'fluent:data-usage-edit-20-regular',
    size: '25',
  },
  {
    id: 1,
    name: 'Orders',
    signal: 'orders',
    icon: 'hugeicons:note',
    size: '25',
  },
  {
    id: 2,
    name: 'Basket',
    signal: 'basket',
    icon: 'solar:bag-2-linear',
    size: '25',
  },
  {
    id: 3,
    name: 'Favorite',
    signal: 'favorite',
    icon: 'icon-park-outline:like',
    size: '25',
  },
  {
    id: 4,
    name: 'Notification',
    signal: 'notification',
    icon: 'solar:bell-broken',
    size: '25',
  },
]);

const signalController = (signal) => {
  switch (signal) {
    case 'profileInformation':
      router.push('/profile/update');
      break;

    case 'notification':
      router.push('/notification');
      break;

    default:
      break;
  }
};

const logout = () => {
  userController.logout();
};

definePageMeta({
  middleware: 'auth',
});
</script>
