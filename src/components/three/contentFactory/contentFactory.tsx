'use client'

import React, { useEffect, useRef } from 'react';
import { initScene, resizeScene } from './scene.ts';
import { createObjects } from './objs.ts';
import { startAnimation } from './animations.ts';

const ContentFactory: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const { scene, camera, renderer, composer } = initScene(containerRef.current);
    createObjects(scene);
    startAnimation(scene, camera, composer);

    const handleResize = () => {
      if (!containerRef.current) return;
      resizeScene(camera, renderer, composer, containerRef.current);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return <div ref={containerRef} style={{ minWidth: '100%', minHeight: '100%' }} />;
};

export default ContentFactory;
