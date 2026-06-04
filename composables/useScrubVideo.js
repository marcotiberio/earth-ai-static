import { onMounted, onUnmounted, unref } from 'vue'

/**
 * Drive a <video>'s currentTime from scroll position (scroll-scrub), instead of
 * autoplaying it. Pass a ref to the video and a ref to the element that acts as
 * the ScrollTrigger trigger (usually the section root).
 *
 * Options:
 *   startAt     — named start preset ('top' | 'middle'); see SCRUB_PRESETS.
 *   start / end — explicit ScrollTrigger positions. Override the preset when
 *                 given; otherwise default to the full transit through view.
 *   scrub       — ScrollTrigger scrub value (seconds of catch-up lag).
 *
 * The Safari priming notes from the original ScrollVideo slice still apply:
 * we wait for a decoded frame and kick the decode pipeline with a muted
 * play()/pause() so seeks actually repaint.
 */

// Named start/end presets, selectable per section (e.g. via a `scrub_start`
// content field). Both scrub across the section's transit — they differ only
// in where in the viewport the scrub begins and ends.
export const SCRUB_PRESETS = {
  // Scrub begins when the section's top reaches the top of the viewport.
  top:    { start: 'top top',    end: 'bottom top' },
  // Scrub begins when the section's top reaches the centre of the viewport.
  middle: { start: 'top center', end: 'bottom center' },
}

export function useScrubVideo(videoRef, triggerRef, options = {}) {
  let ctx = null

  // Resolve a named preset into positions. An explicit start/end always wins.
  const preset = SCRUB_PRESETS[options.startAt] || {}
  const start  = options.start || preset.start || 'top bottom'
  const end    = options.end   || preset.end   || 'bottom top'

  onMounted(async () => {
    const video   = unref(videoRef)
    const trigger = unref(triggerRef)
    if (!video || !trigger) return

    const { gsap }              = await import('gsap')
    const { ScrollTrigger: ST } = await import('gsap/ScrollTrigger')
    gsap.registerPlugin(ST)

    video.muted = true // required for an unattended play()

    // Kick the pipeline BEFORE waiting for data. iOS Safari ignores
    // preload="auto" — it won't fetch the clip (and won't paint seeked frames)
    // until a muted inline play() has run. Doing this after the wait deadlocks:
    // the data never arrives, so loadeddata never fires. A muted play() is
    // allowed without a user gesture, so it both starts buffering and unlocks
    // painting; we pause immediately and drive currentTime from scroll instead.
    // Only force a load() when the element is idle with nothing buffered (the
    // iOS case). On desktop it's already NETWORK_LOADING, so we skip it to
    // avoid interrupting / re-fetching.
    if (video.readyState === 0 && video.networkState !== 2 /* LOADING */) {
      try { video.load() } catch { /* ignore */ }
    }
    const kick = video.play()
    if (kick && kick.then) kick.then(() => video.pause()).catch(() => {})

    // Build the scrub off the clip's duration, so wait until metadata is known
    // (fires early, even on iOS, once load()/play() has run). Never hang: bail
    // out after a timeout and use whatever duration we have.
    await new Promise((resolve) => {
      if (Number.isFinite(video.duration) && video.duration > 0) return resolve()
      let settled = false
      const finish = () => {
        if (settled) return
        settled = true
        video.removeEventListener('loadedmetadata', finish)
        video.removeEventListener('loadeddata', finish)
        video.removeEventListener('canplay', finish)
        clearTimeout(timer)
        resolve()
      }
      video.addEventListener('loadedmetadata', finish)
      video.addEventListener('loadeddata', finish)
      video.addEventListener('canplay', finish)
      const timer = setTimeout(finish, 8000)
    })

    try {
      video.pause()
      video.currentTime = 0
    } catch { /* ignore */ }

    // Seek explicitly on each tick rather than tweening currentTime directly:
    // Safari coalesces rapid currentTime writes, so an explicit seek repaints
    // more reliably.
    const state = { time: 0 }
    ctx = gsap.context(() => {
      gsap.to(state, {
        time: video.duration,
        ease: 'none',
        scrollTrigger: {
          trigger,
          start,
          end,
          scrub: options.scrub ?? 1,
        },
        onUpdate: () => {
          if (Number.isFinite(state.time)) video.currentTime = state.time
        },
      })
    }, trigger)
  })

  onUnmounted(() => ctx?.revert())
}

// Two ready-made instances a section can call directly. Both forward to the
// engine above with a fixed start preset.
export const useScrubVideoTop = (videoRef, triggerRef, options = {}) =>
  useScrubVideo(videoRef, triggerRef, { ...options, startAt: 'top' })

export const useScrubVideoMiddle = (videoRef, triggerRef, options = {}) =>
  useScrubVideo(videoRef, triggerRef, { ...options, startAt: 'middle' })
