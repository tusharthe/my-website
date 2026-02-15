<template>
  <div>
    <GridBackground />
    <AppPreloader v-if="isHome" />
    <AppNav />
    <router-view />
    <AppFooter />
    <ChatWidget />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useTheme } from './composables/useTheme'
import AppNav from './components/layout/AppNav.vue'
import AppFooter from './components/layout/AppFooter.vue'
import AppPreloader from './components/layout/AppPreloader.vue'
import GridBackground from './components/layout/GridBackground.vue'
import ChatWidget from './components/ChatWidget.vue'

useTheme()

const route = useRoute()
const isHome = computed(() => route.path === '/')
</script>
