import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Cpu, MessageSquare, Brain, Zap, ArrowRight } from 'lucide-react'

const stats = [
  {
    value: '~70 yrs',
    label: 'In the making',
    detail: 'From the 1956 Dartmouth workshop to today\'s agents.',
  },
  {
    value: '2 months',
    label: 'To 100M users',
    detail: 'ChatGPT became the fastest-adopted app in history.',
  },
  {
    value: '10x / yr',
    label: 'Cheaper intelligence',
    detail: 'The cost per token keeps falling dramatically.',
  },
]

const evolutionSteps = [
  {
    icon: Cpu,
    title: 'Traditional Software',
    desc: 'Rule-based systems executing predefined instructions. Static, predictable, limited by human programming.',
    era: '1970s - 2010s',
  },
  {
    icon: MessageSquare,
    title: 'AI Assistants',
    desc: 'ChatGPT-style tools that respond to prompts but require constant human direction for each task.',
    era: '2022 - 2024',
  },
  {
    icon: Brain,
    title: 'Agentic AI',
    desc: 'Autonomous agents that plan, execute, and iterate on complex workflows with minimal supervision.',
    era: '2025 - Present',
  },
]

export default function IntroductionSlide() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.intro-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.2,
          ease: 'power3.out',
          delay: 0.3,
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8 py-20"
    >
      <div className="max-w-7xl w-full">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-mint/10 border border-mint/30 mb-6">
            <Zap className="w-4 h-4 text-mint" />
            <span className="text-sm font-mono text-mint uppercase tracking-wider">
              Part 2: Foundations
            </span>
          </div>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">
            The Evolution of Intelligence
          </h2>
          <p className="text-xl text-sage max-w-3xl mx-auto">
            In just three generations, software went from following rigid rules to
            autonomous agents that think, plan, and act on our behalf.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {evolutionSteps.map((step, i) => (
            <div
              key={i}
              className="intro-card liquid-glass-strong p-8 flex flex-col group hover:border-mint/40 transition-all duration-500"
            >
              <div className="flex items-center justify-between mb-6">
                <step.icon className="w-10 h-10 text-mint" />
                <span className="font-mono text-xs text-sage/60 uppercase tracking-wider">
                  {step.era}
                </span>
              </div>

              <h3 className="font-display text-2xl font-semibold text-white mb-4">
                {step.title}
              </h3>
              <p className="text-sage leading-relaxed flex-grow">{step.desc}</p>

              {i < evolutionSteps.length - 1 && (
                <div className="mt-6 flex items-center gap-2 text-mint/60">
                  <ArrowRight className="w-5 h-5" />
                  <span className="text-sm font-mono">Next evolution</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 liquid-glass p-8 text-center">
          <h3 className="font-display text-2xl font-semibold text-white mb-3">
            Why AI Matters Now
          </h3>
          <p className="text-sage max-w-4xl mx-auto leading-relaxed">
            We are at an inflection point. Model capabilities are climbing fast while
            the cost of intelligence falls sharply each year, and the shift from passive
            chatbots to active agents is redefining what software can do. Every industry,
            every role, and every student will feel the impact &mdash; the question is no
            longer <span className="text-white">if</span>, but <span className="text-white">how</span> you adapt.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="liquid-glass p-6 text-center">
              <p className="font-display text-4xl font-bold gradient-text mb-1">
                {s.value}
              </p>
              <p className="font-display text-sm font-semibold text-white mb-1">
                {s.label}
              </p>
              <p className="text-sage/70 text-xs leading-relaxed">{s.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
