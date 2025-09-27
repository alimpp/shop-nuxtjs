<template>
  <div class="flex flex-column w-100 pt-10">
    <div class="flex w-100">
      <BaseAvatar
        width="50px"
        height="50px"
        :character="profile.fristname[0] ? profile.fristname[0] : ''"
        avatar="/image/avatar.jpg"
      />
      <div class="flex flex-column justify-center px-10">
        <span class="f-s-14 f-w-500 color-primary-4">{{
          profile.fristname ? profile.fullname : profile.phone
        }}</span>
        <span class="f-s-11 f-w-500 color-primary-2">{{
          profile.fristname ? profile.phone : 'Active User'
        }}</span>
      </div>
    </div>

    <BaseDivider class="mt-20" title="My Orders" />
    <OrdersMyOrders class="mt-20" />
    <BaseDivider class="mt-20" title="Theme" />
    <SwitchTheme />
    <div
      class="flex flex-column mt-2"
      v-for="item in listItems"
      :key="item.key"
    >
      <div
        class="flex align-center mt-20 cursor-pointer"
        @click="signalController(item.signal)"
      >
        <BaseIcon :name="item.icon" :size="item.size" color="#FDAAAA" />
        <span class="f-s-14 f-w-500 px-5 color-primary-4">{{ item.name }}</span>
      </div>
      <BaseDivider class="mt-10" />
    </div>
    <div class="flex align-center mt-10 cursor-pointer" @click="logout">
      <BaseIcon name="solar:arrow-left-linear" size="25" color="#FDAAAA" />
      <span class="f-s-14 f-w-500 px-5 color-primary-4">LogOut</span>
    </div>
    <Chat
      :isOpen="modals.chat"
      :loading="loading"
      :sendLoading="sendLoading"
      :messages="messages"
      :info="chatInfo"
      @close="closeChat"
      @send="send"
      @seen="seen"
    />
  </div>
</template>

<script setup>
import { supportController } from '~/controllers/Support';
import { userController } from '../../controllers/User';

import { useRouter } from 'vue-router';
const router = useRouter();

const supportStore = useSupportStore();
const userStore = useUserStore();

const profile = computed(() => {
  return userStore._state.user;
});

const modals = ref({
  chat: false,
});

const sendLoading = ref(false);
const loading = ref(false);

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
  {
    id: 5,
    name: 'Address',
    signal: 'address',
    icon: 'entypo:address',
    size: '25',
  },
  {
    id: 6,
    name: 'Support',
    signal: 'support',
    icon: 'solar:chat-round-line-linear',
    size: '25',
  },
]);

const messages = computed(() => {
  return supportStore.getMessages;
});

const chatInfo = computed(() => {
  return {
    name: 'Admin Webiste',
    sub: 'Admin',
  };
});

const openChat = async () => {
  supportStore.resetMessages();
  modals.value.chat = !modals.value.chat;
  setTimeout(async () => {
    supportController.startChatPolling(userStore.getUser.id);
  }, 1000);
};

const closeChat = () => {
  supportController.stopChatPolling(userStore.getUser.id);
  modals.value.chat = !modals.value.chat;
};

const send = async (data) => {
  sendLoading.value = true;
  await supportController.sendMsgUser({
    chatId: userStore.getUser.id,
    ...data,
  });
  sendLoading.value = false;
};

const seen = (data) => {
  setTimeout(async () => {
    await supportController.seen({ id: data.id, chatId: data.chatId });
  }, 1000);
};

const signalController = (signal) => {
  switch (signal) {
    case 'profileInformation':
      router.push('/profile/update');
      break;

    case 'notification':
      router.push('/notification');
      break;

    case 'address':
      router.push('/profile/address');
      break;

    case 'support':
      if (userStore.getAuthenticated) {
        openChat();
      } else {
        router.push('/auth/request-otp');
      }
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
