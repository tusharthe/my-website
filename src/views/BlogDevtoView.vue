<template>
  <div class="min-h-screen pt-28 px-6 md:px-12">
    <div class="max-w-6xl mx-auto">
      <!-- Hero -->
      <div class="text-center mb-16">
        <span class="section-label">BLOG — DEV.TO</span>
        <h1 class="text-4xl md:text-5xl font-bold mt-6 mb-4">
          Technical <span class="text-gradient-flow">Articles</span>
        </h1>
        <p class="text-[var(--text-muted)] max-w-xl mx-auto">Deep dives into backend architecture, system design, and engineering best practices.</p>
      </div>

      <!-- My Articles -->
      <section class="mb-20">
        <h2 class="text-2xl font-bold mb-8">
          <span class="text-primary">My</span> Articles
        </h2>
        <div v-if="myLoading && myArticles.length === 0" class="text-center py-12 text-[var(--text-muted)]">Loading articles...</div>
        <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <BlogCard v-for="article in myArticles" :key="article.id" :article="article" platform="devto" />
        </div>
        <div v-if="myHasMore" class="text-center mt-8">
          <button @click="loadMore('my')" :disabled="myLoading"
            class="sparkle-btn px-6 py-3 rounded-lg text-white font-bold text-sm cursor-pointer disabled:opacity-50">
            {{ myLoading ? 'Loading...' : 'Load More' }}
          </button>
        </div>
      </section>

      <!-- Community Feed -->
      <section>
        <h2 class="text-2xl font-bold mb-8">
          <span class="text-secondary">Community</span> Feed
        </h2>
        <div v-if="commLoading && commArticles.length === 0" class="text-center py-12 text-[var(--text-muted)]">Loading articles...</div>
        <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <BlogCard v-for="article in commArticles" :key="article.id" :article="article" platform="devto" :isCommunity="true" />
        </div>
        <div v-if="commHasMore" class="text-center mt-8">
          <button @click="loadMore('comm')" :disabled="commLoading"
            class="sparkle-btn px-6 py-3 rounded-lg text-white font-bold text-sm cursor-pointer disabled:opacity-50">
            {{ commLoading ? 'Loading...' : 'Load More' }}
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import BlogCard from '../components/blog/BlogCard.vue'

const API_BASE = import.meta.env.VITE_DEVTO_API_BASE
const USERNAME = import.meta.env.VITE_DEVTO_USERNAME

const myArticles = ref([])
const myPage = ref(1)
const myLoading = ref(false)
const myHasMore = ref(true)

const commArticles = ref([])
const commPage = ref(1)
const commLoading = ref(false)
const commHasMore = ref(true)

async function fetchArticles(section) {
  const isMy = section === 'my'
  const articles = isMy ? myArticles : commArticles
  const page = isMy ? myPage : commPage
  const loading = isMy ? myLoading : commLoading
  const hasMore = isMy ? myHasMore : commHasMore

  loading.value = true
  try {
    const url = isMy
      ? `${API_BASE}?username=${USERNAME}&page=${page.value}&per_page=6`
      : `${API_BASE}?page=${page.value}&per_page=6&top=7`
    const res = await fetch(url)
    const data = await res.json()
    if (data.length < 6) hasMore.value = false
    articles.value = [...articles.value, ...data]
    page.value++
  } catch (err) {
    console.error('Error fetching DEV.to articles:', err)
  } finally {
    loading.value = false
  }
}

function loadMore(section) {
  fetchArticles(section)
}

onMounted(() => {
  fetchArticles('my')
  fetchArticles('comm')
})
</script>
