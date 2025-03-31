'use client'
import { useEffect } from 'react'

export default function BubbleCanvas() {
  useEffect(() => {
    const loadThree = async () => {
      const THREE = await import('three')
      const { Noise } = await import('noisejs')
      const noise = new Noise()

      const canvas = document.getElementById('bubble') as HTMLCanvasElement
      let width = canvas.offsetWidth
      let height = canvas.offsetHeight

      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
      })

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(
        100,
        width / height,
        0.1,
        10000
      )
      camera.position.z = 300

      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(width, height)
      renderer.setClearColor(0xebebeb, 0)
      renderer.shadowMap.enabled = true

      scene.fog = new THREE.Fog(0x000000, 10, 950)

      // Lighting
      const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x000000, 0.5)
      const shadowLight = new THREE.DirectionalLight(0xff8f16, 0.4)
      shadowLight.position.set(0, 450, 350)
      shadowLight.castShadow = true

      const light2 = new THREE.DirectionalLight(0xfff150, 0.25)
      light2.position.set(-600, 350, 350)

      const light3 = new THREE.DirectionalLight(0xfff150, 0.15)
      light3.position.set(0, -250, 300)

      scene.add(hemisphereLight, shadowLight, light2, light3)

      // Bubble geometry
      const vertex = width > 575 ? 80 : 40
      const bubbleGeometry = new THREE.SphereGeometry(200, vertex, vertex)
      const positionAttribute = bubbleGeometry.attributes.position
      const vertexCount = positionAttribute.count
      const originalPositions = new Float32Array(positionAttribute.array)
      

      const bubbleMaterial = new THREE.MeshStandardMaterial({
        emissive: 0x3aa8c1,
        emissiveIntensity: 0.7, 
        roughness: 0.61,
        metalness: 0.21,
        side: THREE.FrontSide,
      });

      const bubble = new THREE.Mesh(bubbleGeometry, bubbleMaterial)
      bubble.castShadow = true
      
      scene.add(bubble)

      // Shadow plane
      const planeGeometry = new THREE.PlaneGeometry(2000, 2000)
      const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.15 })
      const plane = new THREE.Mesh(planeGeometry, planeMaterial)
      plane.position.y = -150
      plane.rotation.x = -Math.PI / 2
      plane.receiveShadow = true
      scene.add(plane)

      // Mouse tracking
      let mouse = new THREE.Vector2(0, 0)
      const onMouseMove = (e: MouseEvent | TouchEvent) => {
        const x =
          (e as MouseEvent).clientX ||
          (e as TouchEvent).touches?.[0]?.clientX ||
          0
        const y =
          (e as MouseEvent).clientY ||
          (e as TouchEvent).touches?.[0]?.clientY ||
          0
        mouse.x = x
        mouse.y = y
      }
      window.addEventListener('mousemove', onMouseMove)

      const distance = (a: any, b: any) => {
        const dx = a.x - b.x
        const dy = a.y - b.y
        return Math.sqrt(dx * dx + dy * dy)
      }

      const map = (
        num: number,
        in_min: number,
        in_max: number,
        out_min: number,
        out_max: number
      ) => {
        return (
          ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
        )
      }

      const spring = { scale: 1 }

      const updateVertices = (time: number) => {
        const dist = distance(mouse, { x: width / 2, y: height / 2 })
        const maxDist = distance({ x: 0, y: 0 }, { x: width / 2, y: height / 2 })
        const mappedDist = map(dist, 1, maxDist, 0, 1)

        for (let i = 0; i < vertexCount; i++) {
          const ix = i * 3
          const iy = i * 3 + 1
          const iz = i * 3 + 2

          const ox = originalPositions[ix]
          const oy = originalPositions[iy]
          const oz = originalPositions[iz]

          const perlin = noise.simplex3(
            ox * 0.006 + time * 0.0005,
            oy * 0.006 + time * 0.0005,
            oz * 0.006
          )

          const ratio = perlin * 0.3 * (mappedDist + 0.1) + 0.8

          positionAttribute.array[ix] = ox * ratio
          positionAttribute.array[iy] = oy * ratio
          positionAttribute.array[iz] = oz * ratio
        }

        positionAttribute.needsUpdate = true
      }

      const render = (time: number) => {
        requestAnimationFrame(render)
        bubble.rotation.y = time * 0.0005;
        bubble.rotation.z = time * 0.0003;
        bubble.scale.set(spring.scale, spring.scale, spring.scale)
        updateVertices(time)
        renderer.clear()
        renderer.render(scene, camera)
      }

      requestAnimationFrame(render)
    }

    loadThree()
  }, [])

  return <canvas id="bubble" className="scene w-full h-96" />
}
