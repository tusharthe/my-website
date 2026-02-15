<template>
  <div class="min-h-screen pt-28 px-6 md:px-12">
    <div class="max-w-4xl mx-auto">
      <!-- Loading -->
      <div v-if="loading" class="text-center py-24 text-[var(--text-muted)]">Loading article...</div>

      <!-- Error -->
      <div v-else-if="error" class="text-center py-24">
        <p class="text-red-400 mb-4">{{ error }}</p>
        <router-link to="/blog/devto" class="text-primary hover:underline">← Back to articles</router-link>
      </div>

      <!-- Article -->
      <article v-else-if="article">
        <!-- Cover -->
        <img v-if="article.cover_image" :src="article.cover_image" :alt="article.title"
          class="w-full h-64 md:h-80 object-cover rounded-xl mb-8" />

        <!-- Meta -->
        <div class="flex flex-wrap items-center gap-3 mb-6 text-sm text-[var(--text-muted)]" style="font-family: var(--font-mono);">
          <span>{{ formattedDate }}</span>
          <span>·</span>
          <span>{{ article.reading_time_minutes }} min read</span>
        </div>

        <!-- Title -->
        <h1 class="text-3xl md:text-4xl font-bold text-[var(--text-main)] mb-6">{{ article.title }}</h1>

        <!-- Tags -->
        <div class="flex flex-wrap gap-2 mb-8">
          <span v-for="tag in article.tag_list" :key="tag" class="tech-badge text-xs">{{ tag }}</span>
        </div>

        <!-- Body -->
        <div class="article-content" v-html="article.body_html"></div>

        <!-- Back Link -->
        <div class="mt-12 pt-8 border-t border-[var(--border-color)]">
          <router-link to="/blog/devto" class="text-primary hover:underline" style="font-family: var(--font-mono); font-size: 14px;">
            ← Back to articles
          </router-link>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const API_BASE = import.meta.env.VITE_DEVTO_API_BASE

const route = useRoute()
const article = ref(null)
const loading = ref(true)
const error = ref(null)

const formattedDate = computed(() => {
  if (!article.value?.published_at) return ''
  return new Date(article.value.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
})

onMounted(async () => {
  const id = route.query.id
  if (!id) {
    error.value = 'No article ID provided.'
    loading.value = false
    return
  }
  try {
    const res = await fetch(`${API_BASE}/${id}`)
    if (!res.ok) throw new Error('Article not found.')
    article.value = await res.json()
    document.title = `${article.value.title} | TUSHAR PARIAL`
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>
