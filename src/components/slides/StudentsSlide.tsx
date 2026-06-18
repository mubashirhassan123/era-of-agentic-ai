import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import {
  BookOpen,
  GraduationCap,
  Search,
  Presentation,
  Compass,
  FileText,
  Shield,
  Lightbulb,
} from 'lucide-react'

const benefits = [
  {
    icon: Lightbulb,
    title: 'Learning',
    desc: 'AI tutors adapt to your pace, explain concepts in multiple ways, and provide instant feedback.',
    tip: 'Use AI to explain difficult concepts like having a personal tutor available 24/7.',
  },
  {
    icon: GraduationCap,
    title: 'Exam Preparation',
    desc: 'Generate practice questions, flashcards, and study schedules tailored to your curriculum.',
    tip: 'Generate 50 practice questions for every chapter before exams.',
  },
  {
    icon: Search,
    title: 'Research',
    desc: 'Summarize academic papers, find relevant sources, and synthesize arguments in minutes.',
    tip: 'Upload papers and ask for summaries, key findings, and methodology critiques.',
  },
  {
    icon: Presentation,
    title: 'Presentation Building',
    desc: 'Create stunning slide outlines, speaker notes, and visual suggestions from your topics.',
    tip: 'Provide your topic and ask for a complete outline with talking points.',
  },
  {
    icon: Compass,
    title: 'Career Planning',
    desc: 'Explore career paths, skill gaps, and personalized learning roadmaps.',
    tip: 'Share your interests and ask for a 5-year career development plan.',
  },
  {
    icon: FileText,
    title: 'Internship Applications',
    desc: 'Tailor resumes, write cover letters, and prepare for interviews with AI coaching.',
    tip: 'Paste the job description and ask AI to customize your resume for that role.',
  },
]

const ethics = [
  'Always disclose AI assistance when required by your institution',
  'Use AI as a tutor, not a replacement for your own thinking',
  'Verify facts and sources AI provides, do not blindly trust',
  'Develop critical thinking alongside AI usage',
  'Respect copyright and academic integrity policies',
  'Balance AI assistance with independent practice',
]

export default function StudentsSlide() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.student-card',
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
      gsap.fromTo(
        '.ethics-panel',
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', delay: 0.8 }
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
            <BookOpen className="w-4 h-4 text-mint" />
            <span className="text-sm font-mono text-mint uppercase tracking-wider">
              Part 7: AI for Students
            </span>
          </div>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">
            Your AI Study Partner
          </h2>
          <p className="text-xl text-sage max-w-3xl mx-auto">
            How students can leverage AI to learn faster, research deeper, and prepare better.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
            {benefits.map((benefit, i) => (
              <div
                key={i}
                className="student-card liquid-glass p-6 hover:border-mint/30 transition-all duration-300 group"
              >
                <benefit.icon className="w-8 h-8 text-mint mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-display text-xl font-semibold text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sage text-sm leading-relaxed mb-4">
                  {benefit.desc}
                </p>
                <div className="p-3 rounded-lg bg-mint/5 border border-mint/20">
                  <p className="text-xs text-mint font-mono">
                    Tip: {benefit.tip}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="ethics-panel liquid-glass-strong p-8 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-8 h-8 text-cyan" />
              <h3 className="font-display text-2xl font-semibold text-white">
                Ethical Guidelines
              </h3>
            </div>

            <div className="relative h-48 rounded-xl overflow-hidden mb-6">
              <img
                src="/student-learning.jpg"
                alt="Student learning with AI"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#032820] via-[#032820]/30 to-transparent" />
            </div>

            <div className="flex-grow space-y-3">
              {ethics.map((rule, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-cyan/10 border border-cyan/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="font-mono text-xs text-cyan">{i + 1}</span>
                  </div>
                  <p className="text-sage text-sm leading-relaxed">{rule}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
