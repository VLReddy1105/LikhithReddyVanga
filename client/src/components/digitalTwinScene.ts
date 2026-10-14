import * as THREE from "three";
import { SECTION_IDS } from "@/data/sections";

type Pose = {
  spread: number;
  layered: number;
  scale: number;
  cameraX: number;
  cameraY: number;
  opacity: number;
};
const poses: Pose[] = [
  {
    spread: 0.6,
    layered: 0.15,
    scale: 0.88,
    cameraX: 0,
    cameraY: 0.25,
    opacity: 0.76,
  },
  {
    spread: 1.3,
    layered: 0.25,
    scale: 1,
    cameraX: 0.6,
    cameraY: 0.55,
    opacity: 0.4,
  },
  {
    spread: 0.95,
    layered: 1,
    scale: 1.12,
    cameraX: -0.3,
    cameraY: 0.9,
    opacity: 0.36,
  },
  {
    spread: 0.65,
    layered: 0.35,
    scale: 0.84,
    cameraX: 0.2,
    cameraY: 0.25,
    opacity: 0.2,
  },
  {
    spread: 0.5,
    layered: 0.15,
    scale: 0.7,
    cameraX: 0,
    cameraY: 0,
    opacity: 0,
  },
];

// Ordered exactly like the page: hero, about, experience, updates, work, research, contact.
const sceneStages = [
  poses[0],
  poses[0],
  poses[3],
  poses[4],
  poses[1],
  poses[2],
  poses[4],
];

/** Demand-rendered, scroll-morphed modules. Idle, hidden and calm sections render no frames. */
export function mountDigitalTwin(
  host: HTMLElement,
  theme: "light" | "dark",
  onFailure: () => void
): (() => void) | undefined {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("webgl2", {
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  if (!context) return;
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      context,
      alpha: true,
      antialias: true,
    });
  } catch {
    return;
  }
  host.appendChild(canvas);
  const mobile = window.innerWidth < 768;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1 : 1.5));
  renderer.setClearColor(0x000000, 0);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 45);
  const system = new THREE.Group();
  scene.add(system);
  const blue = new THREE.Color(theme === "dark" ? "#74a0ff" : "#2358f5");
  const violet = new THREE.Color(theme === "dark" ? "#b09aff" : "#8165eb");
  scene.add(new THREE.AmbientLight(0xffffff, 2));
  const light = new THREE.DirectionalLight(0xffffff, 3);
  light.position.set(3, 5, 6);
  scene.add(light);
  const fill = new THREE.PointLight(violet, 14, 20);
  fill.position.set(-3, 0, 4);
  scene.add(fill);
  const geometry = new THREE.BoxGeometry(1.05, 0.12, 0.8);
  const edges = new THREE.EdgesGeometry(geometry);
  const materials: THREE.Material[] = [];
  const plateMaterial = new THREE.MeshStandardMaterial({
    color: blue,
    metalness: 0.3,
    roughness: 0.35,
    transparent: true,
    opacity: 0.19,
    depthWrite: false,
  });
  const outlineMaterial = new THREE.LineBasicMaterial({
    color: blue,
    transparent: true,
    opacity: 0.52,
  });
  const coreMaterial = new THREE.MeshStandardMaterial({
    color: violet,
    emissive: violet,
    emissiveIntensity: 0.22,
    metalness: 0.5,
    roughness: 0.3,
    transparent: true,
    opacity: 0.38,
  });
  const wireMaterial = new THREE.LineBasicMaterial({
    color: violet,
    transparent: true,
    opacity: 0.32,
  });
  materials.push(plateMaterial, outlineMaterial, coreMaterial, wireMaterial);
  const modules: THREE.Group[] = [];
  const moduleCount = mobile ? 4 : 6;
  for (let i = 0; i < moduleCount; i++) {
    const module = new THREE.Group();
    for (let j = 0; j < (mobile ? 2 : 3); j++) {
      const plate = new THREE.Mesh(geometry, plateMaterial);
      plate.position.y = j * 0.23;
      plate.add(new THREE.LineSegments(edges, outlineMaterial));
      module.add(plate);
    }
    const core = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.15),
      coreMaterial
    );
    core.position.y = 0.8;
    module.add(core);
    module.rotation.set(0.12, i * 0.4, 0.08);
    system.add(module);
    modules.push(module);
  }
  // A central retained-state structure and routed paths, rather than a random particle cloud.
  const center = new THREE.Group();
  for (let i = 0; i < 5; i++) {
    const plate = new THREE.Mesh(geometry, plateMaterial);
    plate.position.y = (i - 2) * 0.24;
    plate.rotation.y = i * 0.04;
    plate.add(new THREE.LineSegments(edges, outlineMaterial));
    center.add(plate);
  }
  system.add(center);
  const pathGeometry = new THREE.BufferGeometry();
  const pathSegments = mobile ? 6 : 12;
  const pathPositions = new Float32Array(moduleCount * pathSegments * 2 * 3);
  pathGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(pathPositions, 3)
  );
  system.add(new THREE.LineSegments(pathGeometry, wireMaterial));
  const pointMaterial = new THREE.MeshBasicMaterial({
    color: blue,
    transparent: true,
    opacity: 0.7,
  });
  materials.push(pointMaterial);
  const pointGeometry = new THREE.SphereGeometry(0.025, 5, 4);
  const packets = Array.from({ length: moduleCount }, () => {
    const mesh = new THREE.Mesh(pointGeometry, pointMaterial);
    system.add(mesh);
    return mesh;
  });
  const haloGeometry = new THREE.TorusGeometry(
    2.15,
    0.006,
    4,
    mobile ? 40 : 80
  );
  const halo = new THREE.Mesh(haloGeometry, coreMaterial);
  halo.rotation.x = Math.PI / 2.6;
  system.add(halo);

  const glowCanvas = document.createElement("canvas");
  glowCanvas.width = glowCanvas.height = 64;
  const glowContext = glowCanvas.getContext("2d");
  let glowTexture: THREE.CanvasTexture | undefined;
  if (glowContext) {
    const gradient = glowContext.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, "rgba(255,255,255,.65)");
    gradient.addColorStop(0.25, "rgba(255,255,255,.15)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    glowContext.fillStyle = gradient;
    glowContext.fillRect(0, 0, 64, 64);
    glowTexture = new THREE.CanvasTexture(glowCanvas);
    const atmosphere = new THREE.SpriteMaterial({
      map: glowTexture,
      color: violet,
      transparent: true,
      opacity: theme === "dark" ? 0.12 : 0.035,
      depthWrite: false,
    });
    materials.push(atmosphere);
    const glow = new THREE.Sprite(atmosphere);
    glow.scale.set(6, 6, 1);
    glow.position.z = -0.7;
    system.add(glow);
  }

  let boundaries: number[] = [];
  let target = 0,
    current = 0,
    frame = 0,
    timer = 0,
    stopped = false,
    failed = false;
  const pageTop = (id: string) =>
    (document.getElementById(id)?.getBoundingClientRect().top ?? 0) +
    window.scrollY;
  const measure = () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    boundaries = SECTION_IDS.map(id => pageTop(id));
    update();
  };
  const render = () => {
    frame = 0;
    if (stopped || failed || document.hidden) return;
    current = THREE.MathUtils.lerp(current, target, 0.13);
    if (Math.abs(target - current) < 0.002) current = target;
    const lo = Math.min(sceneStages.length - 2, Math.floor(current)),
      fraction = current - lo;
    const a = sceneStages[lo],
      b = sceneStages[lo + 1];
    const value = (key: keyof Pose) =>
      THREE.MathUtils.lerp(a[key], b[key], fraction);
    const spread = value("spread"),
      layered = value("layered");
    host.style.opacity = String(value("opacity") * (mobile ? 0.6 : 1));
    system.position.set(mobile ? 1.35 : 2.1, -0.2, 0);
    system.scale.setScalar(value("scale"));
    system.rotation.set(0.18 + layered * 0.1, -0.3 + current * 0.12, -0.12);
    center.rotation.y = current * 0.1;
    modules.forEach((module, i) => {
      const angle = (i / moduleCount) * Math.PI * 2;
      module.position.set(
        Math.cos(angle) * 2.25 * spread,
        Math.sin(angle) * 1.6 * (1 - layered * 0.65) +
          (i - moduleCount / 2) * layered * 0.55,
        Math.sin(angle) * 0.8 + layered * (i % 2 ? 0.6 : -0.6)
      );
      module.rotation.y = angle * 0.5 + current * 0.1;
      const position = module.position;
      for (let segment = 0; segment < pathSegments; segment++) {
        const t0 = segment / pathSegments,
          t1 = (segment + 1) / pathSegments;
        pathPositions.set(
          [
            position.x * t0,
            position.y * t0 + Math.sin(t0 * Math.PI) * 0.5,
            position.z * t0 + Math.sin(t0 * Math.PI) * 0.35,
            position.x * t1,
            position.y * t1 + Math.sin(t1 * Math.PI) * 0.5,
            position.z * t1 + Math.sin(t1 * Math.PI) * 0.35,
          ],
          (i * pathSegments + segment) * 6
        );
      }
      const travel = (performance.now() / 4000 + i / moduleCount) % 1;
      packets[i].position.set(
        position.x * travel,
        position.y * travel + Math.sin(travel * Math.PI) * 0.5,
        position.z * travel + Math.sin(travel * Math.PI) * 0.35
      );
    });
    pathGeometry.attributes.position.needsUpdate = true;
    halo.scale.setScalar(0.7 + spread * 0.24);
    camera.position.set(
      value("cameraX"),
      value("cameraY"),
      mobile ? 11.5 : 10.2
    );
    camera.lookAt(0, 0, 0);
    if (value("opacity") > 0.005) renderer.render(scene, camera);
    if (current !== target) schedule();
  };
  const schedule = () => {
    if (
      stopped ||
      failed ||
      frame ||
      timer ||
      document.hidden ||
      (current === target &&
        (target === 3 || target === sceneStages.length - 1))
    )
      return;
    timer = window.setTimeout(
      () => {
        timer = 0;
        frame = requestAnimationFrame(render);
      },
      mobile ? 50 : 33
    );
  };
  const update = () => {
    const y = window.scrollY + window.innerHeight * 0.24;
    let i = 0;
    while (i < boundaries.length - 1 && y >= boundaries[i + 1]) i++;
    const last = boundaries.length - 1;
    const progress =
      i === last
        ? 0
        : THREE.MathUtils.clamp(
            (y - boundaries[i]) /
              Math.max(1, boundaries[i + 1] - boundaries[i]),
            0,
            1
          );
    // Keep Updates calm, then expand smoothly as Work enters the viewport.
    target =
      i === last
        ? last
        : i +
          (i === 3
            ? THREE.MathUtils.clamp((progress - 0.72) / 0.28, 0, 1)
            : progress);
    host.dataset.sceneSection = SECTION_IDS[i];
    schedule();
  };
  const visibility = () => {
    if (document.hidden) {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
      frame = timer = 0;
    } else update();
  };
  const lost = (event: Event) => {
    event.preventDefault();
    failed = true;
    cancelAnimationFrame(frame);
    clearTimeout(timer);
    canvas.remove();
    host.style.opacity = "";
    onFailure();
  };
  canvas.addEventListener("webglcontextlost", lost);
  document.addEventListener("visibilitychange", visibility);
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", measure);
  const resize = new ResizeObserver(measure);
  const main = document.getElementById("main-content");
  if (main) resize.observe(main);
  measure();
  return () => {
    stopped = true;
    cancelAnimationFrame(frame);
    clearTimeout(timer);
    resize.disconnect();
    window.removeEventListener("scroll", update);
    window.removeEventListener("resize", measure);
    document.removeEventListener("visibilitychange", visibility);
    canvas.removeEventListener("webglcontextlost", lost);
    const geometries = new Set<THREE.BufferGeometry>();
    scene.traverse(object => {
      if (object instanceof THREE.Mesh || object instanceof THREE.LineSegments)
        geometries.add(object.geometry);
    });
    geometries.forEach(item => item.dispose());
    materials.forEach(material => material.dispose());
    glowTexture?.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
    canvas.remove();
    host.style.opacity = "";
  };
}
