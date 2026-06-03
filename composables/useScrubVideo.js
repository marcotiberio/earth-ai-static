import { onMounted, onUnmounted, unref } from 'vue'

/**
 * Drive a <video>'s currentTime from scroll position (scroll-scrub), instead of
 * autoplaying it. Pass a ref to the video and a ref to the element that acts as
 * the ScrollTrigger trigger (usually the section root).
 *
 * Options:
 *   start / end — ScrollTrigger positions. Defaults scrub the clip across the
 *                 section's full transit through the viewport.
 *   scrub       — ScrollTrigger scrub value (seconds of catch-up lag).
 *
 * The Safari priming notes from the original ScrollVideo slice still apply:
 * we wait for a decoded frame and kick the decode pipeline with a muted
 * play()/pause() so seeks actually repaint.
 */
export function useScrubVideo(videoRef, triggerRef, options = {}) {
  let ctx = null

  onMounted(async () => {
    const video   = unref(videoRef)
    const trigger = unref(triggerRef)
    if (!video || !trigger) return

    const { gsap }              = await import('gsap')
    const { ScrollTrigger: ST } = await import('gsap/ScrollTrigger')
    gsap.registerPlugin(ST)

    // Wait for actual frame data (readyState >= 2), not just metadata —
    // Safari needs a decoded frame before it will honour currentTime seeks.
    await new Promise((resolve) => {
      if (video.readyState >= 2) return resolve()
      video.addEventListener('loadeddata', resolve, { once: true })
    })

    // Prime the decode pipeline: Safari won't paint seeked frames on a video
    // that has never played. A muted play()/pause() kick fixes the frozen scrub.
    try {
      video.muted = true
      await video.play()
      video.pause()
      video.currentTime = 0
    } catch {
      // Autoplay rejected — scrub still works in browsers that don't need the kick.
    }

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
          start: options.start || 'top bottom',
          end:   options.end   || 'bottom top',
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
