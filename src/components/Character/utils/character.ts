import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        const encryptedBlob = await decryptFile(
          "/models/character.enc?v=2",
          "MyCharacter12"
        );
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        let character: THREE.Object3D;
        loader.load(
          blobUrl,
          async (gltf) => {
            character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);
            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;
                const meshName = mesh.name;
                const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];

                // Hoodie logic
                if (meshName === "Cube006" || meshName === "Cube006_1" || meshName.toLowerCase().includes("shirt") || meshName.toLowerCase().includes("hoodie")) {
                  materials.forEach((mat: any, i) => {
                    const newMat = mat.clone();
                    newMat.color.set("#FF0000"); // Red
                    if (newMat.map) newMat.map = null;
                    if ("emissive" in newMat) {
                      newMat.emissive.set("#660000");
                      newMat.emissiveIntensity = 0.5;
                    }
                    if (Array.isArray(mesh.material)) {
                      mesh.material[i] = newMat;
                    } else {
                      mesh.material = newMat;
                    }
                  });
                }
                // Pants logic
                else if (meshName === "Pant" || meshName.toLowerCase().includes("pant")) {
                  materials.forEach((mat: any, i) => {
                    const newMat = mat.clone();
                    newMat.color.set("#000000"); // Black
                    if (newMat.map) newMat.map = null;
                    if (Array.isArray(mesh.material)) {
                      mesh.material[i] = newMat;
                    } else {
                      mesh.material = newMat;
                    }
                  });
                }
                // Cap logic
                else if (meshName.toLowerCase().includes("cap") || meshName.toLowerCase().includes("hat")) {
                  materials.forEach((mat: any, i) => {
                    const newMat = mat.clone();
                    newMat.color.set("#000000"); // Black Cap
                    if (newMat.map) newMat.map = null;
                    if (Array.isArray(mesh.material)) {
                      mesh.material[i] = newMat;
                    } else {
                      mesh.material = newMat;
                    }
                  });
                }
                // Glasses/Eyes logic - FORCE VISIBILITY
                else if (meshName === "EYEs001" || meshName.toLowerCase().includes("glass") || meshName.toLowerCase().includes("spectacles")) {
                  materials.forEach((mat: any, i) => {
                    // Use standard material with emissive to force it to show up white/silver
                    const newMat = new THREE.MeshStandardMaterial({
                      color: "#FFFFFF", // White base
                      emissive: "#C0C0C0", // Silver glow
                      emissiveIntensity: 1.5,
                      metalness: 1.0,
                      roughness: 0,
                    });
                    if (Array.isArray(mesh.material)) {
                      mesh.material[i] = newMat;
                    } else {
                      mesh.material = newMat;
                    }
                  });
                  mesh.visible = true;
                }

                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;
              }
            });
            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            character!.getObjectByName("footR")!.position.y = 3.36;
            character!.getObjectByName("footL")!.position.y = 3.36;

            // Monitor scale is handled by GsapScroll.ts animations

            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
