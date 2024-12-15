'use client';
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
var MODEL = './models/Laptop.glb';
export default function Laptop3D(_a) {
    var _b = _a.width, width = _b === void 0 ? 400 : _b, _c = _a.height, height = _c === void 0 ? 400 : _c;
    var mountRef = useRef(null);
    var modelRef = useRef(null);
    var _d = useState(null), model = _d[0], setModel = _d[1];
    useEffect(function () {
        if (!mountRef.current)
            return;
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 1000);
        var renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(width, height);
        mountRef.current.appendChild(renderer.domElement);
        // Lighting
        var ambientLight = new THREE.AmbientLight(0x404040);
        scene.add(ambientLight);
        var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);
        // Load the GLTF model
        var loader = new GLTFLoader();
        var dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('/draco/');
        loader.setDRACOLoader(dracoLoader);
        loader.load(MODEL, function (gltf) {
            var loadedModel = gltf.scene;
            scene.add(loadedModel);
            modelRef.current = loadedModel;
        }, undefined, function (error) {
            console.error('An error occurred loading the model:', error);
        });
        camera.position.z = 10;
        camera.position.y = .5;
        function animate() {
            requestAnimationFrame(animate);
            var model = modelRef === null || modelRef === void 0 ? void 0 : modelRef.current;
            if (model) {
                model.rotation.y += 0.005;
            }
            renderer.render(scene, camera);
        }
        animate();
        return function () {
            var _a;
            (_a = mountRef.current) === null || _a === void 0 ? void 0 : _a.removeChild(renderer.domElement);
            var model = modelRef === null || modelRef === void 0 ? void 0 : modelRef.current;
            if (model) {
                scene.remove(model);
            }
        };
    }, [width, height]);
    return <div ref={mountRef}/>;
}
