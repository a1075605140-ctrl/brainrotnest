'use client'

import { useEffect, useRef } from 'react'

interface Props {
  size: 'banner' | 'rectangle' | 'native'
}

export default function AdPlaceholder({ size }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (size !== 'banner' || !ref.current) return

    // 清空容器
    ref.current.innerHTML = ''

    // 注入 atOptions
    const optScript = document.createElement('script')
    optScript.type = 'text/javascript'
    optScript.text = `
      atOptions = {
        'key' : '64e61687a115fe2406c5592f03cdb30f',
        'format' : 'iframe',
        'height' : 90,
        'width' : 728,
        'params' : {}
      };
    `
    ref.current.appendChild(optScript)

    // 注入 invoke.js
    const invokeScript = document.createElement('script')
    invokeScript.type = 'text/javascript'
    invokeScript.src = 'https://www.highperformanceformat.com/64e61687a115fe2406c5592f03cdb30f/invoke.js'
    ref.current.appendChild(invokeScript)
  }, [size])

  if (size === 'banner') {
    return (
      <div style={{ textAlign: 'center', margin: '12px 0', minHeight: '90px' }}>
        <div ref={ref} />
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