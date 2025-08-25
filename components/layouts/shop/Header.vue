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
          @click="goTo(item.path)"
          >{{ item.name }}</span
        >
      </div>
      <BaseIcon
        @click="goTo('/notification')"
        class="cursor-pointer mx-5"
        name="solar:bell-broken"
        width="25"
        height="25"
      />
      <span
        class="bg-red flex align-center justify-center w-30-px h-28-px border-circle pt-2 mb-20"
        v-if="notificationCount != 0"
        >{{ notificationCount }}</span
      >
      <BaseIcon
        @click="goTo('/basket')"
        name="solar:bag-2-linear"
        width="28"
        height="28"
        class="cursor-pointer"
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
const { goTo } = useNavigate();

import { useRoute } from '#vue-router';
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
