'use client';
import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
export default function Matrix() {
    var mountRef = useRef(null);
    var scene = useState(function () { return new THREE.Scene(); })[0];
    var camera = useState(function () { return new THREE.PerspectiveCamera(50, 1, 0.1, 100); })[0];
    var renderer = useState(function () { return new THREE.WebGLRenderer({ alpha: true }); })[0];
    var _a = useState({ width: 400, height: 400 }), dimensions = _a[0], setDimensions = _a[1];
    useEffect(function () {
        if (!mountRef.current)
            return;
        var updateDimensions = function () {
            if (mountRef.current && mountRef.current.parentElement) {
                var _a = mountRef.current.parentElement, clientWidth = _a.clientWidth, clientHeight = _a.clientHeight;
                setDimensions({ width: clientWidth, height: clientHeight });
            }
        };
        var resizeObserver = new ResizeObserver(updateDimensions);
        if (mountRef.current.parentElement) {
            resizeObserver.observe(mountRef.current.parentElement);
        }
        updateDimensions(); // Initial dimension set
        return function () { return resizeObserver.disconnect(); };
    }, []);
    useEffect(function () {
        if (!mountRef.current)
            return;
        var width = dimensions.width, height = dimensions.height;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        mountRef.current.appendChild(renderer.domElement);
        var gridSize = 20;
        var spacing = 2;
        // Particle system setup
        var particleCount = 20 * gridSize * gridSize; // 20 particles per grid point
        var particleGeometry = new THREE.BufferGeometry();
        var particleMaterial = new THREE.ShaderMaterial({
            transparent: true,
            blending: THREE.AdditiveBlending,
            vertexShader: "\n        attribute float opacity;\n        varying float vOpacity;\n        void main() {\n          vOpacity = opacity;\n          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);\n          gl_PointSize = 2.0;\n          gl_Position = projectionMatrix * mvPosition;\n        }\n      ",
            fragmentShader: "\n        varying float vOpacity;\n        void main() {\n          gl_FragColor = vec4(0.0, 1.0, 0.0, vOpacity);\n        }\n      ",
        });
        var particles = new THREE.Points(particleGeometry, particleMaterial);
        scene.add(particles);
        var particlePositions = new Float32Array(particleCount * 3);
        var particleOpacities = new Float32Array(particleCount);
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
        particleGeometry.setAttribute('opacity', new THREE.BufferAttribute(particleOpacities, 1));
        // Initialize particle positions and opacities
        for (var i = 0; i < particleCount; i++) {
            var x = ((i % (gridSize * 20)) % gridSize - gridSize / 2) * spacing;
            var z = (Math.floor((i % (gridSize * 20)) / gridSize) - gridSize / 2) * spacing;
            particlePositions[i * 3] = x;
            particlePositions[i * 3 + 1] = Math.random() * 20 - 10; // Random y position
            particlePositions[i * 3 + 2] = z;
            particleOpacities[i] = Math.random();
        }
        camera.position.set(0, 0, 10);
        camera.lookAt(0, 0, 0);
        var animate = function () {
            requestAnimationFrame(animate);
            // Move particles downward and reset their position when they're out of view
            for (var i = 0; i < particleCount; i++) {
                particlePositions[i * 3 + 1] -= 0.01;
                if (particlePositions[i * 3 + 1] < -10) {
                    particlePositions[i * 3 + 1] = 10;
                }
                particleOpacities[i] = Math.max(0, particleOpacities[i] - 0.02);
                if (particleOpacities[i] <= 0) {
                    particleOpacities[i] = 1; // Reset opacity
                }
            }
            particleGeometry.attributes.position.needsUpdate = true;
            particleGeometry.attributes.opacity.needsUpdate = true;
            renderer.render(scene, camera);
        };
        animate();
        return function () {
            var _a;
            (_a = mountRef.current) === null || _a === void 0 ? void 0 : _a.removeChild(renderer.domElement);
        };
    }, [dimensions]);
    return <div ref={mountRef} id="matrix" aria-hidden="true" style={dimensions}></div>;
}
