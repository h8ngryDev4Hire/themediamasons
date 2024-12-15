'use client';
import React from 'react';
import * as THREE from 'three';
export default function ThreeObject(_a) {
    var mountRef = React.useRef(null);
    React.useEffect(function () {
        if (!mountRef.current)
            return;
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(30, 400 / 400, 0.1, 1000);
        var renderer = new THREE.WebGLRenderer({
            alpha: true,
        });
        renderer.setSize(400, 400);
        mountRef.current.appendChild(renderer.domElement);
        var geometry = new THREE.BoxGeometry();
        var material = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            wireframe: true
        });
        var cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
        camera.position.z = 5;
        var animate = function () {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
        };
        animate();
        return function () {
            var _a;
            (_a = mountRef.current) === null || _a === void 0 ? void 0 : _a.removeChild(renderer.domElement);
        };
    }, []);
    return <div ref={mountRef}></div>;
}
