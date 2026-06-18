import { useState, useEffect, useCallback, useRef } from 'react'
import gsap from 'gsap'
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Maximize2,
  Minimize2,
} from 'lucide-react'
import Scene from './components/scene/Scene'
import HeroSlide from './components/slides/HeroSlide'
import OriginsSlide from './components/slides/OriginsSlide'
import IntroductionSlide from './components/slides/IntroductionSlide'
import IndustriesSlide from './components/slides/IndustriesSlide'
import AgenticWorkflowSlide from './components/slides/AgenticWorkflowSlide'
import ModelProvidersSlide from './components/slides/ModelProvidersSlide'
import ClaudeUseCasesSlide from './components/slides/ClaudeUseCasesSlide'
import StudentsSlide from './components/slides/StudentsSlide'
import ProfessionalsSlide from './components/slides/ProfessionalsSlide'
import RisksSlide from './components/slides/RisksSlide'
import FutureWorkSlide from './components/slides/FutureWorkSlide'
import ConclusionSlide from './components/slides/ConclusionSlide'

const slides = [
  { id: 'hero', title: 'Hero', sceneType: 'hero' },
  { id: 'origins', title: 'Origins of AI', sceneType: 'neural' },
  { id: 'introduction', title: 'Introduction', sceneType: 'minimal' },
  { id: 'industries', title: 'Industries', sceneType: 'neural' },
  { id: 'agentic', title: 'Agentic Workflows', sceneType: 'minimal' },
  { id: 'models', title: 'Model Providers', sceneType: 'minimal' },
  { id: 'claude', title: 'Claude Use Cases', sceneType: 'hero' },
  { id: 'students', title: 'AI for Students', sceneType: 'default' },
  { id: 'professionals', title: 'AI for Professionals', sceneType: 'default' },
  { id: 'risks', title: 'Risks & Challenges', sceneType: 'default' },
  { id: 'future', title: 'Future of Work', sceneType: 'neural' },
  { id: 'conclusion', title: 'Conclusion', sceneType: 'hero' },
]

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const goToSlide = useCallback(
    (index: number) => {
      if (index < 0 || index >= slides.length) return

      if (contentRef.current) {
        gsap.to(contentRef.current, {
          opacity: 0,
          y: index > currentSlide ? -20 : 20,
          duration: 0.3,
          ease: 'power2.in',
          onComplete: () => {
            setCurrentSlide(index)
            gsap.fromTo(
              contentRef.current,
              { opacity: 0, y: index > currentSlide ? 20 : -20 },
              { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
            )
          },
        })
      } else {
        setCurrentSlide(index)
      }
    },
    [currentSlide]
  )

  const nextSlide = useCallback(() => {
    goToSlide(Math.min(currentSlide + 1, slides.length - 1))
  }, [currentSlide, goToSlide])

  const prevSlide = useCallback(() => {
    goToSlide(Math.max(currentSlide - 1, 0))
  }, [currentSlide, goToSlide])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        nextSlide()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        prevSlide()
      } else if (e.key === 'Home') {
        e.preventDefault()
        goToSlide(0)
      } else if (e.key === 'End') {
        e.preventDefault()
        goToSlide(slides.length - 1)
      } else if (e.key === 'f') {
        toggleFullscreen()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextSlide, prevSlide, goToSlide])

  useEffect(() => {
    if (isPlaying) {
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide((prev) => {
          if (prev >= slides.length - 1) {
            setIsPlaying(false)
            return prev
          }
          return prev + 1
        })
      }, 15000)
    } else {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    }
  }, [isPlaying])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const isHeroSlide = currentSlide === 0

  const renderSlide = () => {
    switch (slides[currentSlide].id) {
      case 'hero': return <HeroSlide onNext={nextSlide} />
      case 'origins': return <OriginsSlide />
      case 'introduction': return <IntroductionSlide />
      case 'industries': return <IndustriesSlide />
      case 'agentic': return <AgenticWorkflowSlide />
      case 'models': return <ModelProvidersSlide />
      case 'claude': return <ClaudeUseCasesSlide />
      case 'students': return <StudentsSlide />
      case 'professionals': return <ProfessionalsSlide />
      case 'risks': return <RisksSlide />
      case 'future': return <FutureWorkSlide />
      case 'conclusion': return <ConclusionSlide />
      default: return <HeroSlide onNext={nextSlide} />
    }
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#032820]">
      <Scene sceneType={slides[currentSlide].sceneType} />

      <div
        ref={contentRef}
        className="relative z-10 w-full h-full overflow-y-auto"
        style={{ scrollBehavior: 'smooth' }}
      >
        {renderSlide()}
      </div>

      {/* Navigation Controls */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 ${
          isHeroSlide ? 'opacity-0 translate-y-full' : 'opacity-100 translate-y-0'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-t from-[#032820] via-[#032820]/90 to-transparent">
          {/* Slide Counter */}
          <div className="flex items-center gap-4">
            <span className="font-mono text-sm text-mint">
              {String(currentSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
            </span>
            <span className="text-sage/40 text-sm">{slides[currentSlide].title}</span>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 rounded-full liquid-glass flex items-center justify-center hover:border-mint/40 transition-all"
              title={isPlaying ? 'Pause' : 'Auto Play'}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 text-mint" />
              ) : (
                <Play className="w-4 h-4 text-mint" />
              )}
            </button>

            <div className="flex items-center gap-1">
              <button
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="w-10 h-10 rounded-full liquid-glass flex items-center justify-center hover:border-mint/40 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5 text-mint" />
              </button>
              <button
                onClick={nextSlide}
                disabled={currentSlide === slides.length - 1}
                className="w-10 h-10 rounded-full liquid-glass flex items-center justify-center hover:border-mint/40 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5 text-mint" />
              </button>
            </div>

            <button
              onClick={toggleFullscreen}
              className="w-10 h-10 rounded-full liquid-glass flex items-center justify-center hover:border-mint/40 transition-all"
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4 text-mint" />
              ) : (
                <Maximize2 className="w-4 h-4 text-mint" />
              )}
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-mint to-cyan transition-all duration-500"
            style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Slide Navigation Dots */}
      {!isHeroSlide && (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === currentSlide
                  ? 'bg-mint scale-125 shadow-glow'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              title={slides[i].title}
            />
          ))}
        </div>
      )}

      {/* Keyboard hint */}
      {isHeroSlide && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 font-mono text-xs text-sage/50">
          Use arrow keys to navigate
        </div>
      )}
    </div>
  )
}
