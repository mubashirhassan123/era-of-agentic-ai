import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Quote, ChevronRight, Sparkles } from 'lucide-react'

const takeaways = [
  'Seventy years of research now compound into rapid, real-world breakthroughs',
  'AI is transforming every industry at unprecedented speed',
  'Agentic workflows save professionals 8-12 hours per week',
  'Students can learn faster while building critical thinking skills',
  'The key is human-AI collaboration, not replacement',
  'Ethical use and verification are non-negotiable',
]

export default function ConclusionSlide() {
  const containerRef = useRef<HTMLDivElement>(null)
  const quoteRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.takeaway-item',
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out', delay: 0.3 }
      )
      gsap.fromTo(
        quoteRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1, ease: 'power3.out', delay: 0.8 }
      )
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8"
    >
      <div className="absolute inset-0 bg-gradient-radial from-[#032820]/50 via-transparent to-[#032820]/80 pointer-events-none" />

      <div className="max-w-5xl w-full relative">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-mint/10 border border-mint/30 mb-6">
            <Sparkles className="w-4 h-4 text-mint" />
            <span className="text-sm font-mono text-mint uppercase tracking-wider">
              Part 11: Conclusion
            </span>
          </div>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">
            The Path Forward
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center mb-12">
          <div className="space-y-3">
            {takeaways.map((item, i) => (
              <div
                key={i}
                className="takeaway-item flex items-start gap-3 p-4 rounded-xl liquid-glass hover:border-mint/30 transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-full bg-mint/10 border border-mint/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <ChevronRight className="w-4 h-4 text-mint" />
                </div>
                <p className="text-white leading-relaxed">{item}</p>
              </div>
            ))}
          </div>

          <div
            ref={quoteRef}
            className="liquid-glass-strong p-8 relative"
          >
            <Quote className="w-12 h-12 text-mint/30 absolute top-4 left-4" />
            <div className="relative z-10 text-center py-8">
              <p className="font-display text-3xl md:text-4xl font-bold gradient-text leading-tight mb-6">
                AI will not replace most people.
              </p>
              <p className="font-display text-3xl md:text-4xl font-bold text-white leading-tight mb-8">
                People using AI will replace people who do not.
              </p>
              <div className="w-16 h-0.5 bg-gradient-to-r from-mint to-cyan mx-auto mb-4" />
              <p className="text-sage font-mono text-sm">
                The choice is yours. Start today.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sage text-lg mb-4">
            Thank you for joining this journey into the Era of Agentic AI.
          </p>
          <div className="inline-flex items-center gap-4">
            <span className="font-mono text-xs text-mint uppercase tracking-widest">
              Questions?
            </span>
            <div className="w-12 h-px bg-gradient-to-r from-mint to-cyan" />
            <span className="font-mono text-xs text-cyan uppercase tracking-widest">
              Let&apos;s discuss
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
