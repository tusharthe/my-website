<template>
  <section id="contact" class="w-full max-w-7xl mx-auto px-6 md:px-12 mb-32">
    <div class="section-label mb-12">Get In Touch</div>

    <div class="grid md:grid-cols-2 gap-16">
      <!-- Left: Info -->
      <div>
        <h2 class="text-4xl font-bold mb-6">Let's build something <span class="text-gradient-flow">extraordinary.</span></h2>
        <p class="text-[var(--text-muted)] leading-relaxed mb-10">
          Whether you have a question, a project proposal, or just want to discuss the latest in
          microservices architecture, I'm always open to new opportunities.
        </p>

        <div class="space-y-6">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-full bg-[var(--card-bg)] border border-[var(--border-color)] flex items-center justify-center text-primary">
              <Mail class="w-5 h-5" />
            </div>
            <div>
              <div class="text-xs text-[var(--text-muted)] font-mono">EMAIL</div>
              <a href="mailto:tkparial1@gmail.com" class="text-[var(--text-main)] hover-text-primary transition-colors font-medium">tkparial1@gmail.com</a>
            </div>
          </div>

          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-full bg-[var(--card-bg)] border border-[var(--border-color)] flex items-center justify-center text-secondary">
              <MapPin class="w-5 h-5" />
            </div>
            <div>
              <div class="text-xs text-[var(--text-muted)] font-mono">LOCATION</div>
              <div class="text-[var(--text-main)] font-medium">Hyderabad, India</div>
            </div>
          </div>

          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-full bg-[var(--card-bg)] border border-[var(--border-color)] flex items-center justify-center text-tertiary">
              <Download class="w-5 h-5" />
            </div>
            <div>
              <div class="text-xs text-[var(--text-muted)] font-mono">RESUME</div>
              <a href="#" class="text-[var(--text-main)] hover-text-tertiary transition-colors font-medium underline decoration-dotted">Download PDF</a>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Form -->
      <div class="glass-card relative">
        <!-- Loading Overlay -->
        <div v-if="loading" class="absolute inset-0 bg-[var(--bg-color)]/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center">
          <div class="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <span class="text-sm font-mono text-primary">SENDING_PACKET...</span>
        </div>

        <!-- Success Message -->
        <div v-if="success" class="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[var(--card-bg)]">
          <div class="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4 text-green-500">
            <Check class="w-8 h-8" />
          </div>
          <h3 class="text-xl font-bold mb-2">Message Sent!</h3>
          <p class="text-[var(--text-muted)] text-center px-8">I'll get back to you as soon as possible.</p>
          <button @click="resetForm" class="mt-6 text-sm text-primary hover:underline cursor-pointer">Send another</button>
        </div>

        <form @submit.prevent="submitForm" class="space-y-4">
          <input type="hidden" name="access_key" :value="web3key" />
          <!-- Honeypot -->
          <input type="checkbox" name="botcheck" class="hidden" style="display: none;" />

          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <label class="text-xs font-mono text-[var(--text-muted)]">NAME</label>
              <input v-model="form.name" type="text" name="name" required
                class="w-full bg-[var(--bg-color)] border border-[var(--border-color)] rounded-lg p-3 text-sm focus:border-primary focus:outline-none transition-colors text-[var(--text-main)]"
                placeholder="John Doe" />
            </div>
            <div class="space-y-2">
              <label class="text-xs font-mono text-[var(--text-muted)]">EMAIL</label>
              <input v-model="form.email" type="email" name="email" required
                class="w-full bg-[var(--bg-color)] border border-[var(--border-color)] rounded-lg p-3 text-sm focus:border-primary focus:outline-none transition-colors text-[var(--text-main)]"
                placeholder="john@example.com" />
            </div>
          </div>

          <div class="space-y-2">
            <label class="text-xs font-mono text-[var(--text-muted)]">MESSAGE</label>
            <textarea v-model="form.message" name="message" required rows="4"
              class="w-full bg-[var(--bg-color)] border border-[var(--border-color)] rounded-lg p-3 text-sm focus:border-primary focus:outline-none transition-colors text-[var(--text-main)]"
              placeholder="Tell me about your project..."></textarea>
          </div>

          <button type="submit"
            class="w-full py-4 mt-2 rounded-lg bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white font-bold tracking-wide uppercase text-sm hover:shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.4)] transition-all transform hover:-translate-y-1 relative overflow-hidden group cursor-pointer">
            <span class="relative z-10 flex items-center justify-center gap-2">Send Message <Send class="w-4 h-4" /></span>
            <div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
          <p class="text-xs text-center text-[var(--text-muted)] mt-4 opacity-70">Powered by Web3Forms (Free Tier)</p>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { Mail, MapPin, Download, Send, Check } from 'lucide-vue-next'

const web3key = import.meta.env.VITE_WEB3FORMS_KEY

const form = reactive({ name: '', email: '', message: '' })
const loading = ref(false)
const success = ref(false)

function resetForm() {
  success.value = false
  form.name = ''
  form.email = ''
  form.message = ''
}

async function submitForm() {
  loading.value = true
  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: web3key,
        name: form.name,
        email: form.email,
        message: form.message,
      }),
    })
    const data = await res.json()
    if (data.success) {
      success.value = true
    }
  } catch (err) {
    console.error('Form submission error:', err)
  } finally {
    loading.value = false
  }
}
</script>
