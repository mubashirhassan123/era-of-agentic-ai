import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import {
  FileText,
  BookOpen,
  Briefcase,
  Lightbulb,
  TrendingDown,
  Clock,
  Zap,
  Target,
} from 'lucide-react'

const studentCases = [
  { task: 'Assignment Planning', manual: '2 hours', ai: '20 min', improvement: '83%' },
  { task: 'Research Summarization', manual: '4 hours', ai: '15 min', improvement: '94%' },
  { task: 'Note Generation', manual: '1.5 hours', ai: '10 min', improvement: '89%' },
  { task: 'Literature Review', manual: '8 hours', ai: '45 min', improvement: '91%' },
]

const professionalCases = [
  { task: 'Report Writing', manual: '6 hours', ai: '45 min', improvement: '88%' },
  { task: 'Email Drafting', manual: '30 min', ai: '3 min', improvement: '90%' },
  { task: 'Meeting Summaries', manual: '1 hour', ai: '5 min', improvement: '92%' },
  { task: 'Policy Analysis', manual: '4 hours', ai: '30 min', improvement: '88%' },
  { task: 'Financial Analysis', manual: '5 hours', ai: '40 min', improvement: '87%' },
]

const entrepreneurCases = [
  { task: 'Business Plans', manual: '20 hours', ai: '3 hours', improvement: '85%' },
  { task: 'Market Research', manual: '15 hours', ai: '2 hours', improvement: '87%' },
  { task: 'Competitor Analysis', manual: '8 hours', ai: '1 hour', improvement: '88%' },
  { task: 'SOP Generation', manual: '5 hours', ai: '30 min', improvement: '90%' },
]

const sections = [
  { title: 'Students', icon: BookOpen, color: '#2BFF8E', cases: studentCases },
  { title: 'Professionals', icon: Briefcase, color: '#00E5FF', cases: professionalCases },
  { title: 'Entrepreneurs', icon: Lightbulb, color: '#FFD700', cases: entrepreneurCases },
]

export default function ClaudeUseCasesSlide() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.usecase-section',
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
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-mint/10 border border-mint/30 mb-6">
            <Target className="w-4 h-4 text-mint" />
            <span className="text-sm font-mono text-mint uppercase tracking-wider">
              Part 6: Practical Productivity
            </span>
          </div>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">
            Claude in Action
          </h2>
          <p className="text-xl text-sage max-w-3xl mx-auto">
            Real time savings from Anthropic Claude across different roles.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {sections.map((section) => (
            <div
              key={section.title}
              className="usecase-section liquid-glass-strong overflow-hidden"
            >
              <div
                className="p-6 border-b border-white/10"
                style={{ backgroundColor: `${section.color}10` }}
              >
                <div className="flex items-center gap-3">
                  <section.icon className="w-8 h-8" style={{ color: section.color }} />
                  <h3 className="font-display text-2xl font-semibold text-white">
                    {section.title}
                  </h3>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {section.cases.map((c, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <FileText className="w-4 h-4 text-sage/60" />
                      <span className="font-display font-semibold text-white text-sm">
                        {c.task}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <p className="font-mono text-xs text-sage/60 uppercase">Manual</p>
                        <p className="font-mono text-sm text-sage flex items-center justify-center gap-1">
                          <Clock className="w-3 h-3" />
                          {c.manual}
                        </p>
                      </div>
                      <div>
                        <p className="font-mono text-xs text-mint uppercase">AI</p>
                        <p className="font-mono text-sm text-mint flex items-center justify-center gap-1">
                          <Zap className="w-3 h-3" />
                          {c.ai}
                        </p>
                      </div>
                      <div>
                        <p className="font-mono text-xs text-cyan uppercase">Saved</p>
                        <p className="font-mono text-sm text-cyan flex items-center justify-center gap-1">
                          <TrendingDown className="w-3 h-3" />
                          {c.improvement}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
