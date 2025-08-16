<template>
  <div class="w-100 flex flex-column">
    <BaseBreadCrumbs />
    <Chat
      :isOpen="chatState"
      :loading="loading"
      :sendLoading="sendLoading"
      :messages="messages"
      :info="chatInfo"
      @close="closeChat"
      @send="send"
    />
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
  layout: "admin",
});

const chatState = ref(false)
const sendLoading = ref(false)
const loading = ref(false)

const messages = computed(() => {
  return []
})

const chatInfo = computed(() => {
  return {}
})

const send = (data) => {
  console.log(data);
}

const closeChat = () => {
  chatState.value = false
}
</script>
