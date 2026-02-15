<template>
  <div class="relative min-h-screen pt-36">
    <HeroSection />
    <AboutSection />
    <ExperienceSection />
    <ProjectsSection />
    <SkillsSection />
    <EducationSection />
    <CertsSection />
    <ContactSection />
  </div>
</template>

<script setup>
import HeroSection from '../components/home/HeroSection.vue'
import AboutSection from '../components/home/AboutSection.vue'
import ExperienceSection from '../components/home/ExperienceSection.vue'
import ProjectsSection from '../components/home/ProjectsSection.vue'
import SkillsSection from '../components/home/SkillsSection.vue'
import EducationSection from '../components/home/EducationSection.vue'
import CertsSection from '../components/home/CertsSection.vue'
import ContactSection from '../components/home/ContactSection.vue'
</script>
