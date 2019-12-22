
import * as THREE from '/about/js/three.module.js';

import Stats from '/about/jsm/libs/stats.module.js';

import { OrbitControls } from '/about/jsm/controls/OrbitControls.js';
import { NormalMapShader } from '/about/jsm/shaders/NormalMapShader.js';
import { TerrainShader } from '/about/jsm/shaders/TerrainShader.js';
// import { ToonShader } from '/about/jsm/shaders/ToonShader.js';
import { BufferGeometryUtils } from '/about/jsm/utils/BufferGeometryUtils.js';

var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;

var renderer, container, stats;

var camera, scene, controls;
var cameraOrtho, sceneRenderTarget;

var uniformsNoise, uniformsNormal, uniformsTerrain,
	heightMap, normalMap,
	quadTarget;

var directionalLight, pointLight;

var terrain;
var terrainMaterial;

var animDelta = 0, animDeltaDir = 1;
var lightVal = 0, lightDir = 1;

var clock = new THREE.Clock();

var updateNoise = true;

var mlib = {};

var video, vidTexture;

init();
animate();

function init() {

	container = document.getElementById( 'container' );

	// SCENE (RENDER TARGET)

	sceneRenderTarget = new THREE.Scene();

	cameraOrtho = new THREE.OrthographicCamera( SCREEN_WIDTH / - 2, SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, SCREEN_HEIGHT / - 2, - 10000, 10000 );
	cameraOrtho.position.z = 100;

	sceneRenderTarget.add( cameraOrtho );

	// CAMERA

	camera = new THREE.PerspectiveCamera( 40, SCREEN_WIDTH / SCREEN_HEIGHT, 2, 4000 );
	camera.position.set( - 1200, 800, 1200 );

	// SCENE (FINAL)

	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x000000);
	scene.fog = new THREE.Fog( 0x000000,1000, 4000 );

	// LIGHTS

	// scene.add( new THREE.AmbientLight( 0x111111 ) );

	directionalLight = new THREE.DirectionalLight( 0xffffff, 1.15 );
	directionalLight.position.set( 500, 2000, 0 );
	scene.add( directionalLight );

	pointLight = new THREE.PointLight( 0x000000, 1.5 );
	pointLight.position.set( 0, 0, 0 );
	scene.add( pointLight );

	// HEIGHT + NORMAL MAPS

	var normalShader = NormalMapShader;

	var rx = 256, ry = 256;
	var pars = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBFormat };

	heightMap = new THREE.WebGLRenderTarget( rx, ry, pars );
	heightMap.texture.generateMipmaps = false;

	normalMap = new THREE.WebGLRenderTarget( rx, ry, pars );
	normalMap.texture.generateMipmaps = false;

	uniformsNoise = {

		"time": { value: 1.0 },
		"scale": { value: new THREE.Vector2( 1.5, 1.5 ) },
		"offset": { value: new THREE.Vector2( 0, 0 ) }

	};

	uniformsNormal = THREE.UniformsUtils.clone( normalShader.uniforms );

	uniformsNormal[ "height" ].value = 0.05;
	uniformsNormal[ "resolution" ].value.set( rx, ry );
	uniformsNormal[ "heightMap" ].value = heightMap.texture;

	var vertexShader = document.getElementById( 'vertexShader' ).textContent;

	// TEXTURES

	var loadingManager = new THREE.LoadingManager( function () {

		terrain.visible = true;

	} );
	var textureLoader = new THREE.TextureLoader( loadingManager );

	// Video texture
	video = document.getElementById( 'video' );
	// video.play();
	vidTexture = new THREE.VideoTexture( video );

	var specularMap = new THREE.WebGLRenderTarget( 2048, 2048, pars );
	specularMap.texture.generateMipmaps = false;

	var diffuseTexture1 = textureLoader.load( "textures/terrain/stripes.png" );
	var diffuseTexture2 = textureLoader.load( "textures/terrain/stripes_inv.png" );
	// var detailTexture = textureLoader.load( "textures/terrain/grasslight-small-nm.jpg" );
	var detailTexture = textureLoader.load( "textures/terrain/white_detail.jpg" );

	vidTexture.wrapS = vidTexture.wrapT = THREE.RepeatWrapping;
	diffuseTexture1.wrapS = diffuseTexture1.wrapT = THREE.RepeatWrapping;
	diffuseTexture2.wrapS = diffuseTexture2.wrapT = THREE.RepeatWrapping;
	detailTexture.wrapS = detailTexture.wrapT = THREE.RepeatWrapping;
	specularMap.texture.wrapS = specularMap.texture.wrapT = THREE.RepeatWrapping;

	// TERRAIN SHADER

	var terrainShader = TerrainShader;

	uniformsTerrain = THREE.UniformsUtils.clone( terrainShader.uniforms );

	uniformsTerrain[ 'tNormal' ].value = normalMap.texture;
	uniformsTerrain[ 'uNormalScale' ].value = 3.5;

	uniformsTerrain[ 'tDisplacement' ].value = heightMap.texture;

	uniformsTerrain[ 'tDiffuse1' ].value = diffuseTexture1;
	// uniformsTerrain[ 'tDiffuse1' ].value = vidTexture;
	uniformsTerrain[ 'tDiffuse2' ].value = diffuseTexture2;
	uniformsTerrain[ 'tDiffuse2' ].value = vidTexture;
	uniformsTerrain[ 'tSpecular' ].value = specularMap.texture;
	uniformsTerrain[ 'tDetail' ].value = detailTexture;
	 // uniformsTerrain[ 'tDetail' ].value = vidTexture;

	uniformsTerrain[ 'enableDiffuse1' ].value = true;
	uniformsTerrain[ 'enableDiffuse2' ].value = true;
	uniformsTerrain[ 'enableSpecular' ].value = true;

	uniformsTerrain[ 'diffuse' ].value.setHex( 0xffffff);
	uniformsTerrain[ 'specular' ].value.setHex( 0xffffff );

	uniformsTerrain[ 'shininess' ].value = 50;

	uniformsTerrain[ 'uDisplacementScale' ].value = 375;

	uniformsTerrain[ 'uRepeatOverlay' ].value.set( 1, 1);

	var params = [
		[ 'heightmap', 	document.getElementById( 'fragmentShaderNoise' ).textContent, 	vertexShader, uniformsNoise, false ],
		[ 'normal', 	normalShader.fragmentShader, normalShader.vertexShader, uniformsNormal, false ],
		[ 'terrain', 	terrainShader.fragmentShader, terrainShader.vertexShader, uniformsTerrain, true ]
	 ];

	for ( var i = 0; i < params.length; i ++ ) {

		var material = new THREE.ShaderMaterial( {

			uniforms: params[ i ][ 3 ],
			vertexShader: params[ i ][ 2 ],
			fragmentShader: params[ i ][ 1 ],
			lights: params[ i ][ 4 ],
			fog: true
		} );

		mlib[ params[ i ][ 0 ] ] = material;

	}


	var plane = new THREE.PlaneBufferGeometry( SCREEN_WIDTH, SCREEN_HEIGHT );

	quadTarget = new THREE.Mesh( plane, new THREE.MeshBasicMaterial( { color: 0x000000 } ) );
	quadTarget.position.z = - 500;
	sceneRenderTarget.add( quadTarget );

	// TERRAIN MESH

	var geometryTerrain = new THREE.PlaneBufferGeometry( 6000, 6000, 256, 256 );
	// geometryTerrain

	BufferGeometryUtils.computeTangents( geometryTerrain );
	
	// var terrainUniforms = { 'widthFactor': { value: 1 } };
	// terrainMaterial = new THREE.ShaderMaterial({
	// 	uniforms: terrainUniforms,
	// 	vertexShader: document.getElementById( 'vertexShader' ).textContent,
	// 	fragmentShader: document.getElementById( 'fragmentShaderNoise' ).textContent,
	// 	side: THREE.DoubleSide
	// });

	// material.extensions.derivatives = true;
	// setupAttributes( geometryTerrain);

	terrain = new THREE.Mesh( geometryTerrain, mlib[ 'terrain' ] );
	// terrain = new THREE.Mesh( geometryTerrain, terrainMaterial);
	terrain.position.set( 0, - 125, 0 );
	terrain.rotation.x = - Math.PI / 2;
	// terrain.visible = false;
	terrain.visible = true;
	scene.add( terrain );

	// RENDERER

	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
	container.appendChild( renderer.domElement );



	// CONTROLS

	controls = new OrbitControls( camera, renderer.domElement );

	controls.rotateSpeed = 1.0;
	controls.zoomSpeed = 1.2;
	controls.panSpeed = 0.8;

	controls.keys = [ 65, 83, 68 ];

	// STATS

	// stats = new Stats();
	// container.appendChild( stats.dom );

	// EVENTS

	onWindowResize();

	window.addEventListener( 'resize', onWindowResize, false );

	document.addEventListener( 'keydown', onKeyDown, false );

}

//


function setupAttributes( geometry ) {
	var vectors = [
		new THREE.Vector3( 1, 0, 0 ),
		new THREE.Vector3( 0, 1, 0 ),
		new THREE.Vector3( 0, 0, 1 )
	];
	var position = geometry.attributes.position;
	var centers = new Float32Array( position.count * 3 );
	for ( var i = 0, l = position.count; i < l; i ++ ) {
		vectors[ i % 3 ].toArray( centers, i * 3 );
	}
	geometry.setAttribute( 'center', new THREE.BufferAttribute( centers, 3 ) );
}

function onWindowResize() {

	SCREEN_WIDTH = window.innerWidth;
	SCREEN_HEIGHT = window.innerHeight;

	renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );

	camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
	camera.updateProjectionMatrix();

}

//

function onKeyDown( event ) {

	switch ( event.keyCode ) {

		case 78: /*N*/ lightDir *= - 1; break;
		case 77: /*M*/ animDeltaDir *= - 1; break;

	}

}

//

function animate() {

	requestAnimationFrame( animate );

	render();
	// stats.update();

}

function render() {

	var delta = clock.getDelta();

	if ( terrain.visible ) {

		var fLow = 0.1, fHigh = 0.8;

		lightVal = THREE.Math.clamp( lightVal + 0.5 * delta * lightDir, fLow, fHigh );

		var valNorm = ( lightVal - fLow ) / ( fHigh - fLow );

		//scene.background.setHSL( 0.1, 0.5, lightVal );
		//scene.fog.color.setHSL( 0, 0.5, lightVal );

		directionalLight.intensity = THREE.Math.mapLinear( valNorm, 0, 1, 0.1, 1.15 );
		pointLight.intensity = THREE.Math.mapLinear( valNorm, 0, 1, 0.9, 1.5 );

		uniformsTerrain[ 'uNormalScale' ].value = THREE.Math.mapLinear( valNorm, 0, 1, 0.6, 3.5 );

		if ( updateNoise ) {

			animDelta = THREE.Math.clamp( animDelta + 0.00075 * animDeltaDir, 0, 0.05 );
			uniformsNoise[ 'time' ].value += delta * animDelta;

			uniformsNoise[ 'offset' ].value.x += delta * 0.05;

			// uniformsTerrain[ 'uOffset' ].value.y = 4 * uniformsNoise[ 'offset' ].value.x;

			quadTarget.material = mlib[ 'heightmap' ];
			renderer.setRenderTarget( heightMap );
			renderer.clear();
			renderer.render( sceneRenderTarget, cameraOrtho );

			quadTarget.material = mlib[ 'normal' ];
			renderer.setRenderTarget( normalMap );
			renderer.clear();
			renderer.render( sceneRenderTarget, cameraOrtho );

		}

		renderer.setRenderTarget( null );
		renderer.render( scene, camera );

	}

}
