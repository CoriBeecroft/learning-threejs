import * as THREE from 'three';
import * as threeOrbitControls from 'three-orbit-controls';
// OrbitControls = OrbitControls(THREE);
var OrbitControls = threeOrbitControls(THREE)
console.log(OrbitControls);
var camera, scene, renderer, controls;
var sphereMesh;
var cubeMesh;
var zDirection = 1;
var textureIndex = 0;
var textures = [];
var material1;
var boxes = [];

init();
animate();

document.getElementsByTagName('body')[0].onkeypress = function() {
    textureIndex++;
    textureIndex %= textures.length;
    material1 = new THREE.MeshBasicMaterial({map: textures[textureIndex]}); 

    for(var i=0; i<boxes.length; i++)
        boxes[i].material = material1;
};

function init() {
    textures.push(new THREE.TextureLoader().load( './images/Middle.png' ));
    textures.push(new THREE.TextureLoader().load( './images/Explosion4.png' ));
    textures.push(new THREE.TextureLoader().load( './images/Battleship.png' ));
    textures.push(new THREE.TextureLoader().load( './images/crate.gif' ));
    textures.push(new THREE.TextureLoader().load( './images/envmap.png' ));
    textures.push(new THREE.TextureLoader().load( './images/water.jpg' ));

    material1 = new THREE.MeshBasicMaterial( {map: textures[textureIndex]});

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 5000 );
    camera.position.z = 7*50;
    camera.position.x = 500;
    camera.position.y = -1000;


    controls = new OrbitControls( camera );

    scene = new THREE.Scene();
    scene.background = new THREE.Color();

    var geometry = new THREE.SphereBufferGeometry( 500, 100, 100);
    var material = new THREE.MeshBasicMaterial();
    material.color = new THREE.Color("hsl(194, 25%, 38%)");
    material.transparent = true;
    material.opacity = 0.25;

    sphereMesh = new THREE.Mesh( geometry, material );
    scene.add(sphereMesh);	


    sphereMesh.position.x = 0;
    let totalX = 0;
    const setTotalX = newTotalX => { totalX = newTotalX }
    for(var x=0; x<25; x++) {
        const xReal = totalX + 60 + ((x%2==0)?50:0);
        totalX = xReal;
        let totalY = 0;
        for(let y=0; y<5; y++) {
            const yReal = totalY + 60 + ((y%2==0)?50:0);
            totalY = yReal;

            for(let z=0; z<Math.floor(Math.random()*20) + 1; z++) {
                var texture = [];
                var geometry1 = new THREE.BoxBufferGeometry(50, 50, 50);
                var mesh = new THREE.Mesh( geometry1, material1 );

                console.log(totalX);
                
                console.log(xReal);

                var position = new THREE.Vector3(
                    xReal, yReal, z*50
                    // Math.floor(Math.random()*1000) - 500,
                    // Math.floor(Math.random()*1000) - 500,
                    // Math.floor(Math.random()*1000) - 500
                );

                // position.normalize();
                // position.setLength(1000/* (xMath.random()*500-36) */);

                mesh.position.copy(position);


                // mesh.rotation.x = 0;//Math.random();
                //mesh.rotation.y = Math.random();
                //mesh.rotation.z = Math.random();

                cubeMesh = mesh;
                boxes.push(mesh);

                sphereMesh.add(mesh);
            }
        }
    }

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.sortObjects = true;
    document.body.appendChild( renderer.domElement );

    window.addEventListener( 'resize', onWindowResize, false );

}

function makeBox(x, y, z, totalX, setTotalX) {
    var texture = [];
    var geometry1 = new THREE.BoxBufferGeometry(50, 50, 50);
    var mesh = new THREE.Mesh( geometry1, material1 );
    const xReal = totalX + x*50 + 0*((x%2==0)?20:0);
    setTotalX(xReal);

    var position = new THREE.Vector3(
        xReal, y*60, z*50
    );

    mesh.position.copy(position);


    mesh.rotation.x = 0;
    cubeMesh = mesh;
    boxes.push(mesh);

    return mesh;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {
    requestAnimationFrame( animate );

    // mesh.rotation.x += 0.00;
    // mesh.rotation.y += 0.0;

    if(camera.position.z > 1400)
        zDirection = -1;
    else if(camera.position.z < 1000)
        zDirection = 1;

    // camera.position.z += zDirection;
    // camera.position.x += zDirection;

    renderer.render( scene, camera );
}
