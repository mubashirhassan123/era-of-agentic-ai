import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = `
  uniform float uTime;
  varying vec3 vViewPosition;
  varying vec3 vNormal;
  
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`

const fragmentShader = `
  uniform float uIntensity;
  uniform vec3 uDeepColor;
  uniform vec3 uSurfaceColor;
  uniform vec3 uFresnelColor;
  uniform float uSSS;
  uniform float uRefraction;
  uniform float uTime;
  
  varying vec3 vViewPosition;
  varying vec3 vNormal;
  
  float fresnel(vec3 viewDirection, vec3 normal, float power) {
    float f = dot(viewDirection, normal);
    return max(0.0, 1.0 - pow(f, power));
  }
  
  float sss(vec3 viewDirection, vec3 normal, float intensity) {
    float s = dot(viewDirection, normal);
    return pow(s, 3.0) * intensity;
  }
  
  void main() {
    vec3 viewDirection = normalize(vViewPosition);
    float fresnelFactor = fresnel(viewDirection, vNormal, 5.0);
    float sssFactor = sss(viewDirection, vNormal, uSSS);
    
    vec3 finalColor = mix(uDeepColor, uSurfaceColor, sssFactor);
    finalColor += uFresnelColor * fresnelFactor * uRefraction;
    
    float alpha = 0.85 + fresnelFactor * 0.15;
    gl_FragColor = vec4(finalColor * uIntensity, alpha);
  }
`

export default function TactileBlob() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  const uniforms = useMemo(() => ({
    uIntensity: { value: 0.85 },
    uDeepColor: { value: new THREE.Color('#032820') },
    uSurfaceColor: { value: new THREE.Color('#27d97a') },
    uFresnelColor: { value: new THREE.Color('#00E5FF') },
    uSSS: { value: 0.32 },
    uRefraction: { value: 0.02 },
    uTime: { value: 0.0 },
  }), [])

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime()
    
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      (state.pointer.y * Math.PI) / 8,
      0.05
    )
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      (state.pointer.x * Math.PI) / 8,
      0.05
    )
    
    const dist = Math.sqrt(Math.pow(state.pointer.x, 2) + Math.pow(state.pointer.y, 2))
    const scale = 1 + (1 - Math.min(dist, 1)) * 0.15
    meshRef.current.scale.setScalar(scale)
    
    const mat = meshRef.current.material as THREE.ShaderMaterial
    if (mat.uniforms) {
      mat.uniforms.uTime.value = time
      mat.uniforms.uIntensity.value = 0.85 + (1 - Math.min(dist, 1)) * 0.3
    }
  })

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2.5, 64]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}
