<template>
  <div class="w-100 flex flex-column">
    <BaseBreadCrumbs />
    <SupportChatListCard
      v-for="(item, index) in chatList"
      :key="index"
      :data="item"
      @clickOnChat="clickOnChat"
    />
    <Chat
      :isOpen="chatState"
      :loading="loading"
      :sendState="sendState"
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

definePageMeta({
  middleware: 'auth',
  layout: 'admin',
});

const supportStore = useSupportStore();

const chatState = ref(false);
const sendState = ref('');
const loading = ref(false);

const chatList = computed(() => {
  return supportStore.getChatList;
});

const messages = computed(() => {
  return supportStore.getMessages;
});

const chatInfo = computed(() => {
  return supportStore.getChatInfo;
});

const send = async (data) => {
  sendState.value = 'sending';
  await supportController.sendMsgAdmin({
    chatId: supportStore.getChatInfo.chatId,
    ...data,
  });
  sendState.value = 'sended';
  setTimeout(() => {
    sendState.value = '';
  }, 2000);
};

const seen = async (data) => {
  await supportController.seen({ id: data.id, chatId: data.chatId });
};

const closeChat = () => {
  supportStore.resetMessages();
  supportController.stopChatPolling(supportStore.getChatInfo.chatId);
  chatState.value = false;
};

const clickOnChat = (data) => {
  supportStore.setChatInfo({
    chatId: data.chatId,
    name: data.user.fullname ? data.user.fullname : data.user.phone,
    sub: data.user.fullname ? data.user.phone : 'Customer Website',
  });
  chatState.value = true;
  setTimeout(async () => {
    supportController.startChatPolling(data.chatId);
  }, 1000);
};
</script>
