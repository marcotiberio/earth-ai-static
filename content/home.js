// Static content — mirrors Prismic slice structure exactly.
// When Prismic is connected, delete this file and fetch from the API instead.
//
// Drafted from the Figma "V4_SCROLL" master frame (node 442:4677). Each block
// below maps to one slide in that comp; see the slice components in /slices.
//
// Scroll-scrub videos accept a per-section `scrub_start` in `primary`:
//   'top'    → scrub starts when the section's top hits the viewport top
//   'middle' → scrub starts when the section's top hits the viewport centre
// Omit it on pinned scenes (hero / overlay / CTA) to keep their full-travel scrub.

export const homePage = {
  data: {
    meta_title: 'Earth AI — Supplying Critical Minerals for the New Industrial Era',
    meta_description: 'Earth AI is a vertically integrated, AI-powered explorer that discovers, develops, and owns critical mineral mines.',
    slices: [

      // ── Slide 1 · Hero ────────────────────────────────────────────────────
      {
        slice_type: 'hero_image',
        variation: 'default',
        primary: {
          video_url: '/videos/EAI_Landscape-Hero.mp4',
          image: {
            url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920',
            alt: 'Mountain landscape',
          },
          height: 'full',
          title: 'Supplying Critical Minerals for the <em>New Industrial Era</em>',
          subtitle: 'We are a vertically integrated AI-powered explorer that discovers, develops, and owns critical mineral mines.',
          button_link: null,
          // Decorative animated tick-counters from the comp (positions are % of viewport)
          markers: [
            { value: '25,405', x: '39%', y: '27%' },
            { value: '45,670', x: '85%', y: '47%' },
          ],
        },
      },

      // ── Slide 2 · Datacenter / $12T ───────────────────────────────────────
      {
        slice_type: 'image_text',
        variation: 'overlay',
        primary: {
          video_url: '/videos/EAI_Datacenter-ChipDrawer_SideScroll01.mp4',
          scrub_start: 'middle', // 'top' | 'middle'
          image: {
            url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600',
            alt: 'Data centre server racks',
          },
          title: 'The future requires <em>$12 trillion</em> of critical minerals.',
          body: 'AI data centres, next-gen processors, quantum computing, GPUs, green energy, and batteries all depend on minerals that are increasingly scarce.',
        },
      },

      // ── Slide 3 · Chip (full-bleed overlay) ───────────────────────────────
      {
        slice_type: 'image_text',
        variation: 'overlay',
        primary: {
          video_url: '/videos/EAI_Chip-Rock.mp4',
          image: {
            url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600',
            alt: 'Processor chip close-up',
          },
          title: 'All cannot exist without <em>critical minerals</em>.',
        },
      },

      // ── Slide 4.4 · Demand vs supply chart ────────────────────────────────
      {
        slice_type: 'supply_chart',
        variation: 'default',
        primary: {
          heading: 'Demand is set, but supply is <em>completely uncertain</em>.',
          body: 'A typical mine contains $10 billion of revenue. By 2040 there is a 643-mine deficit comprising a massive $6.5 trillion gap that remains unfulfilled.',
          y_ticks: ['10', '20', '30', '40', '50'],
          x_labels: ['2030', '2035', '2040'],
          demand: { label: 'DEMAND', value: '1270' },
          supply: { label: 'current and developing mines', value: '627' },
        },
      },

      // ── Slide 5.4 · Incumbents comparison ─────────────────────────────────
      {
        slice_type: 'comparison_bars',
        variation: 'default',
        primary: {
          heading: 'Incumbents created the problem, but they won’t be the ones to <em>solve it</em>.',
        },
        items: [
          {
            metric: 'SPEED OF DISCOVERY',
            unit: 'YEARS',
            rows: [
              { label: 'Other Explorers', value: 15 },
              { label: 'EARTH AI', value: 3, highlight: true },
            ],
          },
          {
            metric: 'SUCCESS RATE',
            unit: '%',
            rows: [
              { label: 'Other Explorers', value: 0.5 },
              { label: 'EARTH AI', value: 80, highlight: true },
            ],
          },
        ],
      },

      // ── Slide 6 · Statement ───────────────────────────────────────────────
      {
        slice_type: 'wysiwyg',
        variation: 'statement',
        primary: {
          content: 'Traditional explorers will soon be replaced by <em>AI-software defined explorers</em>.',
        },
      },

      // ── Slide 7.2 · Mineral Targeting Platform ────────────────────────────
      {
        slice_type: 'feature_media',
        variation: 'default',
        primary: {
          video_url: '/videos/EAI_Scan.mp4',
          image: {
            url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600',
            alt: 'Continental-scale targeting map',
          },
          heading: 'We operate like no other mineral exploration company.',
          body: 'Mineral Targeting Platform (MTP) is our proprietary geology deep-learning system for hydrothermal mineralization discovery. Unlike conventional localized exploration, MTP provides continental-scale predictive capability that discovered 850 new targets at 80% precision.',
        },
      },

      // ── Slide 8.4 · Drill stats ───────────────────────────────────────────
      {
        slice_type: 'stats_row',
        variation: 'default',
        primary: {
          heading: 'We drilled through the <em>stratosphere</em>.',
          video_url: '/videos/EAI_Ground.mp4',
          scrub_start: 'middle', // 'top' | 'middle'
          image: { url: '', alt: '' },
        },
        items: [
          { value: '96,000', label: 'Feet Drilled' },
          { value: '62',     label: 'Holes Drilled' },
          { value: '28',     label: 'Projects' },
          { value: '4.1 mil', label: 'Acres of Mineral Rights' },
          { value: '6',      label: 'Deposits' },
        ],
      },

      // ── Slide 9 · CTA ─────────────────────────────────────────────────────
      {
        slice_type: 'cta',
        variation: 'default',
        primary: {
          video_url: '/videos/EAI_FutureCity.mp4',
          title: 'Let’s build the <em>future</em> together.',
          button_link: { url: '#contact', text: 'Contact us' },
        },
      },

    ],
  },
}
