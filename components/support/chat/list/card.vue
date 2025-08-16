<template>
    <BaseCard px="px-10" py="py-15" class="mt-8 cursor-pointer" @click="clickOnChat">
       <div class="w-100 flex">
         <div class="flex w-70">
           <div class="flex">
            <BaseAvatar
                width="50px"
                height="50px"
                :character="data.user.firstname ? data.user.firstname[0] : ''"
                avatar="/image/avatar.jpg"
           />
           </div>
           <div class="flex flex-column justify-center px-10">
            <span class="f-s-14 f-w-500">
                {{ data.user.firstname ? data.user.firstname + ' ' + data.user.lastname : data.user.phone }}
            </span>
            <span class="f-s-11 f-w-100 color-gray pt-10">{{ data.lastMessageContent }}</span>
           </div>
         </div>
        <div class="flex flex-column w-30 align-end">
            <span class="f-s-10 f-w-100 color-gray pt-5">{{ data.lastMessageTime }}</span>
           <div class="h-20-px mt-10">
            <span class="bg-red px-8 py-4 border-circle" :class="{'px-5': data.badge < 9}" v-show="data.badge > 0">
            {{ data.badge }}
           </span>
           </div>
         </div>
       </div>
    </BaseCard>
</template>

<script setup>
const emit = defineEmits(['clickOnChat'])
const props = defineProps({
    data: {
        type: Object,
        default: {}
    }
})


const clickOnChat = () => {
  emit('clickOnChat', props.data)
}
</script>