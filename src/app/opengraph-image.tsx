import { ImageResponse } from 'next/og';

export const alt = 'Sesoris - Hidup Lebih Teratur';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1B5E3B 0%, #2E7D4A 60%, #4CAF50 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* Background pattern */}
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.08,
          backgroundImage: 'radial-gradient(circle at 20% 80%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

        {/* Logo area */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
        }}>
          <div style={{
            fontSize: '88px',
            fontWeight: 800,
            color: 'white',
            letterSpacing: '-2px',
            lineHeight: 1,
          }}>
            Sesoris
          </div>
          <div style={{
            fontSize: '36px',
            color: 'rgba(255,255,255,0.85)',
            fontWeight: 400,
            letterSpacing: '2px',
          }}>
            Hidup Lebih Teratur
          </div>
          <div style={{
            marginTop: '24px',
            padding: '12px 32px',
            background: 'rgba(255,255,255,0.15)',
            borderRadius: '100px',
            border: '1px solid rgba(255,255,255,0.3)',
            fontSize: '22px',
            color: 'rgba(255,255,255,0.9)',
          }}>
            sesoris.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
