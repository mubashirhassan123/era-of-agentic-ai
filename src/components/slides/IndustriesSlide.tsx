import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import {
  HeartPulse,
  Landmark,
  GraduationCap,
  Megaphone,
  Code2,
  Clock,
  DollarSign,
  TrendingUp,
  ArrowRight,
  Briefcase,
} from 'lucide-react'

const industries = [
  {
    id: 'healthcare',
    icon: HeartPulse,
    title: 'Healthcare',
    image: '/industry-healthcare.jpg',
    traditional: 'Manual diagnosis, paper records, lengthy research cycles',
    repetitive: 'Medical coding, appointment scheduling, literature review, imaging analysis',
    aiWorkflow: 'AI-assisted diagnosis, automated coding, real-time monitoring, drug discovery',
    timeSaved: '40-60%',
    costSaved: '$150B annually by 2026',
    examples: ['PathAI for pathology', 'Tempus for oncology', 'Paige for diagnostics'],
    outlook: 'AI will augment every clinician by 2028, reducing burnout and improving accuracy.',
  },
  {
    id: 'finance',
    icon: Landmark,
    title: 'Finance & Banking',
    image: '/industry-finance.jpg',
    traditional: 'Manual risk assessment, spreadsheet analysis, branch-based services',
    repetitive: 'Fraud detection, compliance checks, data entry, report generation',
    aiWorkflow: 'Real-time fraud detection, algorithmic trading, automated compliance, robo-advisors',
    timeSaved: '50-70%',
    costSaved: '$300B annually by 2030',
    examples: ['JPMorgan COiN', 'Kensho analytics', 'Zest AI for lending'],
    outlook: 'Fully autonomous trading and personalized banking will become standard by 2028.',
  },
  {
    id: 'education',
    icon: GraduationCap,
    title: 'Education',
    image: '/industry-education.jpg',
    traditional: 'One-size-fits-all lectures, manual grading, fixed curricula',
    repetitive: 'Grading, lesson planning, administrative tasks, scheduling',
    aiWorkflow: 'Personalized tutoring, automated grading, adaptive learning paths, AI TAs',
    timeSaved: '30-50%',
    costSaved: '$200B annually by 2030',
    examples: ['Khanmigo by Khan Academy', 'Coursera AI Coach', 'Duolingo Max'],
    outlook: 'Every student will have a personal AI tutor by 2030, democratizing elite education.',
  },
  {
    id: 'marketing',
    icon: Megaphone,
    title: 'Marketing & Content',
    image: '/industry-marketing.jpg',
    traditional: 'Manual content creation, A/B testing, campaign management',
    repetitive: 'Copywriting, social media posting, SEO optimization, reporting',
    aiWorkflow: 'AI-generated campaigns, predictive analytics, hyper-personalization, automated testing',
    timeSaved: '60-80%',
    costSaved: '$100B annually by 2027',
    examples: ['Jasper AI', 'Copy.ai', 'Adobe Firefly', 'Midjourney'],
    outlook: 'Marketing teams will become strategy orchestrators while AI handles execution.',
  },
  {
    id: 'software',
    icon: Code2,
    title: 'Software Development',
    image: '/industry-software.jpg',
    traditional: 'Manual coding, debugging, documentation, code review',
    repetitive: 'Boilerplate code, bug fixes, testing, documentation',
    aiWorkflow: 'AI pair programming, automated testing, self-healing code, DevOps automation',
    timeSaved: '40-70%',
    costSaved: '$500B annually by 2030',
    examples: ['GitHub Copilot', 'Cursor', 'V0 by Vercel', 'Replit Agent'],
    outlook: 'Developers will become architects and reviewers while AI handles implementation.',
  },
]

export default function IndustriesSlide() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndustry, setActiveIndustry] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.industry-card',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.3,
        }
      )
    }, containerRef)
    return () => ctx.revert()
  }, [])

  const active = industries[activeIndustry]

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
              Part 3: Industry Disruption
            </span>
          </div>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">
            Industries Most Disrupted
          </h2>
          <p className="text-xl text-sage max-w-3xl mx-auto">
            AI is not coming for these industries. It is already here.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 flex flex-col gap-3">
            {industries.map((ind, i) => (
              <button
                key={ind.id}
                onClick={() => setActiveIndustry(i)}
                className={`industry-card liquid-glass p-4 flex items-center gap-4 text-left transition-all duration-300 hover:border-mint/40 ${
                  i === activeIndustry
                    ? 'border-mint/60 bg-mint/5'
                    : ''
                }`}
              >
                <ind.icon
                  className={`w-8 h-8 flex-shrink-0 ${
                    i === activeIndustry ? 'text-mint' : 'text-sage/60'
                  }`}
                />
                <div>
                  <h3
                    className={`font-display text-lg font-semibold ${
                      i === activeIndustry ? 'text-white' : 'text-sage'
                    }`}
                  >
                    {ind.title}
                  </h3>
                  <p className="text-sm text-sage/60 font-mono">
                    {ind.timeSaved} time saved
                  </p>
                </div>
              </button>
            ))}
          </div>

          <div className="lg:col-span-8">
            <div className="liquid-glass-strong p-8 h-full">
              <div className="relative h-48 rounded-xl overflow-hidden mb-6">
                <img
                  src={active.image}
                  alt={active.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#032820] via-[#032820]/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <active.icon className="w-8 h-8 text-mint mb-2" />
                  <h3 className="font-display text-3xl font-bold text-white">
                    {active.title}
                  </h3>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-mint" />
                    <span className="font-mono text-xs text-mint uppercase">Time Savings</span>
                  </div>
                  <p className="font-display text-3xl font-bold gradient-text">
                    {active.timeSaved}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-4 h-4 text-cyan" />
                    <span className="font-mono text-xs text-cyan uppercase">Cost Impact</span>
                  </div>
                  <p className="font-display text-xl font-bold text-cyan">
                    {active.costSaved}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-mono text-xs text-mint uppercase mb-2">
                    Traditional Workflow
                  </h4>
                  <p className="text-sage text-sm">{active.traditional}</p>
                </div>
                <div className="flex items-center justify-center">
                  <ArrowRight className="w-5 h-5 text-mint/40" />
                </div>
                <div>
                  <h4 className="font-mono text-xs text-mint uppercase mb-2">
                    AI-Powered Workflow
                  </h4>
                  <p className="text-sage text-sm">{active.aiWorkflow}</p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <h4 className="font-mono text-xs text-cyan uppercase mb-3">
                    Real Examples
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {active.examples.map((ex) => (
                      <span
                        key={ex}
                        className="px-3 py-1 rounded-full bg-cyan/10 border border-cyan/30 text-cyan text-sm font-mono"
                      >
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-mint flex-shrink-0 mt-0.5" />
                    <p className="text-sage text-sm italic">{active.outlook}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
