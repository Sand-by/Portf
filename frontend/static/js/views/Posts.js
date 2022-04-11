import AbstractView from "./AbstractView.js";
import  fragmentShader  from '../../shaders/fragment_2.js';
import '../three.js';

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Posts");
    }
    
    async getHtml() {
        return `
        <div class="post">
            <h1>Posts</h1>
            <p>You are viewing the posts!</p>
        </div>
            <canvas id ="cc" width="400" height="400"></canvas>
            <canvas id ="cd" width="400" height="400"></canvas>
            <canvas id ="cd" width="400" height="400"></canvas>
            <canvas id ="cd" width="400" height="400"></canvas>
            <canvas id ="cd" width="400" height="400"></canvas>


        `;
    }
    
    async afterRender() {
        const canvas = document.querySelectorAll('#cc');
        let scene,camera,renderer;
        let uniforms;
        var mouse = new THREE.Vector2();
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
                  iResolution: { value: new THREE.Vector2()},
                  iMouse: {value: new THREE.Vector2()}
                }
                const material = new THREE.ShaderMaterial({
                  uniforms: uniforms,
                  fragmentShader
                  });
                const mesh = new THREE.Mesh(plane, material)
                scene.add(mesh);
                renderer = new THREE.WebGLRenderer({canvas: canvas[0]});

                renderer.setPixelRatio(window.devicePixelRatio);

                onWindowResize();
                window.addEventListener('resize',onWindowResize);
                window.addEventListener('mousemove',onMouseMove);
                //window.addEventListener( 'mousemove', onMouseMove, false );

        
        }
        function onWindowResize(){
          renderer.setSize(window.innerWidth,window.innerHeight);
        }      
        function onMouseMove( event ) {

            // calculate mouse position in normalized device coordinates
            // (-1 to +1) for both components

            mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
            mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
            uniforms['iMouse'].value.set(mouse.x,mouse.y);
        }
        function animate(){
            requestAnimationFrame(animate);
            uniforms['iTime'].value = performance.now()/1000;
            uniforms['iResolution'].value.set(window.innerWidth,window.innerHeight); 
            uniforms['iMouse'].value.set(mouse.x,mouse.y);
            renderer.render(scene,camera);
        }
    }
}


