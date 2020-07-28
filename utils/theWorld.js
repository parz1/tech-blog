/* eslint-disable unicorn/number-literal-case */
/* eslint-disable prettier/prettier */
import * as Three from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export class ThreeWorld {
  constructor(canvasContainer, h, w) {
    this.container = canvasContainer || document.body
    this.createScene(h, w)
    this.createLights()
    this.addObjs()
    this.initControls()
    this.update()
  }

  createScene(height, width) {
    this.height = height || window.innerHeight
    this.width = width || window.innerWidth
    this.scene = new Three.Scene()
    this.scene.fog = new Three.Fog(0x090918, 1, 600)
    const aspectRatio = this.width / this.height
    const fieldOfView = 60
    const nearPlane = 0.1
    const farPlane = 5000
    this.camera = new Three.PerspectiveCamera(
      fieldOfView,
      aspectRatio,
      nearPlane,
      farPlane
    )

    this.camera.position.x = 0
    this.camera.position.y = 0
    this.camera.position.z = 160

    this.renderer = new Three.WebGLRenderer({ alpha: true, antialias: true })
    this.renderer.setClearColor(0xffffff)
    this.renderer.setSize(this.width, this.height)

    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = Three.PCFSoftShadowMap

    this.container.appendChild(this.renderer.domElement)
    window.addEventListener('resize', this.handleWindowResize.bind(this), false)
  }

  handleWindowResize() {
    // 更新渲染器的高度和宽度以及相机的纵横比
    this.renderer.setSize(this.width, this.height)
    this.camera.aspect = this.width / this.height
    this.camera.updateProjectionMatrix()
  }

  initControls() {
    // ...
    this.orbitControls = new OrbitControls(
      this.camera,
      this.renderer.domElement
    )
    this.orbitControls.autoRotate = true
    // 惯性
    this.orbitControls.enableDamping = true
    // 动态阻尼系数
    this.orbitControls.dampingFactor = 0.25
    // 缩放
    this.orbitControls.enableZoom = true
    // 右键拖拽
    this.orbitControls.enablePan = true
    // 水平旋转范围
    this.orbitControls.maxAzimuthAngle = Math.PI / 6
    this.orbitControls.minAzimuthAngle = -Math.PI / 6
    // 垂直旋转范围
    this.orbitControls.maxPolarAngle = Math.PI / 6
    this.orbitControls.minPolarAngle = -Math.PI / 6
  }

  createLights() {
    // 户外光源
    // 第一个参数是天空的颜色，第二个参数是地上的颜色，第三个参数是光源的强度
    this.hemisphereLight = new Three.HemisphereLight(0xffc0cb, 0xffffff, 0.9)

    // 环境光源
    this.ambientLight = new Three.AmbientLight(0xdc8874, 0.2)

    // 方向光是从一个特定的方向的照射
    // 类似太阳，即所有光源是平行的
    // 第一个参数是关系颜色，第二个参数是光源强度
    this.shadowLight = new Three.DirectionalLight(0xffffff, 0.9)

    // 设置光源的位置方向
    this.shadowLight.position.set(50, 50, 50)

    // 开启光源投影
    this.shadowLight.castShadow = true

    // 定义可见域的投射阴影
    this.shadowLight.shadow.camera.left = -400
    this.shadowLight.shadow.camera.right = 400
    this.shadowLight.shadow.camera.top = 400
    this.shadowLight.shadow.camera.bottom = -400
    this.shadowLight.shadow.camera.near = 1
    this.shadowLight.shadow.camera.far = 1000

    // 定义阴影的分辨率；虽然分辨率越高越好，但是需要付出更加昂贵的代价维持高性能的表现。
    this.shadowLight.shadow.mapSize.width = 2048
    this.shadowLight.shadow.mapSize.height = 2048

    // 为了使这些光源呈现效果，需要将它们添加到场景中
    this.scene.add(this.hemisphereLight)
    this.scene.add(this.shadowLight)
    this.scene.add(this.ambientLight)
  }

  addObjs() {
    // 红色方块
    const geo = new Three.BoxGeometry(5, 5, 5)
    const mat = new Three.MeshPhongMaterial({
      color: new Three.Color(0x00ff00),
    })
    this.cube = new Three.Mesh(geo, mat)
    this.cube.castShadow = true
    this.cube.position.x = 0
    // 物体添加至场景
    this.scene.add(this.cube)
  }

  update() {
    // 渲染器执行渲染
    this.cube.rotation.x += 0.01
    this.cube.rotation.y += 0.01
    this.renderer.render(this.scene, this.camera)
    requestAnimationFrame(() => {
      this.update()
    })
  }
}

export function load(e, h, w) {
  const tw = new ThreeWorld(document.getElementById(e), h, w)
  return tw
}
