<template>
    <div
     ref="scrollContainer"
     class="chat-content h-80-dvh flex flex-column"
     @scroll="handleScroll"
    >
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
const scrollContainer = ref(null)

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

const scrollToBottom = () => {
  nextTick(() => {
    if (scrollContainer.value) {
      scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight
    }
  })
}

const handleScroll = () => {
  const { scrollTop, scrollHeight, clientHeight } = scrollContainer.value
  const isNearBottom = scrollHeight - (scrollTop + clientHeight) < 50
  
  if (isNearBottom) {
  }
}

watch(() => props.messages, () => {
  scrollToBottom()
}, { deep: true })

onMounted(() => {
  scrollToBottom()
})
</script>

<style scoped>
.chat-content{
    overflow-y: auto;
    padding-bottom: 15px;
}
.chat-content::-webkit-scrollbar {
  display: none;
}
</style>