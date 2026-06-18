import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import {
  AlertTriangle,
  Eye,
  BrainCircuit,
  Scale,
  FileLock,
  ShieldCheck,
  AlertCircle,
  ChevronRight,
} from 'lucide-react'

const risks = [
  {
    icon: BrainCircuit,
    title: 'Hallucinations',
    severity: 'High',
    desc: 'AI can generate plausible but completely false information, citations, and facts.',
    mitigation: 'Always verify facts independently. Cross-reference with authoritative sources. Use AI as a starting point, not a final authority.',
  },
  {
    icon: Eye,
    title: 'Privacy Concerns',
    severity: 'High',
    desc: 'Sensitive data entered into AI systems may be stored, used for training, or exposed.',
    mitigation: 'Never input confidential personal, financial, or proprietary data. Use enterprise versions with data protection guarantees.',
  },
  {
    icon: AlertTriangle,
    title: 'Overreliance',
    severity: 'Medium',
    desc: 'Excessive dependence on AI can erode critical thinking, creativity, and problem-solving skills.',
    mitigation: 'Use AI as a tool, not a crutch. Practice independent analysis. Challenge AI outputs regularly.',
  },
  {
    icon: Scale,
    title: 'Bias',
    severity: 'Medium',
    desc: 'AI models reflect biases in their training data, potentially perpetuating stereotypes and unfair outcomes.',
    mitigation: 'Critically evaluate AI outputs for bias. Diversify your sources. Report biased outputs to providers.',
  },
  {
    icon: FileLock,
    title: 'Copyright Issues',
    severity: 'Medium',
    desc: 'AI-generated content may infringe on existing copyrights. Legal frameworks are still evolving.',
    mitigation: 'Disclose AI usage. Review generated content for originality. Understand your organization\'s AI policy.',
  },
]

export default function RisksSlide() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.risk-card',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power3.out',
          delay: 0.3,
        }
      )
      gsap.fromTo(
        '.mitigation-panel',
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', delay: 0.6 }
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 mb-6">
            <AlertCircle className="w-4 h-4 text-red-400" />
            <span className="text-sm font-mono text-red-400 uppercase tracking-wider">
              Part 9: Risks and Challenges
            </span>
          </div>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">
            Navigating the Risks
          </h2>
          <p className="text-xl text-sage max-w-3xl mx-auto">
            Understanding the challenges is the first step to responsible AI adoption.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {risks.map((risk, i) => (
              <div
                key={i}
                className="risk-card liquid-glass p-6 hover:border-red-500/30 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center flex-shrink-0">
                    <risk.icon className="w-6 h-6 text-red-400" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-display text-xl font-semibold text-white">
                        {risk.title}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full font-mono text-xs ${
                          risk.severity === 'High'
                            ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                            : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                        }`}
                      >
                        {risk.severity}
                      </span>
                    </div>
                    <p className="text-sage text-sm leading-relaxed mb-3">
                      {risk.desc}
                    </p>
                    <div className="p-3 rounded-lg bg-mint/5 border border-mint/20">
                      <div className="flex items-start gap-2">
                        <ShieldCheck className="w-4 h-4 text-mint flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-mint font-mono leading-relaxed">
                          {risk.mitigation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mitigation-panel liquid-glass-strong p-8 flex flex-col">
            <h3 className="font-display text-2xl font-semibold text-white mb-6">
              Risk Mitigation Framework
            </h3>

            <div className="space-y-4 flex-grow">
              {[
                { step: 'Verify', desc: 'Always cross-check AI-generated facts and data' },
                { step: 'Protect', desc: 'Never share sensitive or confidential information' },
                { step: 'Disclose', desc: 'Be transparent about AI usage in your work' },
                { step: 'Review', desc: 'Human oversight is essential for all AI outputs' },
                { step: 'Learn', desc: 'Stay updated on AI policies and best practices' },
                { step: 'Balance', desc: 'Develop skills alongside AI tool usage' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-mint/10 border border-mint/30 flex items-center justify-center flex-shrink-0">
                    <ChevronRight className="w-4 h-4 text-mint" />
                  </div>
                  <div>
                    <p className="font-display font-semibold text-white text-sm">
                      {item.step}
                    </p>
                    <p className="text-sage text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-xl bg-red-500/5 border border-red-500/20">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <span className="font-mono text-xs text-red-400 uppercase">
                  Critical Reminder
                </span>
              </div>
              <p className="text-sage text-sm">
                AI is a powerful tool, but you are responsible for its output.
                Always apply human judgment and critical thinking.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
