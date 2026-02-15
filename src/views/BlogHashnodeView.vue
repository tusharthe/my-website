<template>
  <div class="min-h-screen pt-28 px-6 md:px-12">
    <div class="max-w-6xl mx-auto">
      <!-- Hero -->
      <div class="text-center mb-16">
        <span class="section-label">BLOG — HASHNODE</span>
        <h1 class="text-4xl md:text-5xl font-bold mt-6 mb-4">
          Stories & <span class="text-gradient-flow">Thoughts</span>
        </h1>
        <p class="text-[var(--text-muted)] max-w-xl mx-auto">Personal insights, industry thoughts, and engineering experiences from my Hashnode blog.</p>
      </div>

      <!-- My Writings -->
      <section class="mb-20">
        <h2 class="text-2xl font-bold mb-8">
          <span class="text-primary">My</span> Writings
        </h2>
        <div v-if="myLoading && myPosts.length === 0" class="text-center py-12 text-[var(--text-muted)]">Loading posts...</div>
        <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <BlogCard v-for="post in myPosts" :key="post.id" :article="{ ...post, _host: myHost }" platform="hashnode" />
        </div>
        <div v-if="myHasMore" class="text-center mt-8">
          <button @click="loadMore('my')" :disabled="myLoading"
            class="sparkle-btn px-6 py-3 rounded-lg text-white font-bold text-sm cursor-pointer disabled:opacity-50">
            {{ myLoading ? 'Loading...' : 'Load More' }}
          </button>
        </div>
      </section>

      <!-- Community Highlights -->
      <section>
        <h2 class="text-2xl font-bold mb-8">
          <span class="text-secondary">Community</span> Highlights
        </h2>
        <div v-if="commLoading && commPosts.length === 0" class="text-center py-12 text-[var(--text-muted)]">Loading posts...</div>
        <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <BlogCard v-for="post in commPosts" :key="post.id" :article="{ ...post, _host: commHost }" platform="hashnode" :isCommunity="true" />
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

const GQL_ENDPOINT = import.meta.env.VITE_HASHNODE_GQL_ENDPOINT
const myHost = import.meta.env.VITE_HASHNODE_MY_HOST
const commHost = import.meta.env.VITE_HASHNODE_COMMUNITY_HOST

const QUERY = `
  query Publication($host: String!, $after: String) {
    publication(host: $host) {
      posts(first: 6, after: $after) {
        edges {
          node {
            id title slug brief
            publishedAt readTimeInMinutes
            coverImage { url }
            tags { name }
          }
        }
        pageInfo { endCursor hasNextPage }
      }
    }
  }
`

const myPosts = ref([])
const myCursor = ref(null)
const myLoading = ref(false)
const myHasMore = ref(true)

const commPosts = ref([])
const commCursor = ref(null)
const commLoading = ref(false)
const commHasMore = ref(true)

async function fetchPosts(section) {
  const isMy = section === 'my'
  const posts = isMy ? myPosts : commPosts
  const cursor = isMy ? myCursor : commCursor
  const loading = isMy ? myLoading : commLoading
  const hasMore = isMy ? myHasMore : commHasMore
  const host = isMy ? myHost : commHost

  loading.value = true
  try {
    const res = await fetch(GQL_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: QUERY, variables: { host, after: cursor.value } }),
    })
    const { data, errors } = await res.json()
    if (errors || !data?.publication) {
      hasMore.value = false
      return
    }
    const edges = data.publication.posts.edges
    const pageInfo = data.publication.posts.pageInfo
    posts.value = [...posts.value, ...edges.map((e) => e.node)]
    cursor.value = pageInfo.endCursor
    hasMore.value = pageInfo.hasNextPage
  } catch (err) {
    console.error('Error fetching Hashnode posts:', err)
  } finally {
    loading.value = false
  }
}

function loadMore(section) {
  fetchPosts(section)
}

onMounted(() => {
  fetchPosts('my')
  fetchPosts('comm')
})
</script>
