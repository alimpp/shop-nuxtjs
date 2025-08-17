<template>
  <div class="w-100 flex flex-column">
    <BaseBreadCrumbs />
    <SupportChatListCard
     v-for="(item,index) in chatList"
     :key="index"
     :data="item"
     @clickOnChat="clickOnChat"
    />
    <Chat
      :isOpen="chatState"
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

definePageMeta({
  middleware: "auth",
  layout: "admin",
});

const supportStore = useSupportStore()

const chatState = ref(false)
const sendLoading = ref(false)
const loading = ref(false)

const chatList = computed(() => {
  return supportStore.getChatList
})

const messages = computed(() => {
  return supportStore.getMessages
})

const chatInfo = computed(() => {
  return supportStore.getChatInfo
})

const send = async (data) => {
  sendLoading.value = true
  await supportController.sendMsgAdmin({chatId: supportStore.getChatInfo.chatId, ...data})
  sendLoading.value = false
}

const seen = async (data) => {
  await supportController.seen({id: data.id, chatId: data.chatId})
}

const closeChat = () => {
  supportStore.resetMessages()
  chatState.value = false
}

const clickOnChat = (data) => {
  supportStore.setChatInfo(
    {
      chatId: data.chatId, 
      name: data.user.firstname ? data.user.firstname + ' ' + data.user.lastname : data.user.phone,
      sub: data.user.firstname ? data.user.phone : 'Customer Website'
    }
  )
  chatState.value = true
  setTimeout( async () => {
    await supportController.getChat(data.chatId)
  }, 1000);
}

onMounted(async () => {  
  await supportController.getChatList()
});
</script>
