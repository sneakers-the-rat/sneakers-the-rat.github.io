/* testing cloth simulation */
var pinsFormation = [];
var pins = [6];
pinsFormation.push(pins);
pins = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
pinsFormation.push(pins);
pins = [0];
pinsFormation.push(pins);
pins = []; // cut the rope ;)
pinsFormation.push(pins);
pins = [0, cloth.w]; // classic 2 pins
pinsFormation.push(pins);
pins = pinsFormation[1];

function togglePins() {
    pins = pinsFormation[~~(Math.random() * pinsFormation.length)];
}

var container, stats;


var mesh;

var camera, scene, renderer;

var mouseX = 0,
    mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var object;

var head;

var cmesh;

const ctx = document.createElement('canvas').getContext('2d');

var sphere;
var clothGeometry;
init();
animate();

function initGraphics() {
	var container = document.createElement('div');
    $("#scanlines").append(container);
    // document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
    //camera.position.z = 250;
    //camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.set(100, 50, 400);

    // scene

    scene = new THREE.Scene();
    //scene.background = new THREE.Color( 0xcce0ff);
    scene.fog = new THREE.Fog(0xcce0ff, 500, 10000);

    scene.add(new THREE.AmbientLight(0x666666));
    var light = new THREE.DirectionalLight(0xdfebff, 1);
    light.position.set(50, 200, 100);
    light.position.multiplyScalar(1.3);
    light.castShadow = true;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    var d = 300;
    light.shadow.camera.left = -d;
    light.shadow.camera.right = d;
    light.shadow.camera.top = d;
    light.shadow.camera.bottom = -d;
    light.shadow.camera.far = 1000;
    scene.add(light);
    scene.add(camera);

    // renderer
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.shadowMap.enabled = true;
    // controls
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = Math.PI * 0.5;
    controls.minDistance = 200;
    controls.maxDistance = 5000;
    document.addEventListener('mousemove', onDocumentMouseMove, false);

    //

    window.addEventListener('resize', onWindowResize, false);



}

function loadObjects() {

    function onProgress(xhr) {

        if (xhr.lengthComputable) {

            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log('model ' + Math.round(percentComplete, 2) + '% downloaded');

        }

    }

    function onError() {}

    var loader = new THREE.OBJLoader();


    loader.load('head.OBJ', function(obj) {
        head = obj;


        geometry = head.children[0].geometry;

        setupAttributes(geometry);

        // material = new THREE.ShaderMaterial( {
        //     uniforms: {},
        //     vertexShader: document.getElementById( 'vertexShader' ).textContent,
        //     fragmentShader: document.getElementById( 'fragmentShader' ).textContent
        // } );

        material = new THREE.MeshNormalMaterial({
            //color: 0xffffff,
            wireframe: true
        });

        mesh = new THREE.Mesh(geometry, material);
        mesh.scale.set(100, 100, 100);
        mesh.rotation.x = Math.PI;
        scene.add(mesh);
        //secondstage(mesh);

    }, onProgress, onError);


    var loader2 = new THREE.TextureLoader();
    var clothTexture = loader2.load('flag.png');
    clothTexture.anisotropy = 16;
    // ctx.canvas.width = 256;
    // ctx.canvas.height = 256;
    // ctx.fillStyle = '#FFF';
    // ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // const cvstexture = new THREE.CanvasTexture(ctx.canvas);
    var clothMaterial = new THREE.MeshLambertMaterial({
        map: clothTexture,
        // map: cvstexture,
        side: THREE.DoubleSide,
        alphaTest: 0.5
    });
    // cloth geometry
    clothGeometry = new THREE.ParametricBufferGeometry(clothFunction, cloth.w, cloth.h);
    // cloth mesh
    object = new THREE.Mesh(clothGeometry, clothMaterial);
    object.scale.set(1, 1, 1);
    object.position.set(0, 0, 0);
    object.castShadow = true;
    scene.add(object);
    object.customDepthMaterial = new THREE.MeshDepthMaterial({
        depthPacking: THREE.RGBADepthPacking,
        map: clothTexture,
        alphaTest: 0.5
    });

    // sphere
    var ballGeo = new THREE.SphereBufferGeometry(ballSize, 32, 16);
    var ballMaterial = new THREE.MeshLambertMaterial();
    sphere = new THREE.Mesh(ballGeo, ballMaterial);
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    scene.add(sphere);

    sphere.visible = !true;

}


function init() {

    initGraphics();

    loadObjects();


}



function setupAttributes(geometry) {

    // TODO: Bring back quads

    var vectors = [
        new THREE.Vector3(1, 0, 0),
        new THREE.Vector3(0, 1, 0),
        new THREE.Vector3(0, 0, 1)
    ];

    var position = geometry.attributes.position;
    var centers = new Float32Array(position.count * 3);

    for (var i = 0, l = position.count; i < l; i++) {

        vectors[i % 3].toArray(centers, i * 3);

    }

    geometry.addAttribute('center', new THREE.BufferAttribute(centers, 3));

}

function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function onDocumentMouseMove(event) {

    mouseX = (event.clientX - windowHalfX) / 2;
    mouseY = (event.clientY - windowHalfY) / 2;

}

//

function animate() {

    requestAnimationFrame(animate);

    var time = Date.now();
    var windStrength = Math.cos(time / 7000) * 20 + 40;
    windForce.set(Math.sin(time / 2000), Math.cos(time / 3000), Math.sin(time / 1000))
    windForce.normalize()
    windForce.multiplyScalar(windStrength);
    simulate(time);
    render();

}

function render() {

    camera.position.x += (mouseX - camera.position.x) * .05;
    camera.position.y += (-mouseY - camera.position.y) * .05;

    camera.lookAt(scene.position);


    var p = cloth.particles;
    for (var i = 0, il = p.length; i < il; i++) {
        var v = p[i].position;
        clothGeometry.attributes.position.setXYZ(i, v.x, v.y, v.z);
    }
    clothGeometry.attributes.position.needsUpdate = true;
    clothGeometry.computeVertexNormals();
    sphere.position.copy(ballPosition);
    renderer.render(scene, camera);

}