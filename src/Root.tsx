import React from 'react';
import { Composition } from 'remotion';
import { Animation } from './Animation';

export const RemotionRoot = () => {
  return (
    <Composition
      id="MyAnimation"
      component={Animation}
      durationInFrames={300}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};


