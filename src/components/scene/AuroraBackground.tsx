import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * A full-screen, slowly drifting aurora gradient rendered with flowing fractal
 * noise. It is intentionally low-contrast and slow so it stays restful to look
 * at while still feeling alive. The mesh is parented to the camera so it always
 * fills the viewport regardless of the active scene camera position.
 */

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  precision highp float;
  uniform float uTime;
  uniform vec3 uDeep;
  uniform vec3 uMid;
  uniform vec3 uMint;
  uniform vec3 uCyan;
  varying vec2 vUv;

  // Smooth value noise + fbm for soft, organic bands.
  vec2 hash(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(dot(hash(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
          dot(hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
      mix(dot(hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
          dot(hash(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
      u.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    float t = uTime * 0.04;

    // Two layers of slowly drifting noise create gentle flowing bands.
    vec2 q = vec2(fbm(uv * 2.0 + vec2(t, t * 0.6)),
                  fbm(uv * 2.0 + vec2(-t * 0.5, t)));
    float n = fbm(uv * 2.5 + q * 1.4 + vec2(0.0, t * 0.5));
    n = n * 0.5 + 0.5;

    // Base vertical gradient keeps it grounded and dark.
    vec3 base = mix(uDeep, uMid, smoothstep(0.0, 1.0, uv.y));

    // Layer in faint mint / cyan glows from the flowing noise.
    float mintBand = smoothstep(0.45, 0.85, n);
    float cyanBand = smoothstep(0.55, 0.95, fbm(uv * 1.5 - vec2(t * 0.7, 0.0)) * 0.5 + 0.5);

    vec3 color = base;
    color = mix(color, uMint, mintBand * 0.18);
    color = mix(color, uCyan, cyanBand * 0.12);

    // Soft radial vignette to focus attention on slide content.
    float d = distance(uv, vec2(0.5));
    color *= 1.0 - smoothstep(0.45, 1.05, d) * 0.55;

    gl_FragColor = vec4(color, 1.0);
  }
`

export default function AuroraBackground() {
  const meshRef = useRef<THREE.Mesh>(null)
  const { camera } = useThree()

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDeep: { value: new THREE.Color('#03261f') },
      uMid: { value: new THREE.Color('#0a4536') },
      uMint: { value: new THREE.Color('#2BFF8E') },
      uCyan: { value: new THREE.Color('#00E5FF') },
    }),
    []
  )

  useFrame((state) => {
    const mesh = meshRef.current
    if (!mesh) return
    const mat = mesh.material as THREE.ShaderMaterial
    mat.uniforms.uTime.value = state.clock.getElapsedTime()

    // Keep the plane locked in front of the camera so it always fills the view.
    mesh.quaternion.copy(camera.quaternion)
    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion)
    mesh.position.copy(camera.position).add(forward.multiplyScalar(40))
  })

  return (
    <mesh ref={meshRef} frustumCulled={false} renderOrder={-1}>
      <planeGeometry args={[120, 90]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  )
}
