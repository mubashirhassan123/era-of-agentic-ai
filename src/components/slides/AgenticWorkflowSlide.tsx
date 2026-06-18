import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import {
  Search,
  Users,
  TrendingUp,
  UserCheck,
  HeadphonesIcon,
  Code2,
  ArrowRight,
  Bot,
  Workflow,
} from 'lucide-react'
import DataHarmonics from '../scene/DataHarmonics'

const agents = [
  {
    icon: Search,
    title: 'Research Agent',
    before: 'Manual literature search: 8-12 hours',
    after: 'AI synthesis: 30 minutes',
    saved: '7-11 hours/week',
    color: '#2BFF8E',
  },
  {
    icon: Users,
    title: 'Meeting Agent',
    before: 'Note-taking + follow-ups: 3-4 hours',
    after: 'Auto-transcription + action items: 5 minutes',
    saved: '3-4 hours/week',
    color: '#00E5FF',
  },
  {
    icon: TrendingUp,
    title: 'Sales Agent',
    before: 'Lead qualification + outreach: 15-20 hours',
    after: 'AI scoring + personalized sequences: 2 hours',
    saved: '13-18 hours/week',
    color: '#2BFF8E',
  },
  {
    icon: UserCheck,
    title: 'Recruiting Agent',
    before: 'Resume screening + interviews: 20-25 hours',
    after: 'AI ranking + first-round screening: 3 hours',
    saved: '17-22 hours/week',
    color: '#00E5FF',
  },
  {
    icon: HeadphonesIcon,
    title: 'Customer Support Agent',
    before: 'Ticket resolution: 30-40 hours',
    after: 'AI-first resolution + escalation: 5-8 hours',
    saved: '25-32 hours/week',
    color: '#2BFF8E',
  },
  {
    icon: Code2,
    title: 'Coding Agent',
    before: 'Boilerplate + debugging: 20-30 hours',
    after: 'AI-generated code + review: 8-12 hours',
    saved: '12-18 hours/week',
    color: '#00E5FF',
  },
]

export default function AgenticWorkflowSlide() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.agent-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
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
      <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
        <DataHarmonics />
      </div>

      <div className="max-w-7xl w-full relative">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-mint/10 border border-mint/30 mb-6">
            <Workflow className="w-4 h-4 text-mint" />
            <span className="text-sm font-mono text-mint uppercase tracking-wider">
              Part 4: Agentic Workflows
            </span>
          </div>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">
            The Agentic Workforce
          </h2>
          <p className="text-xl text-sage max-w-3xl mx-auto">
            From chatbots to autonomous agents. AI that plans, executes, and iterates
            on your behalf.
          </p>
        </div>

        <div className="liquid-glass p-8 mb-8">
          <div className="flex items-center justify-center gap-8 mb-4 flex-wrap">
            <div className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white/5">
              <Bot className="w-6 h-6 text-sage/60" />
              <div>
                <p className="font-mono text-xs text-sage/60 uppercase">Chatbot</p>
                <p className="text-white text-sm">Responds to prompts</p>
              </div>
            </div>
            <ArrowRight className="w-6 h-6 text-mint" />
            <div className="flex items-center gap-3 px-6 py-3 rounded-xl bg-mint/10 border border-mint/30">
              <Bot className="w-6 h-6 text-mint" />
              <div>
                <p className="font-mono text-xs text-mint uppercase">Agent</p>
                <p className="text-white text-sm">Plans and executes tasks</p>
              </div>
            </div>
            <ArrowRight className="w-6 h-6 text-mint" />
            <div className="flex items-center gap-3 px-6 py-3 rounded-xl bg-cyan/10 border border-cyan/30">
              <Users className="w-6 h-6 text-cyan" />
              <div>
                <p className="font-mono text-xs text-cyan uppercase">Multi-Agent</p>
                <p className="text-white text-sm">Collaborative teams</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.map((agent, i) => (
            <div
              key={i}
              className="agent-card liquid-glass p-6 hover:border-mint/30 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${agent.color}15`, border: `1px solid ${agent.color}40` }}
                >
                  <agent.icon className="w-6 h-6" style={{ color: agent.color }} />
                </div>
                <h3 className="font-display text-xl font-semibold text-white">
                  {agent.title}
                </h3>
              </div>

              <div className="space-y-3 text-sm">
                <div className="p-3 rounded-lg bg-white/5">
                  <p className="font-mono text-xs text-sage/60 uppercase mb-1">Before AI</p>
                  <p className="text-sage">{agent.before}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-mint mx-auto" />
                <div className="p-3 rounded-lg bg-mint/5 border border-mint/20">
                  <p className="font-mono text-xs text-mint uppercase mb-1">With Agent</p>
                  <p className="text-white">{agent.after}</p>
                </div>
                <div className="pt-3 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-mint uppercase">Time Saved</span>
                    <span className="font-display text-xl font-bold" style={{ color: agent.color }}>
                      {agent.saved}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
