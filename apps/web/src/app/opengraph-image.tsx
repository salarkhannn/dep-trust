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
          backgroundColor: '#ffffff',
          padding: '80px',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: '24px',
            fontFamily: 'monospace',
            fontWeight: 700,
            color: '#0f0f0f',
            marginBottom: '40px',
          }}
        >
          dep-trust
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: '56px',
            fontWeight: 700,
            color: '#0f0f0f',
            lineHeight: 1.15,
            maxWidth: '800px',
          }}
        >
          Know what your dependencies are doing.
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: '22px',
            color: '#6b6b6b',
            marginTop: '24px',
            maxWidth: '700px',
            lineHeight: 1.5,
          }}
        >
          Scan your npm dependency tree for supply chain attack indicators.
        </div>
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            bottom: '80px',
            left: '80px',
            fontSize: '18px',
            fontFamily: 'monospace',
            color: '#b91c1c',
          }}
        >
          npm install -g dep-trust
        </div>
      </div>
    ),
    { ...size },
  )
}
