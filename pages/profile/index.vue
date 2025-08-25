<template>
  <div class="w-100 flex flex-column pt-10">
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
    <div
      class="flex align-center mt-20 cursor-pointer"
      @click="modalUpdatePorfileState = true"
    >
      <BaseIcon icon="fluent:data-usage-edit-20-regular" size="25" />
      <span class="f-s-14 f-w-500 px-5">Profile Information</span>
    </div>
    <BaseDivider class="mt-5" />
    <div class="flex align-center mt-10 cursor-pointer">
      <BaseIcon icon="hugeicons:note" size="25" />
      <span class="f-s-14 f-w-500 px-5">Orders</span>
    </div>
    <BaseDivider class="mt-5" />
    <div class="flex align-center mt-10 cursor-pointer">
      <BaseIcon icon="solar:bag-2-linear" size="25" />
      <span class="f-s-14 f-w-500 px-5">Basket</span>
    </div>
    <BaseDivider class="mt-5" />
    <div class="flex align-center mt-10 cursor-pointer">
      <BaseIcon icon="clarity:chat-bubble-line" size="25" />
      <span class="f-s-14 f-w-500 px-5">Support</span>
    </div>
    <BaseDivider class="mt-5" />
    <div class="flex align-center mt-10 cursor-pointer">
      <BaseIcon icon="icon-park-outline:like" size="25" />
      <span class="f-s-14 f-w-500 px-5">Favorite</span>
    </div>
    <BaseDivider class="mt-5" />
    <div class="flex align-center mt-10 cursor-pointer">
      <BaseIcon icon="solar:bell-broken" size="25" />
      <span class="f-s-14 f-w-500 px-5">Notification</span>
    </div>
    <BaseDivider class="mt-5" />
    <div class="flex align-center mt-10 cursor-pointer" @click="logout">
      <BaseIcon icon="game-icons:exit-door" size="25" color="#eb5f5f" />
      <span class="f-s-14 f-w-500 px-5 color-danger">LogOut</span>
    </div>
    <BaseDivider class="mt-5" />
  </div>
  <UpdateProfile
    :isOpen="modalUpdatePorfileState"
    @close="modalUpdatePorfileState = false"
  />
</template>

<script setup>
import UpdateProfile from '../../components/profile/modal/updateProfile.vue';

const userStore = useUserStore();

const modalUpdatePorfileState = ref(false);

const profile = computed(() => {
  return userStore._state.user;
});

const logout = () => {
  userStore.logout();
};

definePageMeta({
  middleware: 'auth',
});
</script>
