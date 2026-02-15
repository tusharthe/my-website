<template>
  <div class="chat-widget">
    <!-- Chat Window -->
    <div class="chat-window" :class="{ open: isOpen }">
      <div class="chat-header">
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span class="font-bold text-sm">TusharAI</span>
          <span class="text-[10px] px-1.5 py-0.5 rounded bg-primary/20 text-primary font-mono">Gemini</span>
        </div>
        <button @click="toggleChat" class="text-[var(--text-muted)] hover:text-white cursor-pointer">
          <X class="w-4 h-4" />
        </button>
      </div>

      <div class="chat-body" ref="bodyRef">
        <div v-for="(msg, i) in messages" :key="i" class="message" :class="msg.role" v-html="msg.html"></div>
      </div>

      <div class="chat-footer">
        <input
          v-model="input"
          @keyup.enter="send"
          class="chat-input"
          placeholder="Ask about Tushar..."
        />
        <button @click="send" class="chat-btn px-3">
          <Send class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Toggle Button -->
    <div class="chat-toggle" @click="toggleChat">
      <Sparkles class="w-6 h-6 animate-pulse" />
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, watch } from 'vue'
import { Sparkles, X, Send } from 'lucide-vue-next'
import { useChatbot } from '../composables/useChatbot'

const { messages, isOpen, toggleChat, sendMessage } = useChatbot()

const input = ref('')
const bodyRef = ref(null)

function send() {
  if (!input.value.trim()) return
  sendMessage(input.value)
  input.value = ''
}

watch(messages, async () => {
  await nextTick()
  if (bodyRef.value) {
    bodyRef.value.scrollTop = bodyRef.value.scrollHeight
  }
}, { deep: true })
</script>
