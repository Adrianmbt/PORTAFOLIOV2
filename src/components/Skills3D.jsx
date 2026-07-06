import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, Float, MeshDistortMaterial, OrbitControls } from '@react-three/drei'

const skills = [
  { name: 'React', level: 0.9, color: '#61DAFB' },
  { name: 'Node.js', level: 0.85, color: '#339933' },
  { name: 'Python', level: 0.8, color: '#3776AB' },
  { name: 'TypeScript', level: 0.75, color: '#3178C6' },
  { name: 'Next.js', level: 0.7, color: '#000000' },
  { name: 'Express', level: 0.8, color: '#FFFFFF' },
  { name: 'PostgreSQL', level: 0.7, color: '#336791' },
  { name: 'MongoDB', level: 0.65, color: '#47A248' },
  { name: 'Docker', level: 0.6, color: '#2496ED' },
  { name: 'AWS', level: 0.55, color: '#FF9900' },
  { name: 'CI/CD', level: 0.65, color: '#00FF88' },
  { name: 'Git', level: 0.9, color: '#F05032' }
]

function SkillOrb({ skill, position, index }) {
  const mesh = useRef()
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    mesh.current.position.y = position[1] + Math.sin(t * 2 + index) * 0.2
    mesh.current.rotation.x = t * 0.5
    mesh.current.rotation.y = t * 0.3
    mesh.current.scale.lerp(
      { x: hovered ? 1.5 : 1, y: hovered ? 1.5 : 1, z: hovered ? 1.5 : 1 },
      0.1
    )
  })

  return (
    <group position={position}>
      <mesh
        ref={mesh}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.8, 32, 32]} />
        <MeshDistortMaterial
          color={hovered ? skill.color : `${skill.color}88`}
          distort={hovered ? 0.3 : 0.5}
          speed={hovered ? 3 : 1.5}
          roughness={0.3}
          metalness={0.8}
          transparent
          opacity={0.9}
        />
      </mesh>
      <Text
        position={[0, -1.2, 0]}
        fontSize={0.3}
        color={hovered ? '#ffffff' : '#cccccc'}
        anchorX="center"
        anchorY="middle"
      >
        {skill.name}
      </Text>
      <Text
        position={[0, -1.5, 0]}
        fontSize={0.2}
        color="#00ff88"
        anchorX="center"
        anchorY="middle"
      >
        {Math.round(skill.level * 100)}%
      </Text>
    </group>
  )
}

function SkillRing() {
  const group = useRef()
  
  useFrame((state) => {
    group.current.rotation.y = state.clock.getElapsedTime() * 0.15
  })

  return (
    <group ref={group}>
      {skills.map((skill, i) => {
        const angle = (i / skills.length) * Math.PI * 2
        const radius = 5
        return (
          <SkillOrb
            key={skill.name}
            skill={skill}
            position={[
              Math.cos(angle) * radius,
              0,
              Math.sin(angle) * radius
            ]}
            index={i}
          />
        )
      })}
    </group>
  )
}

export default function Skills3D() {
  return (
    <div className="w-full h-screen bg-gradient-to-b from-black to-gray-900 relative">
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 z-10">
        <h2 className="text-4xl font-bold text-white text-center">
          Habilidades Técnicas
        </h2>
        <p className="text-gray-400 mt-2 text-center">
          Interactúa con las esferas para explorar mi stack tecnológico
        </p>
      </div>
      
      <Canvas camera={{ position: [0, 5, 12], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <directionalLight position={[0, 5, 5]} intensity={0.5} />
        
        <SkillRing />
        
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.8}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  )
}