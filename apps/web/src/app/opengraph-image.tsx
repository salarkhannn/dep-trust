import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'dep-trust — npm supply chain protection'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          width: '100%',
          height: '100%',
          backgroundColor: '#F5F5F5',
          padding: '80px',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontFamily: 'monospace',
            fontSize: '11px',
            fontWeight: 400,
            color: '#666666',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '24px',
          }}
        >
          npm supply chain protection
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: '56px',
            fontWeight: 700,
            color: '#000000',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            maxWidth: '800px',
          }}
        >
          Know what your dependencies are doing.
        </div>
        <div
          style={{
            display: 'flex',
            fontFamily: 'monospace',
            fontSize: '24px',
            fontWeight: 700,
            color: '#000000',
            letterSpacing: '-0.02em',
            position: 'absolute',
            top: '80px',
            right: '80px',
          }}
        >
          dep-trust
        </div>
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            bottom: '80px',
            left: '80px',
            fontFamily: 'monospace',
            fontSize: '13px',
            color: '#D71921',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          npm install -g dep-trust
        </div>
      </div>
    ),
    { ...size },
  )
}
