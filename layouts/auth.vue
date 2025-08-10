<template>
    <div class="auth-layout">
      <div class="glass-content">
         <div class="content">
            <img src="/public/logo/logo.png" alt="logo" width="150" height="150">
            <NuxtPage />
         </div>
      </div>
      <BaseAlert v-if="alert.timeout > 0" />
    </div>
</template>

<script setup>
const applicationStore = useApplicationStore()

const alert = computed(() => {
    return applicationStore._state.alert
})
</script>

<style scoped>
.auth-layout{
    width: 100%;
    height: 100dvh;
    background-image: url('/public/image/auth-bg.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}
.glass-content{
    width: 100%;
    height: 100dvh;
    background: #0000009f;
    display: flex;
    justify-content: start;
    align-items: end;
}
.content {
    width: 500px;
    height: 100dvh;
    background: #ffffffce;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    transition: 1s;
    padding: 0 20px;
}

@media (max-width: 700px) {
    .content{
        width: 100%;
        height: 60dvh;
        border-radius: 30px 30px 0 0 ;
    }
}
</style>