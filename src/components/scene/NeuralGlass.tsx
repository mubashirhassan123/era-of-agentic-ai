import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { DoubleSide } from 'three'

const GRID_SIZE = 10
const GAP = 5
const TILT_DEG = 70
const TILT_RAD = (TILT_DEG * Math.PI) / 180

export default function NeuralGlass() {
  const groupRef = useRef<THREE.Group>(null)

  const planes = useMemo(() => {
    const result: Array<{
      id: string
      position: [number, number, number]
      rotation: [number, number, number]
      width: number
      height: number
      isEvenRow: boolean
    }> = []
    const totalWidth = (GRID_SIZE - 1) * GAP

    for (let z = 0; z < GRID_SIZE; z++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        const centerX = (x * GAP) - (totalWidth / 2)
        const centerZ = (z * GAP) - (totalWidth / 2)
        const isEvenRow = z % 2 === 0
        const rotationY = isEvenRow ? -TILT_RAD : TILT_RAD

        result.push({
          id: `${x}-${z}`,
          position: [centerX, 0, centerZ],
          rotation: [0, rotationY, 0],
          width: 4,
          height: 3,
          isEvenRow,
        })
      }
    }
    return result
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      state.pointer.x * 0.5,
      0.05
    )
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      state.pointer.y * 0.2,
      0.05
    )
  })

  return (
    <group ref={groupRef}>
      {planes.map((plane) => (
        <mesh
          key={plane.id}
          position={plane.position}
          rotation={plane.rotation}
        >
          <planeGeometry args={[plane.width, plane.height]} />
          <meshPhysicalMaterial
            metalness={0.1}
            roughness={0.15}
            transmission={1}
            thickness={2}
            ior={1.4}
            clearcoat={0.6}
            clearcoatRoughness={0.2}
            transparent
            side={DoubleSide}
            color="#bdfbe6"
            opacity={0.18}
          />
        </mesh>
      ))}
    </group>
  )
}
