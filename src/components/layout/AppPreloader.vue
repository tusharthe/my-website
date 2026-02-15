<template>
  <div v-if="!hidden" id="preloader" :class="{ loaded: fadeOut }">
    <div class="terminal-loader">
      <p>{{ currentLine }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const lines = [
  '> Initializing system...',
  '> Loading modules...',
  '> Compiling portfolio...',
  '> Establishing connection...',
  '> System ready.',
]

const currentLine = ref(lines[0])
const fadeOut = ref(false)
const hidden = ref(false)

onMounted(() => {
  let i = 0
  const interval = setInterval(() => {
    i++
    if (i < lines.length) {
      currentLine.value = lines[i]
    } else {
      clearInterval(interval)
      fadeOut.value = true
      setTimeout(() => { hidden.value = true }, 800)
    }
  }, 400)
})
</script>
