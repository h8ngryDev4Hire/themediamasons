'use client';
import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
var GRID_COUNT = 60;
var GRID_SIZE = 60;
var GRID_DIVISIONS = 20;
var GRID_MOVE_SPEED = 0.05;
var REPOSITION_THRESHOLD = 40; // Distance behind camera to trigger repositioning
export default function MatrixScape() {
    var _a, _b, _c, _d;
    var mountRef = useRef(null);
    var gridsRef = useRef([]);
    var scene = useState(function () { return new THREE.Scene(); })[0];
    var camera = useState(function () { return new THREE.PerspectiveCamera(100, 400 / 400, 1, 400); })[0];
    var renderer = useState(function () { return new THREE.WebGLRenderer({ alpha: true }); })[0];
    var _e = useState({ width: 800, height: 400 }), dimensions = _e[0], setDimensions = _e[1];
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
        renderer.setSize(width, height); // Increased width for wider view
        camera.aspect = width / height;
        camera.updateMatrix();
        mountRef.current.appendChild(renderer.domElement);
        // Create grids: left, center, right
        for (var i = -1; i < GRID_COUNT - 1; i++) {
            var grid = new THREE.GridHelper(GRID_SIZE, GRID_DIVISIONS, 0x00ff00, 0x00ff00);
            grid.position.z = i * GRID_SIZE;
            scene.add(grid);
            gridsRef.current.push(grid);
        }
        camera.position.set(0, 10, 40); // Adjust camera position
        camera.lookAt(0, 0, 0);
        function animate() {
            requestAnimationFrame(animate);
            gridsRef.current.forEach(function (grid) {
                grid.position.z += GRID_MOVE_SPEED;
                // If the grid has moved past the reposition threshold, move it to the back
                if (grid.position.z > camera.position.z + REPOSITION_THRESHOLD) {
                    grid.position.z -= GRID_SIZE * GRID_COUNT;
                }
            });
            renderer.render(scene, camera);
        }
        animate();
        return function () {
            var _a;
            (_a = mountRef.current) === null || _a === void 0 ? void 0 : _a.removeChild(renderer.domElement);
            gridsRef.current.forEach(function (grid) {
                scene.remove(grid);
                grid.dispose();
            });
        };
    }, [dimensions]);
    useEffect(function () {
    }, [(_b = (_a = mountRef === null || mountRef === void 0 ? void 0 : mountRef.current) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.clientWidth, (_d = (_c = mountRef === null || mountRef === void 0 ? void 0 : mountRef.current) === null || _c === void 0 ? void 0 : _c.parentElement) === null || _d === void 0 ? void 0 : _d.clientHeight]);
    return <div ref={mountRef} id="matrixscape" aria-hidden="true" style={dimensions}></div>;
}
