import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Soft ambient "dust" of particles that drift slowly and twinkle gently.
 * Replaces the previous fast zoom-toward-camera starfield so the background
 * stays calm and easy on the eyes.
 */

const vertexShader = `
  uniform float uTime;
  attribute float aScale;
  attribute float aSpeed;
  attribute float aPhase;
  varying float vTwinkle;

  void main() {
    vec3 p = position;
    // Very gentle floating drift on each axis.
    p.x += sin(uTime * aSpeed + aPhase) * 0.6;
    p.y += cos(uTime * aSpeed * 0.8 + aPhase) * 0.6;

    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    vTwinkle = 0.55 + 0.45 * sin(uTime * (0.4 + aSpeed) + aPhase * 3.0);
    gl_PointSize = aScale * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`

const fragmentShader = `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying float vTwinkle;

  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    // Soft feathered edge for a glowing dot rather than a hard pixel.
    float alpha = smoothstep(0.5, 0.0, d);
    vec3 color = mix(uColorA, uColorB, vTwinkle);
    gl_FragColor = vec4(color, alpha * vTwinkle * 0.5);
  }
`

export default function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null)
  const count = 600

  const { positions, scales, speeds, phases, uniforms } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const scl = new Float32Array(count)
    const spd = new Float32Array(count)
    const pha = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30
      pos[i * 3 + 1] = (Math.random() - 0.5) * 22
      pos[i * 3 + 2] = (Math.random() - 0.5) * 18
      scl[i] = 0.4 + Math.random() * 1.6
      spd[i] = 0.05 + Math.random() * 0.25
      pha[i] = Math.random() * Math.PI * 2
    }
    return {
      positions: pos,
      scales: scl,
      speeds: spd,
      phases: pha,
      uniforms: {
        uTime: { value: 0 },
        uColorA: { value: new THREE.Color('#2BFF8E') },
        uColorB: { value: new THREE.Color('#00E5FF') },
      },
    }
  }, [])

  useFrame((state) => {
    if (!pointsRef.current) return
    const mat = pointsRef.current.material as THREE.ShaderMaterial
    if (mat.uniforms) {
      mat.uniforms.uTime.value = state.clock.getElapsedTime()
    }
    pointsRef.current.rotation.y += 0.0002
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
        <bufferAttribute attach="attributes-aSpeed" args={[speeds, 1]} />
        <bufferAttribute attach="attributes-aPhase" args={[phases, 1]} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
