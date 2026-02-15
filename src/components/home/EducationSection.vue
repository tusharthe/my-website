<template>
  <section id="education" class="w-full max-w-7xl mx-auto px-6 md:px-12 py-32">
    <div class="section-label mb-12">Education History</div>

    <div class="grid md:grid-cols-2 gap-8">
      <!-- Education Item 1 -->
      <div class="border-l-2 border-[var(--border-color)] pl-6 relative hover-border-primary transition-colors group">
        <div class="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-[var(--color-primary)] transition-all duration-300 group-hover:scale-150 group-hover:shadow-[0_0_10px_var(--color-primary)]"></div>
        <div class="flex justify-between items-start">
          <div>
            <h3 class="text-xl font-bold text-[var(--text-main)] transition-colors group-hover:text-[var(--color-primary)]">Bachelor of Engineering</h3>
            <div class="text-[var(--text-muted)] text-sm mb-2">Computer Science</div>
            <div class="text-[var(--text-muted)] text-xs">Chhattisgarh Swami Vivekanand Technical University</div>
          </div>
          <div class="text-right">
            <div class="text-xs text-[var(--text-muted)] mt-1">2014 - 2018</div>
          </div>
        </div>
      </div>

      <!-- Education Item 2 -->
      <div class="border-l-2 border-[var(--border-color)] pl-6 relative hover-border-primary transition-colors group">
        <div class="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-[var(--border-color)] transition-all duration-300 group-hover:bg-[var(--color-primary)] group-hover:scale-150 group-hover:shadow-[0_0_10px_var(--color-primary)]"></div>
        <div class="flex justify-between items-start">
          <div>
            <h3 class="text-lg font-bold text-[var(--text-main)] transition-colors group-hover:text-[var(--color-primary)]">Higher Secondary</h3>
            <div class="text-[var(--text-muted)] text-sm mb-2">Mathematics</div>
            <div class="text-[var(--text-muted)] text-xs">Shakuntala Vidyalaya, Ram Nagar</div>
          </div>
          <div class="text-right">
            <div class="text-xs text-[var(--text-muted)] mt-1">2013 - 2014</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>
