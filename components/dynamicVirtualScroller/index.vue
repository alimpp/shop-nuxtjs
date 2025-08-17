<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true,
    default: () => []
  },
  itemSize: {
    type: Number,
    default: 50
  },
  buffer: {
    type: Number,
    default: 5
  },
  keyField: {
    type: String,
    default: 'id'
  },
  autoScrollToBottom: {
    type: Boolean,
    default: false
  },
  scrollThreshold: {
    type: Number,
    default: 100 // pixels from bottom to consider "near bottom"
  }
})

const emit = defineEmits(['scroll', 'range-change'])

const containerRef = ref<HTMLElement>()
const scrollTop = ref(0)
const containerHeight = ref(0)
const totalHeight = computed(() => props.items.length * props.itemSize)
const isNearBottom = ref(true)

// Calculate visible items
const visibleRange = computed(() => {
  if (!containerHeight.value) return { start: 0, end: 0 }

  const startIdx = Math.max(0, Math.floor(scrollTop.value / props.itemSize) - props.buffer)
  const endIdx = Math.min(
    props.items.length - 1,
    Math.ceil((scrollTop.value + containerHeight.value) / props.itemSize) + props.buffer
  )

  return { start: startIdx, end: endIdx }
})

// Visible items with their positions
const visibleItems = computed(() => {
  return props.items.slice(visibleRange.value.start, visibleRange.value.end + 1).map((item, i) => ({
    data: item,
    index: visibleRange.value.start + i,
    position: (visibleRange.value.start + i) * props.itemSize
  }))
})

// Update container height on resize
const resizeObserver = new ResizeObserver(entries => {
  if (entries[0]) {
    containerHeight.value = entries[0].contentRect.height
    checkIfNearBottom()
  }
})

onMounted(() => {
  if (containerRef.value) {
    containerHeight.value = containerRef.value.clientHeight
    resizeObserver.observe(containerRef.value)
    scrollToBottom()
  }
})

// Auto scroll to bottom when new items are added and we're near bottom
watch(() => props.items.length, (newLength, oldLength) => {
  if (newLength > oldLength && (isNearBottom.value || props.autoScrollToBottom)) {
    nextTick(() => {
      scrollToBottom('smooth')
    })
  }
})

function handleScroll(e: Event) {
  if (!containerRef.value) return
  scrollTop.value = (e.target as HTMLElement).scrollTop
  checkIfNearBottom()
  emit('scroll', { scrollTop: scrollTop.value })
}

function checkIfNearBottom() {
  if (!containerRef.value) return
  const scrollBottom = scrollTop.value + containerHeight.value
  isNearBottom.value = scrollBottom >= totalHeight.value - props.scrollThreshold
}

// Watch for range changes
watch(visibleRange, (newRange) => {
  emit('range-change', newRange)
}, { immediate: true })

// Scroll to specific item
function scrollToIndex(index: number, behavior: ScrollBehavior = 'auto') {
  if (!containerRef.value) return
  const position = index * props.itemSize
  containerRef.value.scrollTo({
    top: position,
    behavior
  })
}

// Scroll to bottom
function scrollToBottom(behavior: ScrollBehavior = 'auto') {
  if (!containerRef.value) return
  containerRef.value.scrollTo({
    top: totalHeight.value,
    behavior
  })
}

defineExpose({
  scrollToIndex,
  scrollToBottom,
  isNearBottom
})
</script>

<template>
  <div
    ref="containerRef"
    class="virtual-scroller-container"
    @scroll="handleScroll"
  >
    <div
      class="virtual-scroller-content"
      :style="{ height: `${totalHeight}px` }"
    >
      <div
        v-for="item in visibleItems"
        :key="item.data[keyField] || item.index"
        class="virtual-scroller-item"
        :style="{ transform: `translateY(${item.position}px)` }"
      >
        <slot :item="item.data" :index="item.index" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.virtual-scroller-container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  position: relative;
  -webkit-overflow-scrolling: touch;
}

.virtual-scroller-content {
  width: 100%;
  position: relative;
}

.virtual-scroller-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  will-change: transform;
}
</style>