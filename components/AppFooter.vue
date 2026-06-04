<template>
  <footer class="bg-darkblue px-6 py-20 md:px-10">
    <!-- Press quotes -->
    <div class="flex items-center justify-between mb-10">
      <span class="text-sm text-grey">Follow our journey.</span>
      <a href="#contact" class="text-sm text-beige hover:text-beige/70 transition-colors">
        Contact us
      </a>
    </div>

    <ul class="grid gap-8 border-t border-beige/15 pt-10 md:grid-cols-3">
      <li v-for="(item, i) in press" :key="i" class="flex flex-col gap-4">
        <p class="font-serif text-beige text-lg md:text-xl leading-snug">
          &ldquo;{{ item.quote }}&rdquo;
        </p>
        <div class="mt-auto flex items-center justify-between text-xs text-grey">
          <span>{{ item.outlet }}</span>
          <time :datetime="item.date">{{ item.date }}</time>
        </div>
      </li>
    </ul>

    <!-- Bottom bar -->
    <div class="mt-16 flex flex-col gap-4 border-t border-beige/15 pt-8 text-sm text-grey md:flex-row md:items-center md:justify-between">
      <span>© EARTH AI – {{ new Date().getFullYear() }}</span>
      <nav class="flex gap-8">
        <a v-for="link in legal" :key="link.label" :href="link.href" class="hover:text-beige transition-colors">
          {{ link.label }}
        </a>
      </nav>
    </div>
  </footer>
</template>

<script setup>
// TODO: pull press + links from Prismic global settings once the repo is connected.
const press = [
  {
    quote: 'Earth AI is vertically integrating the search for critical minerals.',
    outlet: 'TechCrunch',
    date: '2025-08-07',
  },
  {
    quote: 'The Future 50 is here.',
    outlet: 'Generalist',
    date: '2025-08-06',
  },
  {
    quote: "AI could be the US's secret weapon in the race to mine more minerals — if it can prove itself.",
    outlet: 'Business Insider',
    date: '2025-08-03',
  },
]

const legal = [
  { label: 'Privacy Policy',   href: '#privacy' },
  { label: 'Terms of Service', href: '#terms' },
]
</script>
