"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function DynamicParticles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.offsetWidth;
    const height = container.offsetHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 300;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Create multiple particle systems
    const particleGroups: THREE.Points[] = [];
    const particleCount = 200;

    for (let i = 0; i < 3; i++) {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const sizes = new Float32Array(particleCount);

      for (let j = 0; j < particleCount; j++) {
        const j3 = j * 3;
        const radius = 150 + i * 50;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);

        positions[j3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[j3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[j3 + 2] = radius * Math.cos(phi);

        // Dark colors with slight variation
        const intensity = 0.15 + Math.random() * 0.1;
        colors[j3] = intensity;
        colors[j3 + 1] = intensity;
        colors[j3 + 2] = intensity + 0.05;

        sizes[j] = 2 + Math.random() * 3;
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
        },
        vertexShader: `
          attribute float size;
          attribute vec3 color;
          varying vec3 vColor;
          uniform float time;
          
          void main() {
            vColor = color;
            vec3 pos = position;
            pos.x += sin(time + position.y * 0.01) * 10.0;
            pos.y += cos(time + position.x * 0.01) * 10.0;
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = size * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          
          void main() {
            float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
            float alpha = 1.0 - smoothstep(0.0, 0.5, distanceToCenter);
            gl_FragColor = vec4(vColor, alpha * 0.8);
          }
        `,
        transparent: true,
        vertexColors: true,
      });

      const points = new THREE.Points(geometry, material);
      scene.add(points);
      particleGroups.push(points);
    }

    // Mouse interaction
    const mouse = new THREE.Vector2();
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    let time = 0;
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      time += 0.01;

      particleGroups.forEach((group, i) => {
        const material = group.material as THREE.ShaderMaterial;
        material.uniforms.time.value = time + i * 2;

        group.rotation.y += 0.001 + i * 0.0005;
        group.rotation.x += 0.0005;

        // Mouse influence
        group.position.x += (mouse.x * 30 - group.position.x) * 0.05;
        group.position.y += (mouse.y * 30 - group.position.y) * 0.05;
      });

      camera.position.x += (mouse.x * 20 - camera.position.x) * 0.05;
      camera.position.y += (mouse.y * 20 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const newWidth = container.offsetWidth;
      const newHeight = container.offsetHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="w-full h-96" />;
}
