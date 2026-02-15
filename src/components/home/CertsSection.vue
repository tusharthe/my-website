<template>
  <section id="certs" class="w-full max-w-7xl mx-auto px-6 md:px-12 mb-32">
    <div class="flex justify-between items-end mb-12 border-b border-[var(--border-color)] pb-6">
      <h2 class="text-3xl font-bold">Certifications & Awards</h2>
      <div class="hidden md:block font-mono text-xs text-secondary">/ VERIFIED CREDENTIALS</div>
    </div>

    <div class="grid md:grid-cols-2 gap-8">
      <!-- Certifications Column -->
      <div>
        <h3 class="text-xl font-bold mb-6 flex items-center gap-3">
          <Award class="text-primary" /> Professional Certifications
        </h3>
        <div class="space-y-4">
          <div class="p-4 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg hover-border-primary transition-colors group">
            <div class="flex justify-between items-start">
              <div>
                <div class="font-bold text-[var(--text-main)] hover-text-primary transition-colors">Post Graduate Program in DevOps</div>
                <div class="text-sm text-[var(--text-muted)]">Purdue University</div>
              </div>
              <span class="text-xs font-mono text-primary">Apr 2023</span>
            </div>
          </div>
          <div class="p-4 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg hover-border-tertiary transition-colors group">
            <div class="flex justify-between items-start">
              <div>
                <div class="font-bold text-[var(--text-main)] hover-text-tertiary transition-colors">Generative AI Foundations</div>
                <div class="text-sm text-[var(--text-muted)]">upGrad & Microsoft</div>
              </div>
              <span class="text-xs font-mono text-tertiary">Aug 2025</span>
            </div>
          </div>
          <div class="p-4 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg hover-border-secondary transition-colors group">
            <div class="flex justify-between items-start">
              <div>
                <div class="font-bold text-[var(--text-main)] hover-text-secondary transition-colors">Flutter Developer</div>
                <div class="text-sm text-[var(--text-muted)]">Edureka & Udemy</div>
              </div>
              <span class="text-xs font-mono text-secondary">Aug 2025</span>
            </div>
          </div>
          <div class="p-4 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg hover-border-primary transition-colors group">
            <div class="flex justify-between items-start">
              <div>
                <div class="font-bold text-[var(--text-main)] hover-text-primary transition-colors">Node.js Certification Training</div>
                <div class="text-sm text-[var(--text-muted)]">Edureka</div>
              </div>
              <span class="text-xs font-mono text-primary">Aug 2023</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Awards Column -->
      <div>
        <h3 class="text-xl font-bold mb-6 flex items-center gap-3">
          <Star class="text-tertiary" /> Honors & Awards
        </h3>
        <div class="space-y-4">
          <div class="p-6 bg-gradient-to-br from-[var(--card-bg)] to-[var(--bg-color)] border border-[var(--border-color)] rounded-lg relative overflow-hidden group hover-border-secondary transition-colors">
            <div class="absolute top-0 right-0 p-4 opacity-30 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
              <Trophy class="w-16 h-16 text-[var(--text-muted)] hover-text-secondary transition-colors" />
            </div>
            <div class="relative z-10">
              <div class="font-bold text-lg text-[var(--text-main)]">Certificate of Appreciation</div>
              <div class="text-sm text-[var(--text-muted)] mb-2">DocOnline</div>
              <div class="text-xs font-mono text-secondary">Apr 2023</div>
              <p class="mt-4 text-sm text-[var(--text-muted)] max-w-[85%]">Recognized for outstanding contribution to system stability and API performance.</p>
            </div>
          </div>

          <div class="p-6 bg-gradient-to-br from-[var(--card-bg)] to-[var(--bg-color)] border border-[var(--border-color)] rounded-lg relative overflow-hidden group hover-border-tertiary transition-colors">
            <div class="absolute top-0 right-0 p-4 opacity-30 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
              <ThumbsUp class="w-16 h-16 text-[var(--text-muted)] hover-text-tertiary transition-colors" />
            </div>
            <div class="relative z-10">
              <div class="font-bold text-lg text-[var(--text-main)]">Team Kudos</div>
              <div class="text-sm text-[var(--text-muted)] mb-2">DocOnline</div>
              <div class="text-xs font-mono text-tertiary">Apr 2023</div>
              <p class="mt-4 text-sm text-[var(--text-muted)] max-w-[85%]">Awarded for collaborative excellence and mentoring junior developers.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Award, Star, Trophy, ThumbsUp } from 'lucide-vue-next'
</script>
