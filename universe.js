var scene;
function bigBang(){
	var camera, renderer, cameraControls, headlight;
	var sunGeometry, sunMaterial, sunMesh, planetGeometry, planetMaterial, planetMesh, planet;
	var clock = new THREE.Clock();
	init();
	animate();

	function init() {

		renderer = new THREE.CanvasRenderer();
		renderer.setClearColorHex( 0x000000, 1.0 );
		renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.gammaInput = true;
		renderer.gammaOutput = true;
		headlight = new THREE.PointLight(0xffffff,10.0,100);
		camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
		camera.position.z = 800;
		camera.position.x = 400;
		camera.position.y = 200;
		cameraControls = new THREE.OrbitAndPanControls(camera, renderer.domElement);
        cameraControls.target.set(0,0,0);
		scene = new THREE.Scene();
		scene.add(headlight);
		//Coordinates.drawAllAxes({axisLength:200,axisRadius:1,axisTess:50});
		createSun();
		createPlanet();

		

		document.body.appendChild( renderer.domElement );

	}

	function createSun(){
		sunGeometry = new THREE.SphereGeometry();
		sunMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: true } );

		sunMesh = new THREE.Mesh( sunGeometry, sunMaterial );
		scene.add( sunMesh );
	}

	function createPlanet(){
		planetGeometry = new THREE.SphereGeometry(20);
		planetMaterial = new THREE.MeshBasicMaterial({ color:0x00ff00, wireframe: true});
		planetMesh = new THREE.Mesh(planetGeometry, planetMaterial );
		planet = new THREE.Object3D();
		planet.add(planetMesh);
		planetMesh.position.x = 550;
		scene.add( planet );
	}
	function animate() {

		// note: three.js includes requestAnimationFrame shim
		requestAnimationFrame( animate );

		sunMesh.rotation.y += 0.01;
		planetMesh.rotation.y += 0.05;
		planet.rotation.y += 0.01;
		var delta = clock.getDelta();
		cameraControls.update(delta);
		headlight.position.set(0,0,0);
		renderer.render( scene, camera );

	}
}