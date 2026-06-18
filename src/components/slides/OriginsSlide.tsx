import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import {
  History,
  Lightbulb,
  Sparkles,
  Snowflake,
  Cpu,
  BrainCircuit,
  Network,
  MessageSquare,
  Bot,
  Quote,
} from 'lucide-react'

type Milestone = { year: string; title: string; text: string }

interface Era {
  id: string
  label: string
  range: string
  icon: typeof History
  headline: string
  summary: string
  milestones: Milestone[]
  quote?: string
}

const eras: Era[] = [
  {
    id: 'dream',
    label: 'The Dream',
    range: '1950 – 1956',
    icon: Lightbulb,
    headline: 'A question that started a field',
    summary:
      'Long before machines could "think", visionaries asked whether they ever could. Their bold ideas gave the field both its name and its north star.',
    milestones: [
      {
        year: '1950',
        title: 'The Turing Test',
        text: 'Alan Turing publishes "Computing Machinery and Intelligence", proposing the Imitation Game to ask whether a machine can convincingly imitate a human.',
      },
      {
        year: '1956',
        title: '"Artificial Intelligence" is born',
        text: 'At the Dartmouth Summer Workshop, John McCarthy coins the term "Artificial Intelligence" and AI becomes a formal field of study.',
      },
    ],
    quote: '"Can machines think?" — Alan Turing, 1950',
  },
  {
    id: 'optimism',
    label: 'Early Optimism',
    range: '1957 – 1973',
    icon: Sparkles,
    headline: 'Symbolic AI and great expectations',
    summary:
      'Early programs reasoned with symbols and logic, and researchers believed human-level AI was only years away — confidence that quickly outran the hardware of the era.',
    milestones: [
      {
        year: '1958',
        title: 'The Perceptron',
        text: 'Frank Rosenblatt builds the Perceptron, an early neural network that learns from examples — the distant ancestor of modern deep learning.',
      },
      {
        year: '1966',
        title: 'ELIZA, the first chatbot',
        text: 'Joseph Weizenbaum\'s ELIZA mimics a therapist, revealing how readily people project understanding onto machines.',
      },
      {
        year: '1969',
        title: 'Limits exposed',
        text: 'Minsky and Papert show single-layer perceptrons cannot solve simple problems like XOR, cooling enthusiasm for neural networks.',
      },
    ],
  },
  {
    id: 'winter',
    label: 'The AI Winters',
    range: '1974 – 1993',
    icon: Snowflake,
    headline: 'When hype met reality',
    summary:
      'Twice, inflated promises collided with technical limits and funding froze. Yet rule-based "expert systems" found real commercial use and kept the field alive.',
    milestones: [
      {
        year: '1974',
        title: 'First AI Winter',
        text: 'Governments slash research funding as AI fails to deliver on its grandest promises.',
      },
      {
        year: '1980s',
        title: 'Expert systems boom',
        text: 'Systems that encode human expertise as rules power AI\'s first major commercial wave in business.',
      },
      {
        year: '1987',
        title: 'Second AI Winter',
        text: 'The specialized AI hardware market collapses and optimism fades for a second time.',
      },
    ],
  },
  {
    id: 'ml',
    label: 'Machine Learning Rises',
    range: '1997 – 2011',
    icon: Cpu,
    headline: 'Learning from data, not rules',
    summary:
      'A quieter revolution: instead of hand-coding rules, systems began learning patterns from growing mountains of data on ever-faster computers.',
    milestones: [
      {
        year: '1997',
        title: 'Deep Blue beats Kasparov',
        text: 'IBM\'s chess machine defeats the reigning world champion — a watershed moment for machine reasoning.',
      },
      {
        year: '2006',
        title: 'Deep learning reframed',
        text: 'Geoffrey Hinton revives deep neural networks, showing how they can be trained effectively layer by layer.',
      },
      {
        year: '2011',
        title: 'Watson wins Jeopardy!',
        text: 'IBM Watson beats human champions, showcasing natural-language question answering at scale.',
      },
    ],
  },
  {
    id: 'deep',
    label: 'Deep Learning Revolution',
    range: '2012 – 2016',
    icon: BrainCircuit,
    headline: 'Neural networks come of age',
    summary:
      'GPUs, big data, and deep networks shattered records in vision, speech, and games — igniting the modern AI boom.',
    milestones: [
      {
        year: '2012',
        title: 'AlexNet',
        text: 'A deep neural network crushes the ImageNet challenge, proving deep learning works spectacularly at scale.',
      },
      {
        year: '2014',
        title: 'Generative networks (GANs)',
        text: 'Ian Goodfellow introduces GANs — networks that learn to create realistic images, audio, and more.',
      },
      {
        year: '2016',
        title: 'AlphaGo',
        text: 'DeepMind\'s AlphaGo defeats Go champion Lee Sedol at a game long thought too intuitive for machines.',
      },
    ],
  },
  {
    id: 'transformer',
    label: 'The Transformer Era',
    range: '2017 – 2021',
    icon: Network,
    headline: 'The architecture that changed everything',
    summary:
      'A new model design unlocked training on internet-scale text, giving rise to the large language models that power today\'s AI.',
    milestones: [
      {
        year: '2017',
        title: '"Attention Is All You Need"',
        text: 'Google researchers introduce the Transformer — the foundation beneath virtually every modern LLM.',
      },
      {
        year: '2018',
        title: 'GPT & BERT',
        text: 'Pre-trained language models show that scale plus self-supervision yields broad, general language ability.',
      },
      {
        year: '2020',
        title: 'GPT-3',
        text: '175 billion parameters demonstrate startling few-shot abilities and capture the world\'s imagination.',
      },
    ],
  },
  {
    id: 'generative',
    label: 'Generative Explosion',
    range: '2022 – 2024',
    icon: MessageSquare,
    headline: 'AI goes mainstream',
    summary:
      'Generative AI reached everyone at once. ChatGPT became the fastest-growing app in history and reset expectations for what software can do.',
    milestones: [
      {
        year: '2022',
        title: 'ChatGPT arrives',
        text: 'OpenAI\'s chatbot reaches 100 million users in two months — the fastest consumer adoption ever recorded.',
      },
      {
        year: '2023',
        title: 'GPT-4, Claude & Gemini',
        text: 'Multimodal, reasoning-capable models push coding, analysis, and vision to dramatic new heights.',
      },
      {
        year: '2024',
        title: 'Multimodal & open',
        text: 'AI is embedded across everyday products, while capable open models make the technology widely accessible.',
      },
    ],
  },
  {
    id: 'agentic',
    label: 'The Agentic Era',
    range: '2025 →',
    icon: Bot,
    headline: 'From answering to acting',
    summary:
      'AI stops waiting for prompts and starts pursuing goals — planning, using tools, and collaborating with little supervision. This is the era you are living in now.',
    milestones: [
      {
        year: '2025',
        title: 'Autonomous agents',
        text: 'AI systems plan multi-step tasks, call tools and APIs, and work alongside human teams end to end.',
      },
      {
        year: 'Next',
        title: 'Agentic organizations',
        text: 'Fleets of specialized agents coordinate real work — the subject of the rest of this seminar.',
      },
    ],
    quote: '"The best way to predict the future is to invent it." — Alan Kay',
  },
]

export default function OriginsSlide() {
  const containerRef = useRef<HTMLDivElement>(null)
  const detailRef = useRef<HTMLDivElement>(null)
  const [activeEra, setActiveEra] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.era-node',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power3.out', delay: 0.2 }
      )
    }, containerRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!detailRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.detail-animate',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out' }
      )
    }, detailRef)
    return () => ctx.revert()
  }, [activeEra])

  const active = eras[activeEra]

  return (
    <div
      ref={containerRef}
      className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8 py-20"
    >
      <div className="max-w-7xl w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-mint/10 border border-mint/30 mb-6">
            <History className="w-4 h-4 text-mint" />
            <span className="text-sm font-mono text-mint uppercase tracking-wider">
              Part 1: The Origins of AI
            </span>
          </div>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">
            How It All Began
          </h2>
          <p className="text-xl text-sage max-w-3xl mx-auto">
            Seven decades from a single bold question to autonomous machines &mdash;
            the milestones that built modern AI.
          </p>
        </div>

        {/* Timeline rail */}
        <div className="relative mb-8">
          <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-mint/30 to-transparent" />
          <div className="relative flex gap-3 overflow-x-auto pb-3 scrollbar-thin">
            {eras.map((era, i) => {
              const isActive = i === activeEra
              return (
                <button
                  key={era.id}
                  onClick={() => setActiveEra(i)}
                  className={`era-node flex-shrink-0 w-40 rounded-2xl p-4 text-left transition-all duration-300 ${
                    isActive
                      ? 'liquid-glass-strong border-mint/60 bg-mint/5 scale-[1.03]'
                      : 'liquid-glass hover:border-mint/30'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                        isActive
                          ? 'bg-mint/20 border border-mint/40'
                          : 'bg-white/5 border border-white/10'
                      }`}
                    >
                      <era.icon className={`w-5 h-5 ${isActive ? 'text-mint' : 'text-sage/70'}`} />
                    </div>
                    <span
                      className={`font-mono text-xs ${
                        isActive ? 'text-cyan' : 'text-sage/50'
                      }`}
                    >
                      {era.range}
                    </span>
                  </div>
                  <p
                    className={`font-display text-sm font-semibold leading-tight ${
                      isActive ? 'text-white' : 'text-sage'
                    }`}
                  >
                    {era.label}
                  </p>
                </button>
              )
            })}
          </div>
        </div>

        {/* Detail panel */}
        <div ref={detailRef} className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 liquid-glass-strong p-8 flex flex-col detail-animate">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-mint/10 border border-mint/40 flex items-center justify-center flex-shrink-0">
                <active.icon className="w-7 h-7 text-mint" />
              </div>
              <div>
                <p className="font-mono text-sm text-cyan">{active.range}</p>
                <h3 className="font-display text-2xl font-bold text-white leading-tight">
                  {active.label}
                </h3>
              </div>
            </div>

            <p className="font-display text-lg text-mint mb-3">{active.headline}</p>
            <p className="text-sage leading-relaxed flex-grow">{active.summary}</p>

            {active.quote && (
              <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                <Quote className="w-5 h-5 text-mint/40 flex-shrink-0 mt-0.5" />
                <p className="text-sage text-sm italic leading-relaxed">{active.quote}</p>
              </div>
            )}

            <div className="mt-6 flex items-center gap-2">
              <span className="font-mono text-xs text-sage/50">
                Era {String(activeEra + 1).padStart(2, '0')} / {String(eras.length).padStart(2, '0')}
              </span>
              <div className="flex-grow h-1 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-mint to-cyan transition-all duration-500"
                  style={{ width: `${((activeEra + 1) / eras.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 liquid-glass p-8">
            <h4 className="font-mono text-xs text-mint uppercase tracking-wider mb-6">
              Defining Milestones
            </h4>
            <div className="relative pl-8">
              <div className="absolute left-[11px] top-1 bottom-1 w-px bg-gradient-to-b from-mint/50 via-mint/20 to-transparent" />
              <div className="space-y-6">
                {active.milestones.map((m, i) => (
                  <div key={i} className="detail-animate relative">
                    <div className="absolute -left-8 top-0.5 w-6 h-6 rounded-full bg-teal border-2 border-mint/60 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-mint" />
                    </div>
                    <div className="flex items-baseline gap-3 mb-1 flex-wrap">
                      <span className="font-display text-2xl font-bold gradient-text">
                        {m.year}
                      </span>
                      <span className="font-display text-lg font-semibold text-white">
                        {m.title}
                      </span>
                    </div>
                    <p className="text-sage text-sm leading-relaxed">{m.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
