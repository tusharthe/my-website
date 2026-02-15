<template>
  <section id="projects" class="w-full max-w-7xl mx-auto px-6 md:px-12 mb-32">
    <div class="section-label mb-12">Featured Work</div>

    <div class="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
      <div>
        <h2 class="text-3xl font-bold mb-4">Selected Projects</h2>
        <p class="text-[var(--text-muted)] max-w-xl">
          A curated selection of scalable systems, mobile applications, and architectural solutions I've engineered.
        </p>
      </div>

      <!-- Filter Tabs -->
      <div class="flex flex-wrap gap-2">
        <button v-for="tab in tabs" :key="tab.filter"
          @click="activeFilter = tab.filter"
          class="filter-btn px-4 py-2 text-xs font-mono border border-[var(--border-color)] rounded-full hover:border-primary hover:text-primary transition-all bg-[var(--card-bg)] cursor-pointer"
          :class="{ 'sparkle-btn !border-transparent text-white': activeFilter === tab.filter }">
          {{ tab.label }}
        </button>
      </div>
    </div>

    <div class="grid md:grid-cols-2 gap-8">
      <template v-for="project in filteredProjects" :key="project.title">
        <div class="glass-card p-0 overflow-hidden group project-card">
          <!-- Visual Header -->
          <div class="h-48 relative overflow-hidden" :class="project.bgClass">
            <div v-if="project.bgPattern" class="absolute inset-0 opacity-20" :style="project.bgPattern"></div>
            <div class="absolute inset-0 flex items-center justify-center">
              <component :is="project.icon" :class="['w-16 h-16 opacity-50 group-hover:scale-110 transition-transform duration-500', project.iconColor]" />
            </div>
            <div v-if="project.badge" class="absolute bottom-4 left-4">
              <span class="text-[10px] font-mono backdrop-blur px-2 py-1 rounded" :class="project.badgeClass">{{ project.badge }}</span>
            </div>
            <div v-if="project.isNew" class="absolute top-4 right-4">
              <span class="flex h-3 w-3 relative">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
            </div>
          </div>

          <!-- Content -->
          <div class="p-6">
            <h3 class="text-xl font-bold mb-2 transition-colors" :class="project.hoverColor">{{ project.title }}</h3>
            <p class="text-sm text-[var(--text-muted)] mb-4 leading-relaxed" :class="{ 'opacity-80': project.isOld }">{{ project.description }}</p>
            <div class="flex flex-wrap gap-2 mb-6">
              <span v-for="tech in project.tech" :key="tech"
                class="text-[10px] font-mono border border-[var(--border-color)] px-2 py-1 rounded text-[var(--text-muted)]">{{ tech }}</span>
            </div>
            <div class="flex gap-4">
              <a v-if="project.github" :href="project.github" target="_blank"
                class="text-xs font-bold flex items-center gap-1 transition-colors" :class="project.linkColor">
                <Github class="w-3 h-3" /> VIEW CODE
              </a>
              <span v-else class="text-xs font-bold flex items-center gap-1 text-[var(--text-muted)]">
                <component :is="project.footerIcon" class="w-3 h-3" /> {{ project.footerLabel }}
              </span>
            </div>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Server, Bot, Smartphone, CreditCard, Database, MessageSquare, Briefcase, Library, Github, Building } from 'lucide-vue-next'

const tabs = [
  { label: 'ALL', filter: 'all' },
  { label: 'BACKEND', filter: 'backend' },
  { label: 'MOBILE', filter: 'mobile' },
  { label: 'FULL STACK', filter: 'fullstack' },
]

const activeFilter = ref('all')

const projects = [
  {
    title: 'Module Development & Optimization',
    description: 'Streamlining codebases, boosting performance, and enhancing scalability at DocOnline. Designing secure, efficient RESTful APIs for seamless integration and turning ideas into market-ready, user-focused solutions.',
    tech: ['Laravel', 'REST API', 'Optimization'],
    category: ['backend'],
    bgClass: 'bg-gradient-to-br from-slate-800 to-slate-900',
    bgPattern: "background-image: radial-gradient(circle at 2px 2px, var(--color-primary) 1px, transparent 0); background-size: 20px 20px;",
    icon: Server,
    iconColor: 'text-primary',
    badge: 'CURRENT ROLE',
    badgeClass: 'bg-black/50 text-primary border border-primary/30',
    hoverColor: 'group-hover:text-primary',
    footerIcon: Building,
    footerLabel: 'DOCONLINE',
    isNew: false,
    isOld: false,
  },
  {
    title: 'Intelligent RAG Chatbot',
    description: 'An intelligent chatbot bridging the gap between static documents and dynamic queries using Retrieval-Augmented Generation (RAG). Allows users to upload multiple PDFs and receive context-aware answers grounded in the provided material.',
    tech: ['Python', 'LangChain', 'AI'],
    category: ['fullstack', 'backend'],
    bgClass: 'bg-gradient-to-br from-slate-900 to-indigo-900',
    bgPattern: "background-image: linear-gradient(135deg, var(--color-tertiary) 25%, transparent 25%, transparent 50%, var(--color-tertiary) 50%, var(--color-tertiary) 75%, transparent 75%, transparent); background-size: 20px 20px;",
    icon: Bot,
    iconColor: 'text-tertiary',
    badge: 'NEW • AI',
    badgeClass: 'bg-green-500/20 text-green-400 border border-green-500/30',
    hoverColor: 'group-hover:text-tertiary',
    github: 'https://github.com/tusharthe/RAG-langchain-practice-1',
    linkColor: 'hover:text-tertiary',
    isNew: true,
    isOld: false,
  },
  {
    title: 'Hybrid PWA Solution',
    description: 'Built a Progressive Web App (PWA) and Hybrid Mobile solution (First Android) using Cordova, Framework7, Firebase, and Vue.js. Features real-time data visualization and offline-first capabilities for users.',
    tech: ['Vue.js', 'Framework7', 'Cordova'],
    category: ['mobile', 'fullstack'],
    bgClass: 'bg-gradient-to-br from-slate-900 to-slate-800',
    icon: Smartphone,
    iconColor: 'text-white opacity-30',
    badge: 'HYBRID MOBILE',
    badgeClass: 'bg-black/50 text-white border border-white/30',
    hoverColor: 'group-hover:text-white',
    footerIcon: Briefcase,
    footerLabel: 'GETUNION',
    isNew: false,
    isOld: false,
  },
  {
    title: 'Cross-Platform Invoice App',
    description: 'Developed a high-performance FinTech invoice discounting application (Web + Android) using Flutter and Node.js backend. Implemented secure payment gateways, transaction tracking, and JWT authentication.',
    tech: ['Flutter', 'Node.js', 'JWT'],
    category: ['mobile', 'fullstack'],
    bgClass: 'bg-gradient-to-br from-slate-800 to-slate-900',
    icon: CreditCard,
    iconColor: 'text-secondary',
    badge: 'FINTECH',
    badgeClass: 'bg-black/50 text-secondary border border-secondary/30',
    hoverColor: 'group-hover:text-secondary',
    footerIcon: Briefcase,
    footerLabel: 'GETUNION',
    isNew: false,
    isOld: false,
  },
  {
    title: 'E-Commerce DB Optimization',
    description: 'Optimized complex SQL queries and database schemas for a high-traffic e-commerce backend. Reduced query execution time by 40% and implemented automated CI/CD pipelines using Docker & Ansible.',
    tech: ['SQL', 'Docker', 'Ansible'],
    category: ['backend'],
    bgClass: 'bg-gradient-to-br from-slate-800 to-slate-900',
    icon: Database,
    iconColor: 'text-primary',
    badge: 'FREELANCE',
    badgeClass: 'bg-black/50 text-primary border border-primary/30',
    hoverColor: 'group-hover:text-primary',
    footerIcon: Briefcase,
    footerLabel: 'CLIENT PROJECT',
    isNew: false,
    isOld: false,
  },
  {
    title: 'Real-time Social Chat',
    description: 'A Facebook-style real-time chat application utilizing Laravel notifications and broadcasting with Vue.js frontend. Built as a college capstone project using Laravel 5.4.',
    tech: ['Laravel 5.4', 'Vue.js'],
    category: ['fullstack'],
    bgClass: 'bg-gradient-to-br from-gray-900 to-gray-800',
    icon: MessageSquare,
    iconColor: 'text-gray-500 opacity-30',
    badge: 'OLD • ACADEMIC',
    badgeClass: 'bg-gray-500/20 text-gray-400 border border-gray-500/30',
    hoverColor: 'group-hover:text-[var(--text-main)] text-[var(--text-muted)]',
    footerIcon: Briefcase,
    footerLabel: 'COLLEGE PROJECT',
    isNew: false,
    isOld: true,
  },
  {
    title: 'Enterprise Software Suite',
    description: 'Designed bespoke websites and backend software for diverse clients at Ayodhya Webosoft. Built custom Android business applications tailored to specific workflow needs.',
    tech: ['PHP', 'Android', 'Web Design'],
    category: ['fullstack', 'mobile'],
    bgClass: 'bg-gradient-to-br from-slate-900 to-slate-800',
    icon: Briefcase,
    iconColor: 'text-white opacity-30',
    badge: 'ENTERPRISE',
    badgeClass: 'bg-black/50 text-white border border-white/30',
    hoverColor: 'group-hover:text-white',
    footerIcon: Briefcase,
    footerLabel: 'AYODHYA WEBOSOFT',
    isNew: false,
    isOld: false,
  },
  {
    title: 'e-Library System',
    description: 'A dual-version library management system built for academic learning. Developed two distinct implementations: one utilizing Core PHP to master fundamentals, and another leveraging WordPress for rapid content management.',
    tech: ['Core PHP', 'WordPress', 'MySQL'],
    category: ['fullstack'],
    bgClass: 'bg-gradient-to-br from-indigo-900 to-slate-900',
    icon: Library,
    iconColor: 'text-indigo-300 opacity-30',
    badge: 'OLD • ACADEMIC',
    badgeClass: 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30',
    hoverColor: 'group-hover:text-[var(--text-main)] text-[var(--text-muted)]',
    github: 'https://github.com/tusharthe/e-library',
    linkColor: 'text-[var(--text-muted)] hover:text-indigo-300',
    isNew: false,
    isOld: true,
  },
]

const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') return projects
  return projects.filter(p => p.category.includes(activeFilter.value))
})
</script>
