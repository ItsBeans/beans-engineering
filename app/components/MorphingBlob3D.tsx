"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function MorphingBlob3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.offsetWidth;
    const height = container.offsetHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 250;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Create a sphere and morph it
    const geometry = new THREE.IcosahedronGeometry(100, 2);
    const material = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      metalness: 0.4,
      roughness: 0.3,
      wireframe: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Wireframe overlay - will recreate periodically
    let wireframeLine: THREE.LineSegments | null = null;
    let wireframeUpdateCounter = 0;
    
    const updateWireframe = () => {
      if (wireframeLine) {
        scene.remove(wireframeLine);
        (wireframeLine.geometry as THREE.WireframeGeometry).dispose();
      }
      const wireframe = new THREE.WireframeGeometry(geometry);
      wireframeLine = new THREE.LineSegments(
        wireframe,
        new THREE.LineBasicMaterial({ 
          color: 0x1a1a1a, 
          opacity: 0.3, 
          transparent: true 
        })
      );
      scene.add(wireframeLine);
    };
    
    updateWireframe();

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xffffff, 0.8);
    pointLight1.position.set(100, 100, 100);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 0.5);
    pointLight2.position.set(-100, -100, 100);
    scene.add(pointLight2);

    const positions = geometry.attributes.position;
    const originalPositions = new Float32Array(positions.array);

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
      time += 0.005;

      // Morph vertices
      for (let i = 0; i < positions.count; i++) {
        const i3 = i * 3;
        const x = originalPositions[i3];
        const y = originalPositions[i3 + 1];
        const z = originalPositions[i3 + 2];

        const distance = Math.sqrt(x * x + y * y + z * z);
        const wave = Math.sin(distance * 0.02 + time * 2) * 8;
        const mouseWave = (mouse.x * x + mouse.y * y) * 0.1;

        positions.array[i3] = x + (x / distance) * (wave + mouseWave);
        positions.array[i3 + 1] = y + (y / distance) * (wave + mouseWave);
        positions.array[i3 + 2] = z + (z / distance) * (wave + mouseWave);
      }

      positions.needsUpdate = true;
      geometry.computeVertexNormals();
      
      // Update wireframe every 3 frames for performance
      wireframeUpdateCounter++;
      if (wireframeUpdateCounter >= 3) {
        updateWireframe();
        wireframeUpdateCounter = 0;
      }
      
      if (wireframeLine) {
        wireframeLine.rotation.copy(mesh.rotation);
      }

      mesh.rotation.x += 0.003;
      mesh.rotation.y += 0.005;

      // Camera movement
      camera.position.x += (mouse.x * 30 - camera.position.x) * 0.05;
      camera.position.y += (mouse.y * 30 - camera.position.y) * 0.05;
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
