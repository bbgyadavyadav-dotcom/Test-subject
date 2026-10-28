import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const FONT = 'Helvetica, Arial, sans-serif';
const ORBIT_COUNT = 12;

const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const hue = interpolate(frame, [0, durationInFrames], [220, 300]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, hsl(${hue}, 70%, 16%), hsl(${
          hue + 60
        }, 80%, 36%))`,
      }}
    />
  );
};

const Orbit: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();
  const appear = spring({frame: frame - 20, fps, config: {damping: 200}});

  return (
    <AbsoluteFill style={{opacity: appear}}>
      {new Array(ORBIT_COUNT).fill(0).map((_, i) => {
        const angle = (i / ORBIT_COUNT) * Math.PI * 2 + frame * 0.02;
        const radius = 400 + Math.sin(frame / 20 + i) * 40;
        const x = width / 2 + Math.cos(angle) * radius;
        const y = height / 2 + 60 + Math.sin(angle) * radius * 0.45;
        const size = 26 + (i % 3) * 10;
        const color = `hsl(${(i * 30 + frame * 2) % 360}, 90%, 65%)`;

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x - size / 2,
              top: y - size / 2,
              width: size,
              height: size,
              borderRadius: '50%',
              background: color,
              boxShadow: `0 0 24px ${color}`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

const Character: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, width} = useVideoConfig();

  const BODY = 220;
  const GROUND_Y = 800;
  const MAX_JUMP = 240;
  const CYCLE = 45;

  const entrance = spring({frame: frame - 5, fps, config: {damping: 12}});

  const t = (frame % CYCLE) / CYCLE;
  const lift = Math.abs(Math.sin(t * Math.PI)); // 0 on ground, 1 at peak
  const jump = lift * MAX_JUMP;
  const squash = Math.pow(1 - lift, 6); // strong only near the ground

  const scaleX = (1 + 0.25 * squash) * entrance;
  const scaleY = (1 - 0.25 * squash) * entrance;

  const blink = frame % 90 < 4 ? 0.1 : 1;
  const lookX = Math.sin(frame / 25) * 8;

  const shadowWidth = 260 * (1 - lift * 0.45) * entrance;

  const Eye: React.FC<{left: number}> = ({left}) => (
    <div
      style={{
        position: 'absolute',
        top: 62,
        left,
        width: 52,
        height: 52,
        borderRadius: '50%',
        background: 'white',
        transform: `scaleY(${blink})`,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 14,
          left: 14 + lookX,
          width: 24,
          height: 24,
          borderRadius: '50%',
          background: '#222',
        }}
      />
    </div>
  );

  return (
    <>
      <div
        style={{
          position: 'absolute',
          left: width / 2 - shadowWidth / 2,
          top: GROUND_Y - 14,
          width: shadowWidth,
          height: 28,
          borderRadius: '50%',
          background: 'rgba(0, 0, 0, 0.35)',
          filter: 'blur(6px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: width / 2 - BODY / 2,
          top: GROUND_Y - BODY - jump,
          width: BODY,
          height: BODY,
          borderRadius: '50%',
          background: 'linear-gradient(160deg, #ffd166, #ff6b6b)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.35)',
          transformOrigin: 'center bottom',
          transform: `scale(${scaleX}, ${scaleY})`,
        }}
      >
        <Eye left={44} />
        <Eye left={124} />
        <div
          style={{
            position: 'absolute',
            top: 140,
            left: 80,
            width: 60,
            height: 30,
            borderBottom: '8px solid #5a1a1a',
            borderRadius: '0 0 60px 60px',
          }}
        />
      </div>
    </>
  );
};

const Title: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const titleSpring = spring({frame: frame - 10, fps, config: {damping: 14}});
  const titleY = interpolate(titleSpring, [0, 1], [80, 0]);
  const subOpacity = interpolate(frame, [40, 65], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        top: 110,
        width: '100%',
        textAlign: 'center',
        fontFamily: FONT,
        color: 'white',
      }}
    >
      <div
        style={{
          fontSize: 130,
          fontWeight: 800,
          opacity: titleSpring,
          transform: `translateY(${titleY}px) scale(${0.8 + 0.2 * titleSpring})`,
          textShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
        }}
      >
        Hello, Remotion!
      </div>
      <div
        style={{
          marginTop: 10,
          fontSize: 46,
          opacity: subOpacity * 0.85,
          letterSpacing: 4,
        }}
      >
        Rendered with GitHub Actions
      </div>
    </div>
  );
};

export const Animation: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();

  const fade = interpolate(
    frame,
    [0, 15, durationInFrames - 20, durationInFrames],
    [0, 1, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
  );

  return (
    <AbsoluteFill style={{opacity: fade}}>
      <Background />
      <Orbit />
      <Character />
      <Title />
    </AbsoluteFill>
  );
};
