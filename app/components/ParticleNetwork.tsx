"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
}

export default function ParticleNetwork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.offsetWidth;
    const height = container.offsetHeight;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 500;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Particles
    const particleCount = 80;
    const particles: Particle[] = [];
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 1000;
      positions[i3 + 1] = (Math.random() - 0.5) * 1000;
      positions[i3 + 2] = (Math.random() - 0.5) * 1000;

      // Dark gray/black colors
      colors[i3] = 0.1;
      colors[i3 + 1] = 0.1;
      colors[i3 + 2] = 0.12;

      particles.push({
        x: positions[i3],
        y: positions[i3 + 1],
        z: positions[i3 + 2],
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        vz: (Math.random() - 0.5) * 0.5,
      });
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 3,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Lines
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(particleCount * particleCount * 3);
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x1a1a1a,
      transparent: true,
      opacity: 0.2,
    });

    let lineIndex = 0;
    const maxDistance = 150;

    const updateLines = () => {
      lineIndex = 0;
      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dz = particles[i].z - particles[j].z;
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (distance < maxDistance) {
            const i3 = lineIndex * 6;
            linePositions[i3] = particles[i].x;
            linePositions[i3 + 1] = particles[i].y;
            linePositions[i3 + 2] = particles[i].z;
            linePositions[i3 + 3] = particles[j].x;
            linePositions[i3 + 4] = particles[j].y;
            linePositions[i3 + 5] = particles[j].z;
            lineIndex++;
          }
        }
      }
      lineGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(linePositions.slice(0, lineIndex * 6), 3)
      );
      lineGeometry.setDrawRange(0, lineIndex * 2);
    };

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // Mouse interaction
    const mouse = new THREE.Vector2();
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Animation
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);

      // Update particles
      for (let i = 0; i < particleCount; i++) {
        const particle = particles[i];
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.z += particle.vz;

        // Mouse influence
        const mouseInfluence = 50;
        particle.vx += (mouse.x * mouseInfluence - particle.x) * 0.0001;
        particle.vy += (mouse.y * mouseInfluence - particle.y) * 0.0001;

        // Boundary check
        if (Math.abs(particle.x) > 500) particle.vx *= -1;
        if (Math.abs(particle.y) > 500) particle.vy *= -1;
        if (Math.abs(particle.z) > 500) particle.vz *= -1;

        // Update positions
        const i3 = i * 3;
        positions[i3] = particle.x;
        positions[i3 + 1] = particle.y;
        positions[i3 + 2] = particle.z;
      }

      geometry.attributes.position.needsUpdate = true;
      updateLines();
      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      const newWidth = container.offsetWidth;
      const newHeight = container.offsetHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="w-full h-96" />;
}
