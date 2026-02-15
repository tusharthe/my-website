import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/HomeView.vue'),
    },
    {
        path: '/blog/devto',
        name: 'BlogDevto',
        component: () => import('../views/BlogDevtoView.vue'),
    },
    {
        path: '/blog/hashnode',
        name: 'BlogHashnode',
        component: () => import('../views/BlogHashnodeView.vue'),
    },
    {
        path: '/article/devto',
        name: 'ArticleDevto',
        component: () => import('../views/ArticleDevtoView.vue'),
    },
    {
        path: '/article/hashnode',
        name: 'ArticleHashnode',
        component: () => import('../views/ArticleHashnodeView.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) return savedPosition
        if (to.hash) return { el: to.hash, behavior: 'smooth' }
        return { top: 0 }
    },
})

export default router
