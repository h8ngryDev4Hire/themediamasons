'use client';
import React, { useEffect, useRef } from 'react';
import { initScene, resizeScene } from './scene.ts';
import { createObjects } from './objs.ts';
import { startAnimation } from './animations.ts';
var ContentFactory = function () {
    var containerRef = useRef(null);
    useEffect(function () {
        if (!containerRef.current)
            return;
        var _a = initScene(containerRef.current), scene = _a.scene, camera = _a.camera, renderer = _a.renderer, composer = _a.composer;
        createObjects(scene);
        startAnimation(scene, camera, composer);
        var handleResize = function () {
            if (!containerRef.current)
                return;
            resizeScene(camera, renderer, composer, containerRef.current);
        };
        window.addEventListener('resize', handleResize);
        return function () {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return <div ref={containerRef} style={{ minWidth: '100%', minHeight: '100%' }}/>;
};
export default ContentFactory;
