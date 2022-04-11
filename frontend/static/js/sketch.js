import  fragmentShader  from '../shaders/fragment.js';
import '../js/three.js';
const canvas = document.querySelector('#cc');
let scene,camera,renderer;
let uniforms;
init();
animate();

function init() {
        camera = new THREE.OrthographicCamera(
              -1, // left
              1, // right
              1, // top
              -1, // bottom
              -1, // near,
              1, // far
        );
        scene = new THREE.Scene();
        const plane = new THREE.PlaneGeometry(2, 2);
        uniforms = {
          iTime: {value: 0},
          iResolution: { value: new THREE.Vector3()},
        }
        const material = new THREE.ShaderMaterial({
          uniforms: uniforms,
          fragmentShader
          });
        const mesh = new THREE.Mesh(plane, material)
        scene.add(mesh);
        if(canvas != null){

          renderer = new THREE.WebGLRenderer({canvas});
          renderer.setPixelRatio(window.devicePixelRatio);
        }
        //onWindowResize();
        //window.addEventListener('resize',onWindowResize);

}
// function onWindowResize(){
//   renderer.setSize(window.innerWidth,window.innerHeight);
// }      

function animate(){
  console.log("canvas null");
  if(canvas!=null){
    console.log("success");
    requestAnimationFrame(animate);
    uniforms['iTime'].value = performance.now()/1000;
    uniforms['iResolution'].value.set(canvas.width,canvas.height); 
    renderer.render(scene,camera);
  }
}
requestAnimationFrame(animate);
export default class As{
  static mmm(){
    init();
    animate();
  }
}
