<template>
  <div class="min-h-screen pt-28 px-6 md:px-12">
    <div class="max-w-4xl mx-auto">
      <!-- Loading -->
      <div v-if="loading" class="text-center py-24 text-[var(--text-muted)]">Loading article...</div>

      <!-- Error -->
      <div v-else-if="error" class="text-center py-24">
        <p class="text-red-400 mb-4">{{ error }}</p>
        <router-link to="/blog/hashnode" class="text-primary hover:underline">← Back to posts</router-link>
      </div>

      <!-- Article -->
      <article v-else-if="post">
        <!-- Cover -->
        <img v-if="post.coverImage?.url" :src="post.coverImage.url" :alt="post.title"
          class="w-full h-64 md:h-80 object-cover rounded-xl mb-8" />

        <!-- Meta -->
        <div class="flex flex-wrap items-center gap-3 mb-6 text-sm text-[var(--text-muted)]" style="font-family: var(--font-mono);">
          <span>{{ formattedDate }}</span>
          <span>·</span>
          <span>{{ post.readTimeInMinutes }} min read</span>
        </div>

        <!-- Title -->
        <h1 class="text-3xl md:text-4xl font-bold text-[var(--text-main)] mb-6">{{ post.title }}</h1>

        <!-- Tags -->
        <div class="flex flex-wrap gap-2 mb-8">
          <span v-for="tag in post.tags" :key="tag.name" class="tech-badge text-xs">{{ tag.name }}</span>
        </div>

        <!-- Body -->
        <div class="article-content" v-html="post.content?.html"></div>

        <!-- Back Link -->
        <div class="mt-12 pt-8 border-t border-[var(--border-color)]">
          <router-link to="/blog/hashnode" class="text-primary hover:underline" style="font-family: var(--font-mono); font-size: 14px;">
            ← Back to posts
          </router-link>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const GQL_ENDPOINT = import.meta.env.VITE_HASHNODE_GQL_ENDPOINT
const DEFAULT_HOST = import.meta.env.VITE_HASHNODE_MY_HOST

const route = useRoute()
const post = ref(null)
const loading = ref(true)
const error = ref(null)

const formattedDate = computed(() => {
  if (!post.value?.publishedAt) return ''
  return new Date(post.value.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
})

onMounted(async () => {
  const slug = route.query.slug
  const host = route.query.host || DEFAULT_HOST
  if (!slug) {
    error.value = 'No article slug provided.'
    loading.value = false
    return
  }

  const query = `
    query Post($host: String!, $slug: String!) {
      publication(host: $host) {
        post(slug: $slug) {
          title publishedAt readTimeInMinutes
          coverImage { url }
          tags { name }
          content { html }
        }
      }
    }
  `

  try {
    const res = await fetch(GQL_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: { host, slug } }),
    })
    const { data, errors: gqlErrors } = await res.json()
    if (gqlErrors || !data?.publication?.post) {
      throw new Error('Article not found.')
    }
    post.value = data.publication.post
    document.title = `${post.value.title} | TUSHAR PARIAL`
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>
