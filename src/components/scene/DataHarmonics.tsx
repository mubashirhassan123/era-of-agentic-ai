import { useRef, useEffect } from 'react'
import gsap from 'gsap'

interface DataHarmonicsProps {
  className?: string
  lineCount?: number
}

export default function DataHarmonics({ className = '', lineCount = 30 }: DataHarmonicsProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const lines = svgRef.current.querySelectorAll('line')
    const tl = gsap.timeline({ repeat: -1, yoyo: true })

    lines.forEach((line, i) => {
      const freq = (i + 1) * 0.8
      const amp = 10 + (i * 2)
      const props = {
        y1: parseFloat(line.getAttribute('y1') || '20'),
        y2: parseFloat(line.getAttribute('y2') || '80'),
      }

      const tween = gsap.to(props, {
        duration: 2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        onUpdate: () => {
          const offset = Math.sin(Date.now() * 0.002 * freq) * amp
          line.setAttribute('y1', String(props.y1 + offset))
          line.setAttribute('y2', String(props.y2 - offset))
        },
      })

      tl.add(tween, 0)
    })

    return () => {
      tl.kill()
    }
  }, [lineCount])

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 100 100"
      className={`absolute inset-0 w-full h-full ${className}`}
      preserveAspectRatio="none"
    >
      {Array.from({ length: lineCount }, (_, i) => {
        const x = (i / (lineCount - 1)) * 100
        return (
          <line
            key={i}
            x1={x}
            y1="20"
            x2={x}
            y2="80"
            stroke="#2BFF8E"
            strokeWidth="0.5"
            opacity={0.3 + (i % 3) * 0.1}
          />
        )
      })}
    </svg>
  )
}
