// Only locally built dynamic unit/facility trees. Never terrain or shared GLB assets.
export function disposeDynamicTree(root){
 if(!root)return;const geometries=new Set(),materials=new Set(),textures=new Set();
 root.traverse(o=>{if(o.isMesh&&o.geometry)geometries.add(o.geometry);for(const m of(Array.isArray(o.material)?o.material:o.material?[o.material]:[])){materials.add(m);if(m.map)textures.add(m.map);}});
 for(const x of textures)x.dispose();for(const x of materials)x.dispose();for(const x of geometries)x.dispose();
}
