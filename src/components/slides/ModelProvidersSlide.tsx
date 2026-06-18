import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Cpu, BookOpen, Code2, BarChart3, Palette, Brain } from 'lucide-react'

const providers = [
  {
    name: 'OpenAI',
    models: 'GPT-4o, o3, o4-mini',
    strengths: 'General reasoning, multimodal, broad capabilities',
    weaknesses: 'Higher cost, rate limits',
    useCases: 'General purpose, enterprise, chatbots',
    context: '128K - 200K',
    reasoning: 9,
    coding: 9,
    research: 8,
    cost: 5,
    bestFor: ['Students', 'Business Analysis'],
    color: '#10A37F',
  },
  {
    name: 'Anthropic',
    models: 'Claude 4 Sonnet, Opus, Haiku',
    strengths: 'Long context, safety, nuanced reasoning, coding',
    weaknesses: 'No image generation, slower updates',
    useCases: 'Research, coding, document analysis, legal',
    context: '200K - 500K',
    reasoning: 10,
    coding: 9,
    research: 10,
    cost: 6,
    bestFor: ['Research', 'Coding', 'Content Creation'],
    color: '#D4A574',
  },
  {
    name: 'Google DeepMind',
    models: 'Gemini 2.5 Pro, Flash, Ultra',
    strengths: 'Massive context, multimodal, Google integration',
    weaknesses: 'Inconsistent output, complex pricing',
    useCases: 'Enterprise, research, media analysis',
    context: '1M - 2M',
    reasoning: 8,
    coding: 8,
    research: 9,
    cost: 7,
    bestFor: ['Research', 'Business Analysis'],
    color: '#4285F4',
  },
  {
    name: 'xAI',
    models: 'Grok 3, Grok 3 Mini',
    strengths: 'Real-time data, humor, fast responses',
    weaknesses: 'Limited API, less nuanced',
    useCases: 'Real-time info, social media, casual',
    context: '128K',
    reasoning: 7,
    coding: 7,
    research: 6,
    cost: 7,
    bestFor: ['Content Creation'],
    color: '#1D9BF0',
  },
  {
    name: 'Meta',
    models: 'Llama 4, Llama 4 Maverick',
    strengths: 'Open source, customizable, cost-effective',
    weaknesses: 'Requires setup, less polished',
    useCases: 'Self-hosted, fine-tuning, development',
    context: '128K - 256K',
    reasoning: 8,
    coding: 8,
    research: 7,
    cost: 10,
    bestFor: ['Students', 'Coding'],
    color: '#0668E1',
  },
  {
    name: 'Mistral',
    models: 'Mistral Large 2, Codestral',
    strengths: 'European, efficient, coding focused',
    weaknesses: 'Smaller ecosystem',
    useCases: 'Enterprise EU, coding assistants',
    context: '128K',
    reasoning: 7,
    coding: 8,
    research: 7,
    cost: 7,
    bestFor: ['Coding'],
    color: '#FF7000',
  },
  {
    name: 'Cohere',
    models: 'Command R+, R7B',
    strengths: 'Enterprise RAG, embeddings, search',
    weaknesses: 'Narrow focus',
    useCases: 'Enterprise search, RAG systems',
    context: '128K',
    reasoning: 7,
    coding: 6,
    research: 7,
    cost: 8,
    bestFor: ['Business Analysis'],
    color: '#D4AF37',
  },
]

const categoryIcons = {
  'Students': BookOpen,
  'Research': Brain,
  'Coding': Code2,
  'Business Analysis': BarChart3,
  'Content Creation': Palette,
}

export default function ModelProvidersSlide() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [sortBy, setSortBy] = useState<'name' | 'reasoning' | 'coding' | 'research' | 'cost'>('name')

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.provider-row',
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power3.out',
          delay: 0.3,
        }
      )
    }, containerRef)
    return () => ctx.revert()
  }, [sortBy])

  const sorted = [...providers].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name)
    return b[sortBy] - a[sortBy]
  })

  return (
    <div
      ref={containerRef}
      className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8 py-20"
    >
      <div className="max-w-7xl w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-mint/10 border border-mint/30 mb-6">
            <Cpu className="w-4 h-4 text-mint" />
            <span className="text-sm font-mono text-mint uppercase tracking-wider">
              Part 5: The AI Landscape
            </span>
          </div>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">
            Leading AI Model Providers
          </h2>
          <p className="text-xl text-sage max-w-3xl mx-auto">
            Comparing flagship models across the dimensions that matter. Scores
            are indicative and reflect the 2026 landscape &mdash; tap a column to re-rank.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {(['name', 'reasoning', 'coding', 'research', 'cost'] as const).map((key) => (
            <button
              key={key}
              onClick={() => setSortBy(key)}
              className={`px-4 py-2 rounded-full font-mono text-sm uppercase tracking-wider transition-all duration-300 ${
                sortBy === key
                  ? 'bg-mint text-teal'
                  : 'liquid-glass text-sage hover:text-white'
              }`}
            >
              Sort: {key}
            </button>
          ))}
        </div>

        <div className="liquid-glass-strong overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="p-4 font-mono text-xs text-mint uppercase tracking-wider">Provider</th>
                  <th className="p-4 font-mono text-xs text-mint uppercase tracking-wider">Latest Models</th>
                  <th className="p-4 font-mono text-xs text-mint uppercase tracking-wider hidden lg:table-cell">Strengths</th>
                  <th className="p-4 font-mono text-xs text-mint uppercase tracking-wider">Context</th>
                  <th className="p-4 font-mono text-xs text-mint uppercase tracking-wider text-center">Reasoning</th>
                  <th className="p-4 font-mono text-xs text-mint uppercase tracking-wider text-center">Coding</th>
                  <th className="p-4 font-mono text-xs text-mint uppercase tracking-wider text-center">Research</th>
                  <th className="p-4 font-mono text-xs text-mint uppercase tracking-wider text-center">Cost</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((provider) => (
                  <tr
                    key={provider.name}
                    className="provider-row border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: provider.color }}
                        />
                        <span className="font-display font-semibold text-white">
                          {provider.name}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="font-mono text-sm text-cyan">{provider.models}</span>
                    </td>
                    <td className="p-4 hidden lg:table-cell">
                      <span className="text-sm text-sage">{provider.strengths}</span>
                    </td>
                    <td className="p-4">
                      <span className="font-mono text-sm text-white">{provider.context}</span>
                    </td>
                    <td className="p-4 text-center">
                      <ScoreBar score={provider.reasoning} color="#2BFF8E" />
                    </td>
                    <td className="p-4 text-center">
                      <ScoreBar score={provider.coding} color="#00E5FF" />
                    </td>
                    <td className="p-4 text-center">
                      <ScoreBar score={provider.research} color="#2BFF8E" />
                    </td>
                    <td className="p-4 text-center">
                      <ScoreBar score={provider.cost} color="#FFD700" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
          {Object.entries(categoryIcons).map(([category, Icon]) => {
            const bestProviders = providers.filter((p) => p.bestFor.includes(category))
            return (
              <div key={category} className="liquid-glass p-4 text-center">
                <Icon className="w-6 h-6 text-mint mx-auto mb-2" />
                <p className="font-mono text-xs text-mint uppercase mb-1">Best For</p>
                <p className="font-display font-semibold text-white text-sm mb-2">{category}</p>
                <div className="flex flex-wrap justify-center gap-1">
                  {bestProviders.map((p) => (
                    <span
                      key={p.name}
                      className="px-2 py-0.5 rounded-full text-xs font-mono"
                      style={{
                        backgroundColor: `${p.color}20`,
                        color: p.color,
                        border: `1px solid ${p.color}40`,
                      }}
                    >
                      {p.name}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function ScoreBar({ score, color }: { score: number; color: string }) {
  return (
    <div className="inline-flex flex-col items-center gap-1">
      <span className="font-mono text-sm font-bold" style={{ color }}>
        {score}/10
      </span>
      <div className="w-16 h-1.5 rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${score * 10}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  )
}
