<template>
  <nav class="fixed w-full z-50 px-6 md:px-12 py-6 flex justify-between items-center bg-[var(--bg-color)]/80 backdrop-blur-md border-b border-[var(--border-color)]">
    <!-- Logo -->
    <div class="flex items-center gap-3">
      <div class="w-3 h-3 rounded-full animate-pulse shadow-[0_0_10px_var(--color-secondary)]" :style="{ background: 'var(--gradient-main)' }"></div>
      <router-link to="/" class="font-bold text-lg tracking-tight hoverable font-mono">
        TUSHAR<span class="text-primary">.DEV</span>
      </router-link>
    </div>

    <!-- Nav Links (Desktop) -->
    <div class="hidden md:flex items-center gap-8">
      <router-link to="/#about" class="nav-link text-[var(--text-muted)] hover:text-[var(--text-main)]">ABOUT</router-link>
      <router-link to="/#experience" class="nav-link text-[var(--text-muted)] hover:text-[var(--text-main)]">EXP</router-link>
      <router-link to="/#projects" class="nav-link text-[var(--text-muted)] hover:text-[var(--text-main)]">WORK</router-link>
      <router-link to="/#skills" class="nav-link text-[var(--text-muted)] hover:text-[var(--text-main)]">STACK</router-link>

      <!-- Blog Dropdown -->
      <div class="relative group">
        <button class="nav-link text-[var(--text-muted)] hover:text-[var(--text-main)] flex items-center gap-1 cursor-pointer">
          BLOG <ChevronDown class="w-3 h-3 transition-transform group-hover:rotate-180" />
        </button>
        <div class="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
          <div class="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg shadow-xl overflow-hidden backdrop-blur-md">
            <router-link to="/blog/devto" class="block px-4 py-3 text-sm text-[var(--text-muted)] hover:text-[var(--text-main)] border-b border-[var(--border-color)]">
              <Code2 class="w-3 h-3 inline mr-2 text-primary" /> Technicals
            </router-link>
            <router-link to="/blog/hashnode" class="block px-4 py-3 text-sm text-[var(--text-muted)] hover:text-[var(--text-main)]">
              <BookOpen class="w-3 h-3 inline mr-2 text-secondary" /> Stories
            </router-link>
          </div>
        </div>
      </div>

      <router-link to="/#contact" class="nav-link text-[var(--text-muted)] hover:text-[var(--text-main)]">CONTACT</router-link>
    </div>

    <!-- Right Controls -->
    <div class="flex items-center gap-3">
      <!-- Layout Switcher -->
      <div class="relative">
        <button @click="toggleLayoutMenu" class="w-9 h-9 flex items-center justify-center rounded border border-[var(--border-color)] text-[var(--text-muted)] hover-text-primary hover-border-primary transition-colors cursor-pointer" title="Change Layout">
          <LayoutGrid class="w-4 h-4" />
        </button>
        <div v-if="showLayoutMenu" class="dropdown-menu show">
          <div class="text-[10px] text-[var(--text-muted)] px-3 py-1 font-mono uppercase tracking-wider opacity-50">Design System</div>
          <div v-for="l in layouts" :key="l.id" class="menu-option" :class="{ active: layout === l.id }" @click="selectLayout(l.id)">
            <component :is="l.icon" class="layout-icon w-[14px] h-[14px]" /> {{ l.label }}
          </div>
        </div>
      </div>

      <!-- Palette Switcher -->
      <div class="relative">
        <button @click="togglePaletteMenu" class="w-9 h-9 flex items-center justify-center rounded border border-[var(--border-color)] text-[var(--text-muted)] hover-text-primary hover-border-primary transition-colors cursor-pointer" title="Change Theme">
          <Palette class="w-4 h-4" />
        </button>
        <div v-if="showPaletteMenu" class="dropdown-menu show">
          <div class="text-[10px] text-[var(--text-muted)] px-3 py-1 font-mono uppercase tracking-wider opacity-50">Color Scheme</div>
          <div v-for="p in palettes" :key="p.id" class="menu-option" :class="{ active: theme === p.id }" @click="selectTheme(p.id)">
            <span class="color-dot" :style="{ background: p.color }"></span> {{ p.label }}
          </div>
        </div>
      </div>

      <!-- Dark/Light Toggle -->
      <button @click="toggleMode" class="w-9 h-9 flex items-center justify-center rounded border border-[var(--border-color)] text-[var(--text-muted)] hover-text-primary hover-border-primary transition-colors cursor-pointer" title="Light/Dark Mode">
        <Sun v-if="!isDark" class="w-4 h-4" />
        <Moon v-else class="w-4 h-4" />
      </button>

      <!-- Sound Toggle -->
      <button @click="sound.toggle()" class="w-9 h-9 flex items-center justify-center rounded border border-[var(--border-color)] text-[var(--text-muted)] hover-text-primary hover-border-primary transition-colors cursor-pointer" title="Toggle Sound">
        <VolumeX v-if="sound.isMuted.value" class="w-4 h-4" />
        <Volume2 v-else class="w-4 h-4" />
      </button>

      <!-- Ask AI Button -->
      <button @click="toggleChat" class="hidden md:flex h-9 items-center gap-2 sparkle-btn text-white px-5 rounded text-xs font-bold uppercase tracking-wide transition-all transform hoverable cursor-pointer">
        <Sparkles class="w-4 h-4" /> Ask AI
      </button>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useTheme } from '../../composables/useTheme'
import { useSoundEngine } from '../../composables/useSoundEngine'
import { useChatbot } from '../../composables/useChatbot'
import { ChevronDown, Code2, BookOpen, LayoutGrid, Palette, Sun, Moon, VolumeX, Volume2, Sparkles, Box, FileText, Terminal, Square, Building2, Save, Zap } from 'lucide-vue-next'

const { theme, layout, isDark, setTheme, setLayout, toggleMode } = useTheme()
const sound = useSoundEngine()
const { toggleChat } = useChatbot()

const showLayoutMenu = ref(false)
const showPaletteMenu = ref(false)

const layouts = [
  { id: 'quantum', label: 'Quantum (3D)', icon: Box },
  { id: 'minimal', label: 'Minimalist', icon: FileText },
  { id: 'terminal', label: 'Terminal', icon: Terminal },
  { id: 'brutalist', label: 'Neo-Brutal', icon: Square },
  { id: 'corporate', label: 'Corporate', icon: Building2 },
  { id: 'retro', label: 'Retro 95', icon: Save },
  { id: 'cyberpunk', label: 'Cyberpunk', icon: Zap },
]

const palettes = [
  { id: 'default', label: 'Cosmic', color: '#22d3ee' },
  { id: 'emerald', label: 'Emerald', color: '#34d399' },
  { id: 'sunset', label: 'Sunset', color: '#fb923c' },
  { id: 'ocean', label: 'Ocean', color: '#60a5fa' },
  { id: 'royal', label: 'Royal', color: '#c084fc' },
  { id: 'crimson', label: 'Crimson', color: '#f87171' },
]

function toggleLayoutMenu() {
  showLayoutMenu.value = !showLayoutMenu.value
  showPaletteMenu.value = false
  sound.play('click')
}

function togglePaletteMenu() {
  showPaletteMenu.value = !showPaletteMenu.value
  showLayoutMenu.value = false
  sound.play('click')
}

function selectLayout(id) {
  setLayout(id)
  showLayoutMenu.value = false
  sound.play('click')
}

function selectTheme(id) {
  setTheme(id)
  showPaletteMenu.value = false
  sound.play('click')
}
</script>
