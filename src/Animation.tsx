import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const FONT = 'Helvetica, Arial, sans-serif';
const GOLD = '#e8b34b';

// Quadratic bezier from Norway (left) to Lindisfarne (right)
const P0 = {x: 360, y: 760};
const P1 = {x: 960, y: 930};
const P2 = {x: 1560, y: 540};

const bezierPoint = (t: number) => {
  const u = 1 - t;
  return {
    x: u * u * P0.x + 2 * u * t * P1.x + t * t * P2.x,
    y: u * u * P0.y + 2 * u * t * P1.y + t * t * P2.y,
  };
};

const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const glowX = interpolate(frame, [0, 300], [42, 58]);
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at ${glowX}% 30%, #274b7a 0%, #16294d 42%, #0b1026 100%)`,
      }}
    >
      {/* faint sea texture rings */}
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: 220 + i * 330,
            top: 620 + (i % 2) * 90,
            width: 240,
            height: 70,
            borderRadius: '50%',
            border: '2px solid rgba(255,255,255,0.05)',
          }}
        />
      ))}
    </AbsoluteFill>
  );
};

const Route: React.FC = () => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [55, 245], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const pos = bezierPoint(t);
  const pinOpacity = interpolate(frame, [30, 55], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const endPinOpacity = interpolate(frame, [235, 260], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const Pin: React.FC<{x: number; y: number; label: string; opacity: number}> = ({
    x,
    y,
    label,
    opacity,
  }) => (
    <div style={{position: 'absolute', left: x - 90, top: y - 90, width: 180, opacity}}>
      <div
        style={{
          margin: '0 auto',
          width: 26,
          height: 26,
          borderRadius: '50%',
          background: GOLD,
          boxShadow: `0 0 22px ${GOLD}`,
          border: '4px solid #0b1026',
        }}
      />
      <div
        style={{
          marginTop: 12,
          textAlign: 'center',
          fontFamily: FONT,
          fontSize: 27,
          fontWeight: 700,
          letterSpacing: 3,
          color: 'white',
        }}
      >
        {label}
      </div>
    </div>
  );

  return (
    <AbsoluteFill>
      <svg width="1920" height="1080" style={{position: 'absolute'}}>
        <path
          d={`M ${P0.x} ${P0.y} Q ${P1.x} ${P1.y} ${P2.x} ${P2.y}`}
          fill="none"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="4"
          strokeDasharray="14 12"
        />
        <path
          d={`M ${P0.x} ${P0.y} Q ${P1.x} ${P1.y} ${P2.x} ${P2.y}`}
          fill="none"
          stroke={GOLD}
          strokeWidth="5"
          pathLength={100}
          strokeDasharray={100}
          strokeDashoffset={100 - t * 100}
          strokeLinecap="round"
        />
        <circle cx={pos.x} cy={pos.y} r="17" fill="#ffffff" />
        <circle cx={pos.x} cy={pos.y} r="30" fill="none" stroke={GOLD} strokeWidth="3" opacity="0.7" />
      </svg>
      <Pin x={P0.x} y={P0.y} label="NORWAY" opacity={pinOpacity} />
      <Pin x={P2.x} y={P2.y} label="LINDISFARNE" opacity={endPinOpacity} />
    </AbsoluteFill>
  );
};

const Title: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: frame - 8, fps, config: {damping: 15}});
  const y = interpolate(s, [0, 1], [70, 0]);
  const subOpacity = interpolate(frame, [38, 62], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <div
      style={{
        position: 'absolute',
        top: 92,
        width: '100%',
        textAlign: 'center',
        fontFamily: FONT,
        color: 'white',
      }}
    >
      <div
        style={{
          fontSize: 30,
          letterSpacing: 9,
          color: GOLD,
          opacity: s,
          fontWeight: 700,
        }}
      >
        AN ANIMATED HISTORY TEST
      </div>
      <div
        style={{
          marginTop: 18,
          fontSize: 118,
          fontWeight: 800,
          opacity: s,
          transform: `translateY(${y}px)`,
          textShadow: '0 10px 34px rgba(0,0,0,0.5)',
        }}
      >
        LINDISFARNE &middot; 793 AD
      </div>
      <div style={{marginTop: 12, fontSize: 40, opacity: subOpacity * 0.9}}>
        The raid that started the Viking Age
      </div>
    </div>
  );
};

const InfoCards: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const cards = [
    'Code written by Muse',
    'Pushed to GitHub main',
    'Rendered by GitHub Actions',
  ];
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 64,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        gap: 26,
        fontFamily: FONT,
      }}
    >
      {cards.map((text, i) => {
        const s = spring({frame: frame - (95 + i * 28), fps, config: {damping: 14}});
        return (
          <div
            key={text}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              padding: '18px 30px',
              borderRadius: 999,
              background: 'rgba(6, 10, 24, 0.72)',
              border: '1px solid rgba(255,255,255,0.22)',
              opacity: s,
              transform: `translateY(${interpolate(s, [0, 1], [34, 0])}px)`,
            }}
          >
            <div style={{width: 15, height: 15, borderRadius: '50%', background: GOLD}} />
            <div style={{fontSize: 29, color: 'white', fontWeight: 600}}>{text}</div>
          </div>
        );
      })}
    </div>
  );
};

export const Animation: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const fade = interpolate(
    frame,
    [0, 14, durationInFrames - 18, durationInFrames],
    [0, 1, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
  );
  const progress = frame / durationInFrames;
  return (
    <AbsoluteFill style={{opacity: fade}}>
      <Background />
      <Route />
      <Title />
      <InfoCards />
      <div
        style={{
          position: 'absolute',
          top: 34,
          right: 44,
          fontFamily: 'Menlo, monospace',
          fontSize: 24,
          color: 'rgba(255,255,255,0.55)',
        }}
      >
        {`frame ${frame} / ${durationInFrames}`}
      </div>
      <div
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          height: 9,
          width: `${progress * 100}%`,
          background: `linear-gradient(90deg, ${GOLD}, #ff7847)`,
        }}
      />
    </AbsoluteFill>
  );
};
