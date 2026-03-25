'use client'

export function burstEmoji(container: HTMLElement, x: number, y: number, emoji: string, count = 8) {
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div')
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5
    const speed = 60 + Math.random() * 80
    const tx = Math.cos(angle) * speed
    const ty = Math.sin(angle) * speed - 40
    const rotation = Math.random() * 720 - 360
    const size = 16 + Math.random() * 16
    el.textContent = emoji
    el.style.cssText = `position:absolute;left:${x}px;top:${y}px;font-size:${size}px;pointer-events:none;z-index:100;transform:translate(-50%,-50%) scale(1) rotate(0deg);`
    container.style.position = 'relative'; container.appendChild(el)
    requestAnimationFrame(() => {
      el.style.transition = 'all 0.7s cubic-bezier(0.25,0.46,0.45,0.94)'
      el.style.transform = `translate(calc(-50% + ${tx}px),calc(-50% + ${ty}px)) scale(0) rotate(${rotation}deg)`
      el.style.opacity = '0'
    })
    setTimeout(() => el.remove(), 800)
  }
}

export function burstDots(container: HTMLElement, x: number, y: number, colors: string[] = ['#BFFF00','#FF6B9D','#00E5FF','#FFD700','#FF4444'], count = 12) {
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div')
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.8
    const speed = 40 + Math.random() * 100
    const tx = Math.cos(angle) * speed; const ty = Math.sin(angle) * speed - 30
    const size = 4 + Math.random() * 8
    const color = colors[Math.floor(Math.random() * colors.length)]
    el.style.cssText = `position:absolute;left:${x}px;top:${y}px;width:${size}px;height:${size}px;border-radius:50%;background:${color};pointer-events:none;z-index:100;transform:translate(-50%,-50%) scale(1);box-shadow:0 0 ${size}px ${color};`
    container.style.position = 'relative'; container.appendChild(el)
    requestAnimationFrame(() => {
      el.style.transition = 'all 0.6s cubic-bezier(0.25,0.46,0.45,0.94)'
      el.style.transform = `translate(calc(-50% + ${tx}px),calc(-50% + ${ty}px)) scale(0)`; el.style.opacity = '0'
    })
    setTimeout(() => el.remove(), 700)
  }
}

export function floatingText(container: HTMLElement, x: number, y: number, text: string, color = '#BFFF00', fontSize = 24) {
  const el = document.createElement('div')
  const drift = (Math.random() - 0.5) * 40
  el.textContent = text
  el.style.cssText = `position:absolute;left:${x}px;top:${y}px;font-size:${fontSize}px;font-weight:900;color:${color};pointer-events:none;z-index:100;text-shadow:0 0 10px ${color},0 2px 4px rgba(0,0,0,0.5);transform:translate(-50%,-50%) scale(1);font-family:'Fredoka One','Bungee',sans-serif;`
  container.style.position = 'relative'; container.appendChild(el)
  requestAnimationFrame(() => {
    el.style.transition = 'all 0.8s cubic-bezier(0.25,0.46,0.45,0.94)'
    el.style.transform = `translate(calc(-50% + ${drift}px),calc(-50% - 80px)) scale(1.3)`; el.style.opacity = '0'
  })
  setTimeout(() => el.remove(), 900)
}

export function screenShake(element: HTMLElement, intensity = 4, duration = 300) {
  const start = performance.now()
  function shake(now: number) {
    const elapsed = now - start
    if (elapsed > duration) { element.style.transform = ''; return }
    const decay = 1 - elapsed / duration
    const x = (Math.random() - 0.5) * intensity * decay * 2
    const y = (Math.random() - 0.5) * intensity * decay * 2
    element.style.transform = `translate(${x}px,${y}px)`
    requestAnimationFrame(shake)
  }
  requestAnimationFrame(shake)
}

export function screenFlash(color = 'rgba(255,255,255,0.3)', duration = 200) {
  const el = document.createElement('div')
  el.style.cssText = `position:fixed;top:0;left:0;right:0;bottom:0;background:${color};pointer-events:none;z-index:9999;opacity:1;transition:opacity ${duration}ms ease-out;`
  document.body.appendChild(el)
  requestAnimationFrame(() => { el.style.opacity = '0' })
  setTimeout(() => el.remove(), duration + 50)
}

export function confetti(container: HTMLElement, count = 40, emojis = ['🎉','⭐','✨','🌟','💥']) {
  const rect = container.getBoundingClientRect()
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div')
    const startX = Math.random() * rect.width
    const drift = (Math.random() - 0.5) * 200
    const size = 12 + Math.random() * 20
    const delay = Math.random() * 400
    const dur = 1200 + Math.random() * 800
    const rotation = Math.random() * 1080 - 540
    const isEmoji = Math.random() > 0.4
    const emoji = emojis[Math.floor(Math.random() * emojis.length)]
    const colors = ['#BFFF00','#FF6B9D','#00E5FF','#FFD700','#FF4444','#A855F7']
    const color = colors[Math.floor(Math.random() * colors.length)]
    if (isEmoji) { el.textContent = emoji; el.style.cssText = `position:absolute;left:${startX}px;top:-20px;font-size:${size}px;pointer-events:none;z-index:100;opacity:1;` }
    else { el.style.cssText = `position:absolute;left:${startX}px;top:-20px;width:${size*0.6}px;height:${size*0.4}px;background:${color};border-radius:2px;pointer-events:none;z-index:100;opacity:1;` }
    container.appendChild(el)
    setTimeout(() => { el.style.transition = `all ${dur}ms cubic-bezier(0.25,0.46,0.45,0.94)`; el.style.transform = `translate(${drift}px,${rect.height+40}px) rotate(${rotation}deg)`; el.style.opacity = '0' }, delay)
    setTimeout(() => el.remove(), delay + dur + 50)
  }
}

export function pulseRing(container: HTMLElement, x: number, y: number, color = '#BFFF00', count = 2) {
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div')
    el.style.cssText = `position:absolute;left:${x}px;top:${y}px;width:20px;height:20px;border-radius:50%;border:3px solid ${color};pointer-events:none;z-index:90;transform:translate(-50%,-50%) scale(1);opacity:0.8;box-shadow:0 0 15px ${color};`
    container.appendChild(el)
    setTimeout(() => { el.style.transition = 'all 0.6s cubic-bezier(0.25,0.46,0.45,0.94)'; el.style.transform = `translate(-50%,-50%) scale(${4+i*2})`; el.style.opacity = '0' }, i * 100)
    setTimeout(() => el.remove(), 800 + i * 100)
  }
}

export function spawnTrail(container: HTMLElement, x: number, y: number, color = '#BFFF00') {
  const el = document.createElement('div'); const size = 6 + Math.random() * 6
  el.style.cssText = `position:absolute;left:${x}px;top:${y}px;width:${size}px;height:${size}px;border-radius:50%;background:${color};pointer-events:none;z-index:80;transform:translate(-50%,-50%) scale(1);opacity:0.7;box-shadow:0 0 ${size*2}px ${color};`
  container.appendChild(el)
  requestAnimationFrame(() => { el.style.transition='all 0.4s ease-out'; el.style.transform='translate(-50%,-50%) scale(0)'; el.style.opacity='0' })
  setTimeout(() => el.remove(), 500)
}

export function bounceScale(element: HTMLElement, scale = 1.3) {
  element.style.transition = 'none'; element.style.transform = `scale(${scale})`
  requestAnimationFrame(() => { element.style.transition = 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)'; element.style.transform = 'scale(1)' })
}

export function glowPulse(element: HTMLElement, color = '#BFFF00', duration = 600) {
  element.style.transition = `box-shadow ${duration/2}ms ease-in-out`
  element.style.boxShadow = `0 0 20px ${color},0 0 40px ${color},inset 0 0 20px ${color}40`
  setTimeout(() => { element.style.boxShadow = '' }, duration / 2)
}

export function explosion(container: HTMLElement, x: number, y: number, size: 'normal' | 'big' = 'normal') {
  const count = size === 'big' ? 20 : 10
  const colors = size === 'big' ? ['#FF4444','#FF8800','#FFD700','#FF6B9D'] : ['#FF4444','#FF8800','#FFD700']
  burstDots(container, x, y, colors, count)
  const ring = document.createElement('div')
  const ringSize = size === 'big' ? 80 : 40
  ring.style.cssText = `position:absolute;left:${x}px;top:${y}px;width:${ringSize}px;height:${ringSize}px;border-radius:50%;background:radial-gradient(circle,rgba(255,200,0,0.6) 0%,transparent 70%);pointer-events:none;z-index:95;transform:translate(-50%,-50%) scale(0.5);opacity:1;`
  container.appendChild(ring)
  requestAnimationFrame(() => { ring.style.transition='all 0.4s ease-out'; ring.style.transform='translate(-50%,-50%) scale(2)'; ring.style.opacity='0' })
  setTimeout(() => ring.remove(), 500)
}

export function collectFly(container: HTMLElement, emoji: string, fromX: number, fromY: number, toX: number, toY: number, delay = 0) {
  setTimeout(() => {
    const el = document.createElement('div')
    el.textContent = emoji
    el.style.cssText = `position:absolute;left:${fromX}px;top:${fromY}px;font-size:20px;pointer-events:none;z-index:100;opacity:1;`
    container.appendChild(el)
    requestAnimationFrame(() => { el.style.transition = 'all 0.6s cubic-bezier(0.4,0,0.2,1)'; el.style.left = `${toX}px`; el.style.top = `${toY}px`; el.style.opacity = '0.3'; el.style.transform = 'scale(0.5)' })
    setTimeout(() => el.remove(), 700)
  }, delay)
}

export function flyIn(container: HTMLElement, emoji: string, fromX: number, fromY: number, toX: number, toY: number) {
  const el = document.createElement('div')
  el.textContent = emoji
  el.style.cssText = `position:absolute;left:${fromX}px;top:${fromY}px;font-size:40px;pointer-events:none;z-index:100;transition:all 0.5s cubic-bezier(0.34,1.56,0.64,1);`
  container.appendChild(el)
  requestAnimationFrame(() => { el.style.left = `${toX}px`; el.style.top = `${toY}px`; el.style.transform = 'scale(1.3)' })
  setTimeout(() => { el.style.transition = 'all 0.2s ease-out'; el.style.transform = 'scale(0)'; el.style.opacity = '0' }, 500)
  setTimeout(() => el.remove(), 750)
}
