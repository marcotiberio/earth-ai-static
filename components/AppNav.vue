<template>
  <header class="fixed top-0 left-0 w-full z-50 px-6 md:px-10">
    <!-- Thin rule under the bar, as in the NAV-STICK frame -->
    <div class="flex items-center justify-between py-6 border-b border-ea-cream/15">
      <!-- Logo -->
      <NuxtLink to="/" aria-label="Earth AI home">
        <!-- TODO: replace with the actual Earth AI logo SVG -->
        <span class="text-ea-cream font-serif text-lg tracking-tight">EARTH AI</span>
      </NuxtLink>

      <!-- Nav links -->
      <nav>
        <ul class="flex gap-8">
          <li v-for="item in navItems" :key="item.label">
            <NuxtLink
              :to="item.href"
              class="text-sm text-ea-cream/70 hover:text-ea-cream transition-colors"
            >
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup>
// TODO: pull from Prismic global settings once repo is connected
const navItems = [
  { label: 'About',    href: '#about' },
  { label: 'Approach', href: '#approach' },
  { label: 'Contact',  href: '#contact' },
]
</script>
