<template>
  <section id="about" class="w-full max-w-7xl mx-auto px-6 md:px-12 mb-32">
    <div class="grid md:grid-cols-3 gap-12 items-start">

      <!-- Left Column: Bio & Graph (Span 2) -->
      <div class="md:col-span-2 space-y-8">
        <div>
          <div class="section-label mb-6">Introduction</div>
          <h2 class="text-4xl font-bold mb-6 leading-tight">
            Building <span class="text-gradient-flow">Resilient</span> Digital Ecosystems.
          </h2>
          <div class="text-[var(--text-muted)] text-lg leading-relaxed space-y-6">
            <p>I build scalable, high-performance systems that deliver measurable impact. With over 7
              years of experience in software engineering, I specialize in architecting distributed
              systems that support business growth and long-term scalability.</p>

            <p>My work focuses on designing and optimizing modern architectures—integrating modular
              components, RESTful APIs, SOA, and contemporary frameworks to deliver fast, reliable,
              and efficient solutions. I have extensive experience transforming complex monolithic
              systems into high-performance microservices, ensuring platforms are not only
              operational, but optimized for speed, resilience, and maintainability.</p>

            <p>I'm deeply invested in refining codebases, strengthening system architecture, and
              improving database efficiency. I thrive on solving complex technical challenges and
              turning them into robust, market-ready ecosystems built to scale.</p>
          </div>
        </div>

        <!-- Languages -->
        <div>
          <h3 class="text-sm font-mono text-primary mb-4 uppercase tracking-wider">Spoken Languages</h3>
          <div class="flex gap-3">
            <span class="px-3 py-1 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-full text-sm hover:border-primary transition-colors cursor-default">English</span>
            <span class="px-3 py-1 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-full text-sm hover:border-secondary transition-colors cursor-default">Hindi</span>
            <span class="px-3 py-1 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-full text-sm hover:border-tertiary transition-colors cursor-default">Bengali</span>
          </div>
        </div>

        <!-- Github Graph Component -->
        <div class="glass-card p-6">
          <div class="flex justify-between items-end mb-4">
            <div>
              <div class="text-xs font-mono text-[var(--text-muted)] mb-1">OPEN SOURCE ACTIVITY</div>
              <div class="font-bold text-lg flex items-center gap-2">
                <GitCommit class="text-primary w-4 h-4" />
                1,240 Contributions
              </div>
            </div>
            <div class="text-[10px] text-[var(--text-muted)] font-mono hidden sm:block">Last 12 Months</div>
          </div>
          <div class="github-graph-wrapper no-scrollbar">
            <div ref="graphRef" class="github-graph"></div>
          </div>
        </div>
      </div>

      <!-- Right Column: Stats & Highlights (Span 1) -->
      <div class="md:col-span-1 space-y-6">
        <!-- Stats Card -->
        <div class="p-6 border border-[var(--border-color)] rounded-2xl bg-[var(--card-bg)]/50 backdrop-blur-sm relative overflow-hidden group">
          <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div class="text-xs font-mono text-[var(--text-muted)] mb-6 tracking-widest uppercase">/ VITAL STATISTICS</div>

          <div class="space-y-6 relative z-10">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="p-2 rounded bg-[var(--bg-color)] border border-[var(--border-color)] text-primary hover:border-primary transition-colors">
                  <Briefcase class="w-4 h-4" />
                </div>
                <span class="text-sm font-medium">Experience</span>
              </div>
              <span class="font-mono font-bold text-primary text-lg">7+ Yrs</span>
            </div>

            <div class="w-full h-px bg-[var(--border-color)]"></div>

            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="p-2 rounded bg-[var(--bg-color)] border border-[var(--border-color)] text-secondary hover:border-secondary transition-colors">
                  <Layers class="w-4 h-4" />
                </div>
                <span class="text-sm font-medium">Focus</span>
              </div>
              <span class="font-mono font-bold text-secondary text-sm">Scalability</span>
            </div>

            <div class="w-full h-px bg-[var(--border-color)]"></div>

            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="p-2 rounded bg-[var(--bg-color)] border border-[var(--border-color)] text-tertiary hover:border-tertiary transition-colors">
                  <MapPin class="w-4 h-4" />
                </div>
                <span class="text-sm font-medium">Location</span>
              </div>
              <span class="font-mono font-bold text-tertiary text-sm">Hyderabad</span>
            </div>
          </div>
        </div>

        <!-- Mini CTA -->
        <div class="p-6 border border-[var(--border-color)] rounded-2xl bg-gradient-to-br from-[var(--card-bg)] to-[var(--bg-color)] relative overflow-hidden group cursor-pointer hover:border-primary/50 transition-colors"
          @click="scrollToContact">
          <div class="flex items-center gap-4">
            <div class="p-3 rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform">
              <Coffee class="w-5 h-5" />
            </div>
            <div>
              <div class="text-sm font-bold text-[var(--text-main)]">Open to Chat?</div>
              <div class="text-xs text-[var(--text-muted)]">Let's discuss architecture.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { GitCommit, Briefcase, Layers, MapPin, Coffee } from 'lucide-vue-next'

const graphRef = ref(null)

function scrollToContact() {
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  if (!graphRef.value) return
  const weeks = 52
  const days = 7
  for (let w = 0; w < weeks; w++) {
    const col = document.createElement('div')
    col.className = 'github-col'
    for (let d = 0; d < days; d++) {
      const cell = document.createElement('div')
      cell.className = 'contrib-cell'
      const rand = Math.random()
      if (rand > 0.7) cell.classList.add('level-' + Math.ceil(Math.random() * 4))
      col.appendChild(cell)
    }
    graphRef.value.appendChild(col)
  }
})
</script>
