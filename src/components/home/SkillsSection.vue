<template>
  <section id="skills" class="py-32 bg-[var(--bg-color)] border-y border-[var(--border-color)] relative overflow-hidden">
    <!-- Background Element -->
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--accent-glow)_0%,_transparent_70%)] opacity-30 pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-6 md:px-12 mb-16 relative z-10 text-center">
      <div class="section-label mb-6">Technical Arsenal</div>
      <h2 class="text-4xl md:text-5xl font-bold mb-6">
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-[var(--text-main)] to-[var(--text-muted)]">Technologies</span>
        <span class="italic text-primary">&amp;</span>
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-[var(--text-muted)] to-[var(--text-main)]">Tools</span>
      </h2>
    </div>

    <!-- Row 1: Backend & Infrastructure (Left Scroll) -->
    <div class="scroller mb-8" data-direction="left">
      <div class="scroller-inner">
        <!-- Set 1 -->
        <div class="skill-card"><Server class="w-4 h-4" /> LARAVEL</div>
        <div class="skill-card"><Database class="w-4 h-4" /> MYSQL</div>
        <div class="skill-card"><Container class="w-4 h-4" /> DOCKER</div>
        <div class="skill-card"><Network class="w-4 h-4" /> MICROSERVICES</div>
        <div class="skill-card"><Cloud class="w-4 h-4" /> AWS</div>
        <div class="skill-card"><Layers class="w-4 h-4" /> NODE.JS</div>
        <div class="skill-card"><HardDrive class="w-4 h-4" /> MONGODB</div>
        <div class="skill-card"><Globe class="w-4 h-4" /> REST API</div>
        <div class="skill-card"><Code class="w-4 h-4" /> PYTHON</div>
        <div class="skill-card"><ShieldCheck class="w-4 h-4" /> SYSTEM DESIGN</div>
        <!-- Set 2 (Duplicate for infinite scroll) -->
        <div class="skill-card"><Server class="w-4 h-4" /> LARAVEL</div>
        <div class="skill-card"><Database class="w-4 h-4" /> MYSQL</div>
        <div class="skill-card"><Container class="w-4 h-4" /> DOCKER</div>
        <div class="skill-card"><Network class="w-4 h-4" /> MICROSERVICES</div>
        <div class="skill-card"><Cloud class="w-4 h-4" /> AWS</div>
        <div class="skill-card"><Layers class="w-4 h-4" /> NODE.JS</div>
        <div class="skill-card"><HardDrive class="w-4 h-4" /> MONGODB</div>
        <div class="skill-card"><Globe class="w-4 h-4" /> REST API</div>
        <div class="skill-card"><Code class="w-4 h-4" /> PYTHON</div>
        <div class="skill-card"><ShieldCheck class="w-4 h-4" /> SYSTEM DESIGN</div>
      </div>
    </div>

    <!-- Row 2: Frontend & Tools (Right Scroll) -->
    <div class="scroller" data-direction="right">
      <div class="scroller-inner">
        <!-- Set 1 -->
        <div class="skill-card"><Layout class="w-4 h-4" /> VUE.JS</div>
        <div class="skill-card"><Atom class="w-4 h-4" /> REACT.JS</div>
        <div class="skill-card"><Smartphone class="w-4 h-4" /> FLUTTER</div>
        <div class="skill-card"><GitBranch class="w-4 h-4" /> GIT</div>
        <div class="skill-card"><Repeat class="w-4 h-4" /> CI/CD</div>
        <div class="skill-card"><Trello class="w-4 h-4" /> AGILE</div>
        <div class="skill-card"><Code class="w-4 h-4" /> TYPESCRIPT</div>
        <div class="skill-card"><Terminal class="w-4 h-4" /> LINUX</div>
        <!-- Set 2 (Duplicate) -->
        <div class="skill-card"><Layout class="w-4 h-4" /> VUE.JS</div>
        <div class="skill-card"><Atom class="w-4 h-4" /> REACT.JS</div>
        <div class="skill-card"><Smartphone class="w-4 h-4" /> FLUTTER</div>
        <div class="skill-card"><GitBranch class="w-4 h-4" /> GIT</div>
        <div class="skill-card"><Repeat class="w-4 h-4" /> CI/CD</div>
        <div class="skill-card"><Trello class="w-4 h-4" /> AGILE</div>
        <div class="skill-card"><Code class="w-4 h-4" /> TYPESCRIPT</div>
        <div class="skill-card"><Terminal class="w-4 h-4" /> LINUX</div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Server, Database, Cloud, Layers, HardDrive, Globe, Code, ShieldCheck, Layout, Atom, Smartphone, GitBranch, Repeat, Trello, Terminal, Network, Container } from 'lucide-vue-next'
</script>
