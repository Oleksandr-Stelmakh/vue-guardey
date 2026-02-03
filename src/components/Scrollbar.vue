<script setup>
import { ref, nextTick, watch, onMounted, onBeforeUnmount } from "vue"

const props = defineProps({
  target: {
    type: Object,
    required: false,
    default: null
  }
})

const trackRef = ref(null)
const thumbTop = ref(0)
const thumbHeight = ref(0)


  function update() {
  const el = props.target?.value
  const track = trackRef.value
  if (!el || !track) return

  const visible = el.clientHeight
  const content = el.scrollHeight
  const trackHeight = trackRef.value.clientHeight

  if (content <= visible) {
  thumbHeight.value = 0
  thumbTop.value = 0
} else {
  const ratio = visible / content
  thumbHeight.value = Math.max(trackHeight * ratio, 20)

  const maxScroll = content - visible
  const maxThumbTop = trackHeight - thumbHeight.value
  thumbTop.value = (el.scrollTop / maxScroll) * maxThumbTop
}
}


watch(
  () => props.target?.value,
  async (el, oldEl) => {
    oldEl?.removeEventListener("scroll", update)
    if (!el) return

    await nextTick()
    requestAnimationFrame(update)
    el.addEventListener("scroll", update)
  },
  { immediate: true }
)



onBeforeUnmount(() => {
  props.target.value?.removeEventListener("scroll", update)
})
</script>

<template>
  <div class="scrollbar" ref="trackRef">
    <div
      class="thumb"
      :style="{ height: thumbHeight + 'px', top: thumbTop + 'px' }"
    ></div>
  </div>
</template>

<!-- <style scoped>
.scrollbar {
  position: absolute;
  top: 0px;
  right: 0;
  height: 229px;
  width: 6px;
  background: #b3b6b4;
  z-index: 30;
  pointer-events: none;
}

.thumb {
  position: absolute;
  left: 0;
  width: 6px;
  background: #050505;
  border-radius: 6px;
}
</style> -->
