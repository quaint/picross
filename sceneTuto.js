function createSceneTuto (engine) {
	var scene = new BABYLON.Scene(engine);

//	var light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(0, 100, -100), scene);
//	light.diffuse = new BABYLON.Color3(1, 0, 0);
//	light.specular = new BABYLON.Color3(1, 1, 1);

    var light0 = new BABYLON.HemisphericLight("Hemi0", new BABYLON.Vector3(0.2, 1.0, 0.8), scene);
//    var light0 = new BABYLON.DirectionalLight("Dir0", new BABYLON.Vector3(0.2, -1.0, 0.8), scene);
    light0.diffuse = new BABYLON.Color3(1, 1, 1);
    light0.specular = new BABYLON.Color3(0.7, 0.7, 0.7);
    light0.groundColor = new BABYLON.Color3(0.5, 0.5, 0.5);


	var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 100, new BABYLON.Vector3.Zero(), scene);

    var material0 = new BABYLON.StandardMaterial("material1", scene);
    material0.alpha = 1.0;
    var material1 = new BABYLON.StandardMaterial("material1", scene);
    material1.alpha = 0.8;
    var material2 = new BABYLON.StandardMaterial("material2", scene);
    material2.alpha = 0.5;

    //material1.wireframe = true;

    var hiddenLevelY = 0;
    var arrowYUp = BABYLON.Mesh.CreateCylinder("arrowYUp", 1.0, 0.0, 1.0, 7.0, scene);
    var arrowYDown = BABYLON.Mesh.CreateCylinder("arrowYDown", 1.0, 1.0, 0.0, 7.0, scene);
    arrowYDown.parent = arrowYUp;
    arrowYDown.position.y = 1.5;
    arrowYUp.position.x = 10.0;
    arrowYUp.position.z = 10.0;
    arrowYUp.position.y = 9.25;

    var boxes = {};
    var destroying = false;
    var marking = false;

//    var point = BABYLON.Mesh.CreateSphere("sphere", 4, 4, scene);

    var mainBox = BABYLON.Mesh.CreateBox("mainBox", 1, scene);
    mainBox.isVisible = false;
    mainBox.position.y = -7.5;
    mainBox.position.x = -7.5;
    mainBox.position.z = -7.5;

    var size = 5.0;
//    var arrayx = [];
    for (var k=0; k<4; k++) {
//        var arrayy = [];
        for (var j=0; j<4; j++) {
//            var arrayz = [];
            for (var i=0; i<4; i++) {
                var ident = "Box" + i + j + k
                var box = BABYLON.Mesh.CreateBox(ident, size, scene);
                box.parent = mainBox;
                boxes[ident] = {mesh: box, canBeDestroyed: Math.random() > 0.5, destroyed: false, marked: false};
//                box.material = material1;
                box.position = new BABYLON.Vector3(k * size, j * size, i * size);
//                box.material = material2;
//                arrayz.push(box);
            }
//            arrayy.push(arrayz);
        }
//        arrayx.push(arrayy);
    }

    window.addEventListener("keyup", function (evt) {
        if (evt.keyCode == 81) {
            destroying = false;
        }
        if (evt.keyCode == 87) {
            marking = false;
        }
//        console.log(evt.keyCode + " marking: " + marking + " destroying: " + destroying);
    });

    window.addEventListener("keydown", function (evt) {
        destroying = (evt.keyCode == 81);
        marking = (evt.keyCode == 87);
//        console.log(evt.keyCode + " marking: " + marking + " destroying: " + destroying);
    });

    window.addEventListener("click", function (evt) {
        console.log(" marking: " + marking + " destroying: " + destroying);
        var pickResult = scene.pick(evt.clientX, evt.clientY);
        if (pickResult.hit) {
            if (pickResult.pickedMesh.name == "arrowYUp" || pickResult.pickedMesh.name == "arrowYDown") {
                for (var k=0; k<4; k++) {
                    for (var j=0; j<4; j++) {
                        for (var i=0; i<4; i++) {
                            if (j == hiddenLevelY) {
                                var ident = "Box" + i + j + k
                                var boxObj = boxes[ident];
                                if (pickResult.pickedMesh.name == "arrowYDown") {
                                    boxObj.mesh.isVisible = false;
                                } else {
                                    if (!boxObj.destroyed || (boxObj.destroyed && !boxObj.canBeDestroyed)) {
                                        boxObj.mesh.isVisible = true;                                        
                                    }
                                }
                            }
                        }
                    }
                }
                if (pickResult.pickedMesh.name == "arrowYDown") {
                    hiddenLevelY++;
                } else {
                    hiddenLevelY--;
                }
                console.log(hiddenLevelY);
            }
            //pickResult.pickedMesh.material = material1;
            //pickResult.pickedMesh.dispose();
            if (marking) {
                boxes[pickResult.pickedMesh.name].marked = !boxes[pickResult.pickedMesh.name].marked;
                if (boxes[pickResult.pickedMesh.name].marked) {
                    //unamrk
                    pickResult.pickedMesh.material = material2;
                } else {
                    //mark
                    pickResult.pickedMesh.material = material0;
                }
            } else if (destroying  && !boxes[pickResult.pickedMesh.name].marked) {
                boxes[pickResult.pickedMesh.name].destroyed = true;
                if (boxes[pickResult.pickedMesh.name].canBeDestroyed) {
                    //hide
                    pickResult.pickedMesh.isVisible = false;
                } else {
                    //cracked
                    pickResult.pickedMesh.material = material1;
                }
            }
        }

    });

//    scene.gravity = new BABYLON.Vector3(0, -9.81, 0);
//    camera.applyGravity = true;
//    camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);
//    scene.collisionsEnabled = true;

	//var box1 = BABYLON.Mesh.CreateBox("Box1", 6.0, scene);
	//var box2 = BABYLON.Mesh.CreateBox("Box2", 6.0, scene);
	//var box3 = BABYLON.Mesh.CreateBox("Box3", 6.0, scene);
	//var box4 = BABYLON.Mesh.CreateBox("Box4", 6.0, scene);
	//var box5 = BABYLON.Mesh.CreateBox("Box5", 6.0, scene);

//	var sphere1 = BABYLON.Mesh.CreateSphere("Sphere1", 10.0, 6.0, scene);
//	var sphere2 = BABYLON.Mesh.CreateSphere("Sphere2", 2.0, 7.0, scene);
//	var sphere3 = BABYLON.Mesh.CreateSphere("Sphere3", 10.0, 8.0, scene);

//	var spriteManagerPlayer = new BABYLON.SpriteManager("playerManagr","player.png", 2, 64, scene);
//	var playerInstance = new BABYLON.Sprite("player", spriteManagerPlayer);
//	playerInstance.position.y = 20;
//	playerInstance.position.x = 20;
//	playerInstance.playAnimation(0, 40, true, 100);

	//var plane = BABYLON.Mesh.CreatePlane("Plane", 50.0, scene);
	//var cylinder = BABYLON.Mesh.CreateCylinder("Cylinder", 3, 3, 3, 16, scene, false);
	//var torus = BABYLON.Mesh.CreateTorus("Torus", 5, 1, 20, scene, false);

//	sphere1.position.x = -40;
//	sphere2.position.x = -30;

//	var materialSphere1 = new BABYLON.StandardMaterial("texture1", scene);
//	materialSphere1.alpha = 0.5;
//	materialSphere1.diffuseTexture = new BABYLON.Texture("grass.jpg", scene);
	// materialSphere1.wireframe = true;
	//materialSphere1.diffuseTexture.uScale = 5.0;
	//materialSphere1.diffuseTexture.vScale = 5.0;
//	sphere1.material = materialSphere1;

//	var animation1 = new BABYLON.Animation("tutoAnimation1", "scaling.x", 30,
//		BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
//	var animation2 = new BABYLON.Animation("tutoAnimation2", "position.y", 30,
//		BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
//	var animation3 = new BABYLON.Animation("tutoAnimation3", "material.alpha", 30,
//		BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

//	var keys1 = [];
//	keys1.push({frame:0, value:1});
//	keys1.push({frame:20, value:0.2});
//	keys1.push({frame:100, value:1});
//
//	var keys2 = [];
//	keys2.push({frame:0, value:0});
//	keys2.push({frame:20, value:30});
//	keys2.push({frame:100, value:0});
//
//	var keys3 = [];
//	keys3.push({frame:0, value:0});
//	keys3.push({frame:20, value:1});
//	keys3.push({frame:100, value:0});

//	animation1.setKeys(keys1);
//	animation2.setKeys(keys2);
//	animation3.setKeys(keys3);
//	sphere1.animations.push(animation1);
//	sphere1.animations.push(animation2);
//	sphere1.animations.push(animation3);
//
//	scene.beginAnimation(sphere1, 0, 100, true);
//	scene.beginAnimation(sphere1, 0, 100, true);

	// box1.position = new BABYLON.Vector3(-20, 0, 0);
	// box2.position.x = -10;
	// box3.position.x = 0;
	// box4.position.x = 10;
	// box5.position.x = 20;

	// box1.rotation.x = Math.PI/4;
	// box2.rotation.y = Math.PI/6;
	// box3.scaling.x = 1.5;
	// box4.scaling.y = 1.5;
	// box5.parent = box1;
	// box5.position.z = -10;

	//sphere.position = new BABYLON.Vector3(-10, -10, 0);
	//cylinder.position = new BABYLON.Vector3(10, 0, 0);
	//torus.position = new BABYLON.Vector3(10, 10, 0);
	//plane.position = new BABYLON.Vector3(0, 0, 10);

	return scene;
}