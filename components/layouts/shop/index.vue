<template>
  <div
    :class="{
      'bg-app-dark': appTheme == 'dark',
      'bg-app-light': appTheme == 'light',
    }"
    class="flex w-100 h-100-dvh overflow-hidden"
  >
    <div class="flex">
      <LayoutsShopSidebar
        @chnageSideMenuState="chnageSideMenuState"
        class="slid-right-animation-5"
        :isOpen="sideMenuState"
      />
    </div>
    <div class="w-100 flex flex-column">
      <LayoutsShopHeader @chnageSideMenuState="chnageSideMenuState" />
      <div class="router-content">
        <NuxtPage />
        <Compose @signal="modalsController" />
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
    </div>
  </div>
</template>

<script setup>
const { goTo } = useNavigate();

import { supportController } from '~/controllers/Support';

const supportStore = useSupportStore();
const userStore = useUserStore();

const sideMenuState = ref(false);
const chnageSideMenuState = () => {
  sideMenuState.value = !sideMenuState.value;
};

const applicationStore = useApplicationStore();
const appTheme = computed(() => {
  return applicationStore._state.theme;
});

const modals = ref({
  chat: false,
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

const modalsController = (data) => {
  switch (data) {
    case 'support':
      openChat();
      break;
    case 'profile':
      goTo('/profile');
      break;
    default:
      throw new Error('Bad Signal . . . ');
  }
};

const sendLoading = ref(false);
const loading = ref(false);

const messages = computed(() => {
  return supportStore.getMessages;
});

const chatInfo = computed(() => {
  return {
    name: 'Admin Webiste',
    sub: 'Admin',
  };
});

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
</script>

<style scoped>
.router-content {
  height: 90dvh;
  overflow-y: scroll;
  padding: 10px 30px;
}
.router-content::-webkit-scrollbar {
  width: 0px;
  border: 0px solid #fff;
  border-radius: 5px;
}

.router-content::-webkit-scrollbar-track {
  border-radius: 5px;
  background: #eeeeee;
}

.router-content::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background: #cac8c8;
}

@media (max-width: 800px) {
  .router-content {
    padding: 10px 10px;
  }
}
</style>
