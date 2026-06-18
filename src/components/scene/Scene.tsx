import { useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import TactileBlob from './TactileBlob'
import ParticleField from './ParticleField'
import NeuralGlass from './NeuralGlass'
import AuroraBackground from './AuroraBackground'
import * as THREE from 'three'

interface SceneCameraProps {
  sceneType: string
}

function SceneCamera({ sceneType }: SceneCameraProps) {
  const { camera } = useThree()
  const targetPos = useRef(new THREE.Vector3(0, 0, 8))
  const targetLook = useRef(new THREE.Vector3(0, 0, 0))

  useEffect(() => {
    switch (sceneType) {
      case 'hero':
        targetPos.current.set(0, 0, 6)
        targetLook.current.set(0, 0, 0)
        break
      case 'neural':
        targetPos.current.set(0, 5, 15)
        targetLook.current.set(0, 0, 0)
        break
      case 'minimal':
        targetPos.current.set(0, 0, 12)
        targetLook.current.set(0, 0, 0)
        break
      default:
        targetPos.current.set(0, 0, 8)
        targetLook.current.set(0, 0, 0)
    }
  }, [sceneType])

  useFrame(() => {
    camera.position.lerp(targetPos.current, 0.03)
    const currentLook = new THREE.Vector3(0, 0, 0)
    currentLook.lerpVectors(camera.position.clone().add(new THREE.Vector3(0, 0, -1)), targetLook.current, 0.03)
    camera.lookAt(targetLook.current)
  })

  return null
}

interface SceneContentProps {
  sceneType: string
}

function SceneContent({ sceneType }: SceneContentProps) {
  return (
    <>
      <SceneCamera sceneType={sceneType} />
      <ambientLight intensity={0.25} />
      <pointLight position={[10, 10, 10]} intensity={0.4} color="#2BFF8E" />
      <pointLight position={[-10, -10, -5]} intensity={0.25} color="#00E5FF" />

      {/* Calm flowing gradient that backs every slide. */}
      <AuroraBackground />

      {(sceneType === 'hero' || sceneType === 'conclusion') && (
        <>
          <TactileBlob />
          <ParticleField />
        </>
      )}

      {sceneType === 'neural' && (
        <>
          <NeuralGlass />
          <ParticleField />
        </>
      )}

      {sceneType === 'minimal' && <ParticleField />}

      {sceneType === 'default' && (
        <>
          <ParticleField />
          <pointLight position={[0, 5, 0]} intensity={0.15} color="#2BFF8E" />
        </>
      )}
    </>
  )
}

interface SceneProps {
  sceneType: string
}

export default function Scene({ sceneType }: SceneProps) {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: '#032820' }}
      >
        <SceneContent sceneType={sceneType} />
      </Canvas>
    </div>
  )
}
