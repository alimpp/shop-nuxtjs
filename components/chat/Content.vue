<template>
    <div class="chat-content h-80-dvh flex flex-column">
      <SupportChatCard
        v-for="item in messages"
        :key="item.id"
        :ref="item.id"
        :data="item"
        @seen="seen"
      />
    </div>
</template>

<script setup>
const scroller = ref()

const emit = defineEmits(['seen'])
const props = defineProps({
    loading: {
        type: Boolean,
        default: false
    },
    messages: {
      type: Array,
      default: []
    },
})

const seen = (data) => [
  emit('seen', data)
]
</script>

<style scoped>
.chat-content{
    overflow-y: scroll;
    padding-bottom: 15px;
}
.chat-content::-webkit-scrollbar {
  display: none;
}
</style>