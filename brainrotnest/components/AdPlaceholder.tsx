'use client'

import Script from 'next/script'

interface Props {
  size: 'banner' | 'rectangle' | 'native'
}

export default function AdPlaceholder({ size }: Props) {
  if (size === 'banner') {
    return (
      <div style={{ textAlign: 'center', margin: '12px 0' }}>
        <Script
          id="adsterra-banner-options"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              atOptions = {
                'key' : '64e61687a115fe2406c5592f03cdb30f',
                'format' : 'iframe',
                'height' : 90,
                'width' : 728,
                'params' : {}
              };
            `
          }}
        />
        <Script
          id="adsterra-banner"
          src="https://www.highperformanceformat.com/64e61687a115fe2406c5592f03cdb30f/invoke.js"
          strategy="afterInteractive"
        />
      </div>
    )
  }

  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px dashed rgba(255,255,255,0.1)',
      borderRadius: '8px',
      padding: '16px',
      textAlign: 'center',
      fontSize: '12px',
      color: 'rgba(255,255,255,0.2)',
      margin: '12px 0'
    }}>
      Advertisement
    </div>
  )
}
