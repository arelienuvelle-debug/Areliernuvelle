# 3D Models

Drop your GLB files here. File names must match product slugs exactly:

- velours.glb
- lueur.glb
- epure.glb
- noctis.glb
- sillage.glb

## Export settings (Blender → gltf 2.0)
- Format: GLB (binary)
- Include: Selected Objects, UVs, Normals, Materials, Punctual Lights
- Compression: Draco (reduces file size ~70%)
- Apply transforms before export

## Then activate in lib/products.ts
Set `modelUrl: "/models/velours.glb"` (etc.) for each product once the file is ready.
