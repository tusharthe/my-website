<template>
  <header class="relative w-full max-w-7xl mx-auto px-6 md:px-12 mb-40">
    <div class="grid md:grid-cols-[1.5fr_1fr] gap-12 items-center">
      <!-- Text Content -->
      <div class="order-2 md:order-1 relative z-20">
        <div class="section-label mb-6">System Architect &amp; Senior Engineer</div>
        <h1 class="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6 text-[var(--text-main)]">
          Architecting<br />
          <span class="text-gradient-flow" style="filter: drop-shadow(0 0 20px rgba(var(--color-secondary-rgb),0.3));">Scalable Systems.</span>
        </h1>

        <p class="text-xl leading-relaxed mb-8 max-w-2xl text-[var(--text-muted)] font-light">
          I love to code and build, turning complex requirements into robust, high-performance software.
        </p>

        <div class="flex flex-wrap gap-3 mb-10">
          <span class="tech-badge bg-primary-soft border-primary-soft text-primary">Laravel Expert</span>
          <span class="tech-badge bg-tertiary-soft border-tertiary-soft text-tertiary">VueJs</span>
          <span class="tech-badge bg-secondary-soft border-secondary-soft text-secondary">DevOps</span>
          <span class="tech-badge bg-primary-soft border-primary-soft text-primary">Node.js</span>

          <button @click="$emit('openChat')"
            class="px-4 py-2 border border-primary-soft bg-primary-soft rounded text-sm font-mono text-primary flex items-center gap-2 transition-all hover:bg-opacity-30 hover:shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.3)] cursor-pointer">
            <Sparkles class="w-4 h-4" /> Ask AI about me
          </button>
        </div>

        <div class="flex gap-6 text-[var(--text-muted)]">
          <a href="https://github.com/tusharthe" target="_blank"
            class="hover-text-primary transition-colors flex items-center gap-2 text-sm">
            <Github class="w-4 h-4" /> GitHub
          </a>
          <a href="https://linkedin.com/in/tushar-kanti-parial" target="_blank"
            class="hover-text-secondary transition-colors flex items-center gap-2 text-sm">
            <Linkedin class="w-4 h-4" /> LinkedIn
          </a>
          <span class="flex items-center gap-2 text-sm">
            <MapPin class="w-4 h-4" /> Hyderabad, India
          </span>
        </div>
      </div>

      <!-- 3D Graphic Content -->
      <div class="order-1 md:order-2 flex justify-center md:justify-end h-[400px] items-center relative">
        <div id="hero-graphic" class="relative w-80 h-80 z-20 cursor-pointer" style="perspective: 1000px;">
          <!-- Canvas Background -->
          <canvas ref="canvasRef" class="particle-canvas w-full h-full rounded-full opacity-60"></canvas>

          <!-- Orbital Rings -->
          <div class="orbital-ring absolute inset-0 border border-primary-soft rounded-full animate-[spin_20s_linear_infinite] pointer-events-none transition-colors duration-300"></div>
          <div class="orbital-ring absolute inset-4 border border-dashed border-secondary-soft rounded-full animate-[spin_15s_linear_infinite_reverse] pointer-events-none transition-colors duration-300"></div>
          <div class="orbital-ring absolute inset-12 border-2 border-dotted border-tertiary-soft rounded-full animate-[spin_30s_linear_infinite] pointer-events-none transition-colors duration-300"></div>

          <!-- Glow Center -->
          <div class="absolute inset-[25%] bg-gradient-to-tr from-[var(--color-primary)] to-[var(--color-secondary)] rounded-full opacity-10 blur-3xl animate-pulse pointer-events-none"></div>

          <!-- 3D Cube Scene -->
          <div class="scene">
            <div class="cube">
              <div class="cube-face cube-face-front">SYS.ARCH</div>
              <div class="cube-face cube-face-back">API.REST</div>
              <div class="cube-face cube-face-right">SCALE</div>
              <div class="cube-face cube-face-left">SECURE</div>
              <div class="cube-face cube-face-top">CLOUD</div>
              <div class="cube-face cube-face-bottom">DATA</div>
              <div class="inner-cube">
                <div class="inner-face inner-face-front"></div>
                <div class="inner-face inner-face-back"></div>
                <div class="inner-face inner-face-right"></div>
                <div class="inner-face inner-face-left"></div>
                <div class="inner-face inner-face-top"></div>
                <div class="inner-face inner-face-bottom"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Github, Linkedin, MapPin, Sparkles } from 'lucide-vue-next'

defineEmits(['openChat'])

const canvasRef = ref(null)
let animId = null

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  const parent = canvas.parentElement

  function resize() {
    canvas.width = parent.clientWidth
    canvas.height = parent.clientHeight
  }
  resize()
  window.addEventListener('resize', resize)

  const particles = Array.from({ length: 60 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    r: Math.random() * 2 + 0.5,
  }))

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    const style = getComputedStyle(document.documentElement)
    const rgb = style.getPropertyValue('--color-primary-rgb').trim() || '34,211,238'

    particles.forEach((p) => {
      p.x += p.vx
      p.y += p.vy
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${rgb}, 0.5)`
      ctx.fill()
    })

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 120) {
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.strokeStyle = `rgba(${rgb}, ${0.15 * (1 - dist / 120)})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      }
    }
    animId = requestAnimationFrame(draw)
  }
  draw()

  onUnmounted(() => {
    cancelAnimationFrame(animId)
    window.removeEventListener('resize', resize)
  })
})
</script>
