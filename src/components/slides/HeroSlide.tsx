import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ChevronDown, Sparkles } from 'lucide-react'

interface HeroSlideProps {
  onNext: () => void
}

export default function HeroSlide({ onNext }: HeroSlideProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline()
    tl.fromTo(
      badgeRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    )
    .fromTo(
      titleRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      '-=0.4'
    )
    .fromTo(
      subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.5'
    )

    return () => { tl.kill() }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8 text-center"
    >
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-[#032820]/80 pointer-events-none" />
      
      <div
        ref={badgeRef}
        className="mb-8 px-6 py-2 liquid-glass inline-flex items-center gap-3"
      >
        <Sparkles className="w-5 h-5 text-mint" />
        <span className="text-sm font-mono tracking-wider text-mint uppercase">
          Interactive Seminar 2026
        </span>
      </div>

      <h1
        ref={titleRef}
        className="font-display text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-none mb-8"
      >
        <span className="gradient-text">The Era of</span>
        <br />
        <span className="text-white">Agentic AI</span>
      </h1>

      <p
        ref={subtitleRef}
        className="max-w-3xl text-xl md:text-2xl text-sage leading-relaxed mb-12"
      >
        A practical look at how autonomous AI agents are reshaping the way we
        work, learn, and build &mdash; and how to thrive alongside them.
      </p>

      <button
        onClick={onNext}
        className="group flex flex-col items-center gap-2 cursor-pointer transition-all duration-300 hover:scale-110"
      >
        <span className="text-sm font-mono text-mint/70 uppercase tracking-widest group-hover:text-mint transition-colors">
          Begin Journey
        </span>
        <ChevronDown className="w-6 h-6 text-mint/70 group-hover:text-mint animate-bounce transition-colors" />
      </button>
    </div>
  )
}
