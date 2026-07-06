import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Sphere, MeshDistortMaterial, Float, Stars } from '@react-three/drei'
import { motion } from 'framer-motion'
import { useState as useReactState } from 'react'

function AnimatedSphere({ position, color, distort = 0.4, speed = 2 }) {
  const mesh = useRef()
  
  useFrame((state) => {
    mesh.current.rotation.x = state.clock.getElapsedTime() * 0.2
    mesh.current.rotation.y = state.clock.getElapsedTime() * 0.3
  })

  return (
    <Sphere ref={mesh} args={[1, 100, 200]} position={position} scale={2.5}>
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={distort}
        speed={speed}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  )
}

function FloatingText({ position, text, size = 1, color = '#00ff88' }) {
  const textRef = useRef()
  
  useFrame((state) => {
    textRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 2) * 0.1
  })

  return (
    <Text
      ref={textRef}
      position={position}
      fontSize={size}
      color={color}
      anchorX="center"
      anchorY="middle"
      font="https://fonts.gstatic.com/s/inter/v12/UcCo3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZ.ttf"
    >
      {text}
    </Text>
  )
}

function ParticleField() {
  return (
    <>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      {Array.from({ length: 20 }).map((_, i) => (
        <Float key={i} speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <mesh position={[
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20
          ]}>
            <boxGeometry args={[0.05, 0.05, 0.05]} />
            <meshBasicMaterial color="#00ff88" />
          </mesh>
        </Float>
      ))}
    </>
  )
}

function InteractiveCard({ position, title, description, color = '#00ff88' }) {
  const [hovered, setHovered] = useReactState(false)
  const mesh = useRef()

  useFrame((state, delta) => {
    mesh.current.rotation.y += delta * 0.5
    mesh.current.scale.lerp({ x: hovered ? 1.2 : 1, y: hovered ? 1.2 : 1, z: hovered ? 1.2 : 1 }, 0.1)
  })

  return (
    <group position={position}>
      <mesh
        ref={mesh}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[3, 2, 0.2]} />
        <meshStandardMaterial
          color={hovered ? color : '#111122'}
          emissive={color}
          emissiveIntensity={hovered ? 0.5 : 0.1}
          transparent
          opacity={0.9}
        />
      </mesh>
      <Text position={[0, 0.3, 0.15]} fontSize={0.3} color="#ffffff">{title}</Text>
      <Text position={[0, -0.2, 0.15]} fontSize={0.15} color="#cccccc">{description}</Text>
    </group>
  )
}

export default function Hero3D() {
  const skills = [
    'React', 'Node.js', 'Python', 'TypeScript',
    'Next.js', 'Express', 'PostgreSQL', 'MongoDB',
    'Docker', 'AWS', 'CI/CD', 'Git'
  ]

  return (
    <div className="relative w-full h-screen bg-black">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        
        <AnimatedSphere position={[-4, 2, -2]} color="#00ff88" />
        <AnimatedSphere position={[4, -2, -3]} color="#00aaff" distort={0.6} speed={1.5} />
        
        <ParticleField />
        
        <FloatingText position={[0, 3, 0]} text="ADRIAN BELLO" size={1.2} color="#ffffff" />
        <FloatingText position={[0, 2, 0]} text="Full Stack Developer" size={0.6} color="#00ff88" />
        
        {skills.map((skill, i) => (
          <FloatingText
            key={skill}
            position={[
              Math.cos((i / skills.length) * Math.PI * 2) * 6,
              Math.sin((i / skills.length) * Math.PI * 2) * 4 - 1,
              0
            ]}
            text={skill}
            size={0.25}
            color="#00ff88"
          />
        ))}
        
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center"
      >
        <h2 className="text-2xl font-bold text-white">Desplázate para explorar</h2>
        <div className="mt-4 w-6 h-10 border-2 border-white rounded-full mx-auto flex justify-center">
          <motion.div
            className="w-2 h-2 bg-white rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </div>
      </motion.div>
    </div>
  )
}