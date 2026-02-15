<template>
  <router-link :to="articleLink" class="glass-card block group hover:no-underline">
    <!-- Cover Image -->
    <div v-if="article.cover_image || article.coverImage" class="mb-4 -mx-8 -mt-8 overflow-hidden rounded-t-[var(--radius-md)]">
      <img :src="article.cover_image || article.coverImage?.url" :alt="title"
        class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
    </div>

    <!-- Meta -->
    <div class="flex items-center gap-3 mb-3 text-xs text-[var(--text-muted)]" style="font-family: var(--font-mono);">
      <span>{{ formattedDate }}</span>
      <span>·</span>
      <span>{{ readTime }} min read</span>
      <span v-if="isCommunity" class="ml-auto px-2 py-0.5 rounded border border-[var(--border-color)] text-[var(--color-secondary)]">Community</span>
    </div>

    <!-- Title -->
    <h3 class="text-lg font-bold text-[var(--text-main)] group-hover:text-primary transition-colors mb-2">{{ title }}</h3>

    <!-- Description -->
    <p class="text-[var(--text-muted)] text-sm leading-relaxed line-clamp-3">{{ description }}</p>

    <!-- Tags -->
    <div class="flex flex-wrap gap-2 mt-4">
      <span v-for="tag in tags" :key="tag" class="tech-badge text-xs">{{ tag }}</span>
    </div>
  </router-link>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  article: { type: Object, required: true },
  platform: { type: String, default: 'devto' },
  isCommunity: { type: Boolean, default: false },
})

const title = computed(() => props.article.title || props.article.title)

const description = computed(() => {
  if (props.platform === 'devto') return props.article.description || ''
  return props.article.brief || ''
})

const formattedDate = computed(() => {
  const d = props.article.published_at || props.article.publishedAt
  if (!d) return ''
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
})

const readTime = computed(() => {
  if (props.platform === 'devto') return props.article.reading_time_minutes || 3
  return props.article.readTimeInMinutes || 3
})

const tags = computed(() => {
  if (props.platform === 'devto') return props.article.tag_list || []
  const t = props.article.tags || []
  return t.map((tag) => (typeof tag === 'string' ? tag : tag.name))
})

const articleLink = computed(() => {
  if (props.platform === 'devto') {
    return { path: '/article/devto', query: { id: props.article.id } }
  }
  return { path: '/article/hashnode', query: { slug: props.article.slug, host: props.article._host || '' } }
})
</script>
