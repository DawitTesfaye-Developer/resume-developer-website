import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Box, OrbitControls, Float, Center } from '@react-three/drei';
import * as THREE from 'three';
import { ResumeData } from '../types/resume';
import { useTheme } from '../hooks/useTheme';

interface ResumePreview3DProps {
  data: ResumeData;
}

const ResumeCard: React.FC<{ data: ResumeData; position: [number, number, number] }> = ({ data, position }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { currentTheme } = useTheme();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  const fullName = `${data.personalInfo.firstName} ${data.personalInfo.lastName}`.trim();

  // Convert hex colors to Three.js format
  const primaryColor = new THREE.Color(currentTheme.colors.primary);
  const backgroundColor = new THREE.Color(currentTheme.colors.background);
  const textColor = new THREE.Color(currentTheme.colors.text);
  const secondaryColor = new THREE.Color(currentTheme.colors.secondary);
  const accentColor = new THREE.Color(currentTheme.colors.accent);

  return (
    <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.3}>
      <group position={position}>
        {/* Main card background */}
        <Box ref={meshRef} args={[6, 8, 0.1]} position={[0, 0, 0]}>
          <meshStandardMaterial 
            color={backgroundColor} 
            roughness={0.1}
            metalness={0.1}
          />
        </Box>
        
        {/* Header section */}
        <Box args={[6, 1.5, 0.11]} position={[0, 3.25, 0.05]}>
          <meshStandardMaterial 
            color={primaryColor} 
            roughness={0.2}
            metalness={0.3}
          />
        </Box>

        {/* Name */}
        <Text
          position={[0, 3.5, 0.1]}
          fontSize={0.4}
          color="white"
          anchorX="center"
          anchorY="middle"
          maxWidth={5}
          textAlign="center"
        >
          {fullName || 'Your Name'}
        </Text>

        {/* Email */}
        {data.personalInfo.email && (
          <Text
            position={[0, 3, 0.1]}
            fontSize={0.2}
            color="white"
            anchorX="center"
            anchorY="middle"
            maxWidth={5}
            textAlign="center"
          >
            {data.personalInfo.email}
          </Text>
        )}

        {/* Experience section */}
        <Text
          position={[-2.5, 2, 0.1]}
          fontSize={0.25}
          color={textColor}
          anchorX="left"
          anchorY="middle"
          maxWidth={2}
        >
          EXPERIENCE
        </Text>

        {data.experience.slice(0, 2).map((exp, index) => (
          <group key={exp.id}>
            <Text
              position={[-2.5, 1.5 - index * 0.8, 0.1]}
              fontSize={0.18}
              color={textColor}
              anchorX="left"
              anchorY="middle"
              maxWidth={4.5}
            >
              {exp.position}
            </Text>
            <Text
              position={[-2.5, 1.3 - index * 0.8, 0.1]}
              fontSize={0.15}
              color={secondaryColor}
              anchorX="left"
              anchorY="middle"
              maxWidth={4.5}
            >
              {exp.company}
            </Text>
          </group>
        ))}

        {/* Skills section */}
        <Text
          position={[-2.5, -0.5, 0.1]}
          fontSize={0.25}
          color={textColor}
          anchorX="left"
          anchorY="middle"
          maxWidth={2}
        >
          SKILLS
        </Text>

        {data.skills.slice(0, 4).map((skill, index) => (
          <group key={skill.id}>
            {/* Skill name */}
            <Text
              position={[-2.5, -1 - index * 0.4, 0.1]}
              fontSize={0.15}
              color={textColor}
              anchorX="left"
              anchorY="middle"
              maxWidth={2.5}
            >
              {skill.name}
            </Text>
            
            {/* Skill level bars */}
            {[...Array(5)].map((_, i) => (
              <Box
                key={i}
                args={[0.2, 0.08, 0.02]}
                position={[0.5 + i * 0.25, -1 - index * 0.4, 0.1]}
              >
                <meshStandardMaterial 
                  color={i < skill.level ? accentColor : new THREE.Color('#e5e7eb')} 
                  roughness={0.3}
                  metalness={0.1}
                />
              </Box>
            ))}
          </group>
        ))}

        {/* Education section if no experience */}
        {data.experience.length === 0 && data.education.length > 0 && (
          <>
            <Text
              position={[-2.5, 1.5, 0.1]}
              fontSize={0.25}
              color={textColor}
              anchorX="left"
              anchorY="middle"
              maxWidth={2}
            >
              EDUCATION
            </Text>
            {data.education.slice(0, 2).map((edu, index) => (
              <group key={edu.id}>
                <Text
                  position={[-2.5, 1 - index * 0.8, 0.1]}
                  fontSize={0.18}
                  color={textColor}
                  anchorX="left"
                  anchorY="middle"
                  maxWidth={4.5}
                >
                  {edu.degree}
                </Text>
                <Text
                  position={[-2.5, 0.8 - index * 0.8, 0.1]}
                  fontSize={0.15}
                  color={secondaryColor}
                  anchorX="left"
                  anchorY="middle"
                  maxWidth={4.5}
                >
                  {edu.institution}
                </Text>
              </group>
            ))}
          </>
        )}
      </group>
    </Float>
  );
};

const LoadingFallback: React.FC = () => (
  <div className="flex items-center justify-center h-full">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p className="text-gray-600">Loading 3D Preview...</p>
    </div>
  </div>
);

const Scene: React.FC<{ data: ResumeData }> = ({ data }) => {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-10, -10, -5]} intensity={0.3} />
      <pointLight position={[0, 0, 10]} intensity={0.5} />
      
      <Center>
        <ResumeCard data={data} position={[0, 0, 0]} />
      </Center>
      
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={8}
        maxDistance={20}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 6}
        autoRotate={false}
        autoRotateSpeed={0.5}
      />
    </>
  );
};

const ResumePreview3D: React.FC<ResumePreview3DProps> = ({ data }) => {
  const { currentTheme } = useTheme();
  
  return (
    <div className="w-full h-full relative bg-gradient-to-br from-gray-100 to-gray-200 min-h-[400px] sm:min-h-[600px] lg:min-h-[800px]">
      <Suspense fallback={<LoadingFallback />}>
        <Canvas 
          camera={{ 
            position: [0, 0, 12], 
            fov: 50,
            near: 0.1,
            far: 1000
          }}
          gl={{ 
            antialias: true,
            alpha: true,
            powerPreference: "high-performance"
          }}
          dpr={[1, 2]}
        >
          <Scene data={data} />
        </Canvas>
      </Suspense>
      
      <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 sm:p-3 shadow-lg">
        <div className="text-xs sm:text-sm text-gray-600 space-y-1">
          <p className="flex items-center space-x-2">
            <span>🖱️</span>
            <span className="hidden sm:inline">Drag to rotate</span>
            <span className="sm:hidden">Drag</span>
          </p>
          <p className="flex items-center space-x-2">
            <span>🔍</span>
            <span className="hidden sm:inline">Scroll to zoom</span>
            <span className="sm:hidden">Zoom</span>
          </p>
          <p className="hidden sm:flex items-center space-x-2">
            <span>✋</span>
            <span>Right-click + drag to pan</span>
          </p>
        </div>
      </div>

      {/* Debug info */}
      <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-black/70 text-white text-xs p-2 rounded">
        <p>3D Preview Active</p>
        <p className="hidden sm:block">Theme: {currentTheme.name}</p>
      </div>
    </div>
  );
};

export default ResumePreview3D;