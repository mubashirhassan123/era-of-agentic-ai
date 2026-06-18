import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import {
  Briefcase,
  BrainCircuit,
  MessageSquare,
  FileStack,
  Search,
  BarChart3,
  Gauge,
  ArrowUpRight,
} from 'lucide-react'

const capabilities = [
  {
    icon: BrainCircuit,
    title: 'Decision Making',
    desc: 'Analyze complex scenarios, weigh options, and generate data-driven recommendations.',
    example: 'Feed AI your business constraints and ask for a decision matrix with pros/cons for each option.',
    stat: '73% of executives report faster decisions with AI assistance',
  },
  {
    icon: MessageSquare,
    title: 'Communication',
    desc: 'Draft emails, presentations, and proposals that match your tone and audience.',
    example: 'Paste your rough notes and ask AI to draft a polished executive summary.',
    stat: '90% reduction in email drafting time for most professionals',
  },
  {
    icon: FileStack,
    title: 'Documentation',
    desc: 'Auto-generate meeting notes, reports, SOPs, and compliance documents.',
    example: 'Upload meeting recording transcript and get structured action items instantly.',
    stat: '85% of meeting documentation can be fully automated',
  },
  {
    icon: Search,
    title: 'Research',
    desc: 'Synthesize industry reports, competitor analysis, and market trends.',
    example: 'Ask AI to compile a competitive landscape analysis for your target market.',
    stat: 'Research tasks that took days now complete in hours',
  },
  {
    icon: BarChart3,
    title: 'Data Analysis',
    desc: 'Interpret spreadsheets, generate insights, and create visualizations.',
    example: 'Upload a CSV and ask for key trends, outliers, and business recommendations.',
    stat: 'Data analysis productivity increases by 40-60% with AI tools',
  },
  {
    icon: Gauge,
    title: 'Productivity',
    desc: 'Automate repetitive tasks, prioritize workflows, and manage time effectively.',
    example: 'Use AI to triage your inbox, draft responses, and schedule priorities.',
    stat: 'Average knowledge worker saves 8-12 hours per week',
  },
]

export default function ProfessionalsSlide() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.pro-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
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
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-mint/10 border border-mint/30 mb-6">
            <Briefcase className="w-4 h-4 text-mint" />
            <span className="text-sm font-mono text-mint uppercase tracking-wider">
              Part 8: AI for Professionals
            </span>
          </div>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">
            Supercharge Your Career
          </h2>
          <p className="text-xl text-sage max-w-3xl mx-auto">
            AI is not replacing professionals. It is amplifying their impact.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, i) => (
            <div
              key={i}
              className="pro-card liquid-glass p-6 hover:border-mint/30 transition-all duration-300 group flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-mint/10 border border-mint/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <cap.icon className="w-6 h-6 text-mint" />
                </div>
                <ArrowUpRight className="w-5 h-5 text-sage/40 group-hover:text-mint transition-colors" />
              </div>

              <h3 className="font-display text-xl font-semibold text-white mb-3">
                {cap.title}
              </h3>
              <p className="text-sage text-sm leading-relaxed mb-4 flex-grow">
                {cap.desc}
              </p>

              <div className="p-3 rounded-lg bg-cyan/5 border border-cyan/20 mb-4">
                <p className="text-xs text-cyan font-mono leading-relaxed">
                  {cap.example}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-mint animate-pulse" />
                  <p className="font-mono text-xs text-mint">{cap.stat}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 liquid-glass p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-display text-3xl font-bold text-white mb-4">
                The 10x Professional
              </h3>
              <p className="text-sage leading-relaxed mb-4">
                Professionals who master AI tools are already outpacing their peers.
                They complete more projects, produce higher quality work, and have more
                time for strategic thinking.
              </p>
              <div className="flex items-center gap-4">
                <div className="px-4 py-2 rounded-full bg-mint/10 border border-mint/30">
                  <span className="font-mono text-sm text-mint">8-12 hrs saved/week</span>
                </div>
                <div className="px-4 py-2 rounded-full bg-cyan/10 border border-cyan/30">
                  <span className="font-mono text-sm text-cyan">40-70% productivity gain</span>
                </div>
              </div>
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden">
              <img
                src="/professional-work.jpg"
                alt="Professional using AI"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#032820] via-[#032820]/40 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
