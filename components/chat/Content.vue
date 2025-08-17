<template>
    <div class="chat-content h-80-dvh flex flex-column">
      <DynamicVirtualScroller
        :items="messages"
        :item-size="60"
        ref="scroller"
        :auto-scroll-to-bottom="true"
      >
        <template #default="{ item }">
          <SupportChatCard
            :data="item"
            @seen="seen"
            :ref="item.id"
          />
        </template>
      </DynamicVirtualScroller>
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