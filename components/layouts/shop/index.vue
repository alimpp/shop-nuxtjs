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
          @close="modalsController('support')"
          @send="send"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
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

const modalsController = (data) => {
  switch (data) {
    case "support":
      modals.value.chat = !modals.value.chat;
      break;
    
    default:
      throw new Error("Bad Signal . . . ");
  }
};

const sendLoading = ref(false)
const loading = ref(false)

const messages = computed(() => {
  return []
})

const chatInfo = computed(() => {
  return {
    name: "Admin Webiste",
    sub: "Admin"
  }
})

const send = (data) => {
  console.log(data);
}
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
