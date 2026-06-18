import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import {
  Rocket,
  Users2,
  Bot,
  TrendingUp,
  Brain,
  Handshake,
  Sparkles,
} from 'lucide-react'

const trends = [
  {
    icon: Bot,
    title: 'Agentic Organizations',
    desc: 'Companies will operate as networks of specialized AI agents, each handling specific functions, collaborating with humans and other agents.',
    timeline: '2026-2028',
  },
  {
    icon: Users2,
    title: 'Digital Employees',
    desc: 'AI workers with persistent memory, specific roles, and the ability to learn company culture and processes over time.',
    timeline: '2027-2029',
  },
  {
    icon: Handshake,
    title: 'Human-AI Collaboration',
    desc: 'The most successful teams will blend human creativity, empathy, and judgment with AI speed, scale, and analytical power.',
    timeline: 'Now - Ongoing',
  },
]

const changingJobs = [
  { job: 'Data Entry Clerks', risk: 'Very High', pct: '95%' },
  { job: 'Basic Customer Service', risk: 'Very High', pct: '85%' },
  { job: 'Entry-level Analysts', risk: 'High', pct: '70%' },
  { job: 'Content Writers (Basic)', risk: 'High', pct: '65%' },
  { job: 'Paralegals', risk: 'High', pct: '60%' },
  { job: 'Translators', risk: 'Medium-High', pct: '55%' },
  { job: 'Software Developers', risk: 'Medium', pct: '35%' },
  { job: 'Teachers', risk: 'Low', pct: '15%' },
  { job: 'Healthcare Workers', risk: 'Low', pct: '10%' },
  { job: 'Creative Directors', risk: 'Very Low', pct: '5%' },
]

const valuableSkills = [
  { skill: 'Critical Thinking', icon: Brain },
  { skill: 'Emotional Intelligence', icon: Handshake },
  { skill: 'AI Orchestration', icon: Bot },
  { skill: 'Creative Problem Solving', icon: Sparkles },
  { skill: 'Strategic Vision', icon: TrendingUp },
  { skill: 'Complex Communication', icon: Users2 },
]

export default function FutureWorkSlide() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.trend-card',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out', delay: 0.3 }
      )
      gsap.fromTo(
        '.job-row',
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.05, ease: 'power3.out', delay: 0.6 }
      )
      gsap.fromTo(
        '.skill-badge',
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5, stagger: 0.08, ease: 'back.out(1.7)', delay: 0.9 }
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
            <Rocket className="w-4 h-4 text-mint" />
            <span className="text-sm font-mono text-mint uppercase tracking-wider">
              Part 10: Future of Work
            </span>
          </div>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">
            Tomorrow&apos;s Workplace
          </h2>
          <p className="text-xl text-sage max-w-3xl mx-auto">
            The organizations and skills that will define the next decade.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {trends.map((trend, i) => (
            <div
              key={i}
              className="trend-card liquid-glass-strong p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-mint/10 border border-mint/30 flex items-center justify-center">
                  <trend.icon className="w-6 h-6 text-mint" />
                </div>
                <span className="font-mono text-xs text-cyan uppercase">
                  {trend.timeline}
                </span>
              </div>
              <h3 className="font-display text-xl font-semibold text-white mb-3">
                {trend.title}
              </h3>
              <p className="text-sage text-sm leading-relaxed">{trend.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="liquid-glass overflow-hidden">
            <div className="p-6 border-b border-white/10">
              <h3 className="font-display text-xl font-semibold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-mint" />
                Jobs Likely to Change
              </h3>
              <p className="text-sage text-sm mt-1">
                Probability of significant AI disruption by 2030
              </p>
            </div>
            <div className="p-4 space-y-2 max-h-80 overflow-y-auto">
              {changingJobs.map((job, i) => (
                <div
                  key={i}
                  className="job-row flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <span className="text-white text-sm">{job.job}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-2 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          parseInt(job.pct) > 70
                            ? 'bg-red-400'
                            : parseInt(job.pct) > 40
                            ? 'bg-yellow-400'
                            : 'bg-mint'
                        }`}
                        style={{ width: job.pct }}
                      />
                    </div>
                    <span className="font-mono text-xs text-sage w-12 text-right">
                      {job.pct}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="liquid-glass p-6">
            <h3 className="font-display text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5 text-cyan" />
              Skills That Become More Valuable
            </h3>
            <p className="text-sage text-sm mb-6">
              As AI handles routine tasks, uniquely human skills become premium assets.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {valuableSkills.map((skill, i) => (
                <div
                  key={i}
                  className="skill-badge p-4 rounded-xl bg-mint/5 border border-mint/20 flex items-center gap-3 hover:bg-mint/10 transition-colors"
                >
                  <skill.icon className="w-5 h-5 text-mint flex-shrink-0" />
                  <span className="text-white text-sm font-display font-medium">
                    {skill.skill}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 relative h-40 rounded-xl overflow-hidden">
              <img
                src="/future-work.jpg"
                alt="Future of work"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#032820] via-[#032820]/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="font-display text-white text-lg font-semibold">
                  The future belongs to those who orchestrate AI,
                  not just use it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
