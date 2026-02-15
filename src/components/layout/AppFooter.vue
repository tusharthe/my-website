<template>
  <footer class="border-t border-[var(--border-color)] bg-[var(--card-bg)] py-12">
    <div class="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
      <div class="text-center md:text-left">
        <div class="font-bold text-xl mb-1 tracking-tight">TUSHAR KANTI PARIAL</div>
        <div class="text-sm text-[var(--text-muted)]">Senior Software Engineer</div>
      </div>

      <div class="flex gap-8">
        <a href="mailto:tkparial1@gmail.com" class="text-[var(--text-muted)] hover-text-primary transition-colors">
          <Mail class="w-5 h-5" />
        </a>
        <a href="https://linkedin.com/in/tushar-kanti-parial" class="text-[var(--text-muted)] hover:text-[#0077b5] transition-colors">
          <Linkedin class="w-5 h-5" />
        </a>
        <a href="https://github.com/tusharthe" class="text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors">
          <Github class="w-5 h-5" />
        </a>
      </div>

      <div class="text-xs text-[var(--text-muted)] font-mono">
        &copy; {{ year }} Tushar Kanti Parial. All rights reserved.
      </div>
    </div>
  </footer>
</template>

<script setup>
import { Mail, Linkedin, Github } from 'lucide-vue-next'
const year = new Date().getFullYear()
</script>
