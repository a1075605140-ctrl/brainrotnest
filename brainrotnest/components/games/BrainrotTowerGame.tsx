'use client'
import { useState, useEffect, useRef, useMemo } from 'react'
import SFX from '@/lib/sounds'
import { floatingText, screenFlash, confetti, explosion, pulseRing, screenShake } from '@/lib/effects'

const COLS = 10
const ROWS = 8
const TILE = 52

const TOWER_DEFS = [
  { id: 'tralalero', name: 'Tralalero', emoji: '🦈', cost: 50, damage: 10, range: 3, fireRate: 1000, desc: 'Fast single-target' },
  { id: 'tung-tung', name: 'Tung Tung', emoji: '🥁', cost: 100, damage: 20, range: 2, fireRate: 800, desc: 'Area damage' },
  { id: 'bombardiro', name: 'Bombardiro', emoji: '🐊', cost: 200, damage: 50, range: 4, fireRate: 2000, desc: 'Long range sniper' },
  { id: 'cappuccino', name: 'Cappuccino', emoji: '💀', cost: 300, damage: 30, range: 3, fireRate: 500, desc: 'Ultra fast attack' },
]

const TOWER_COLORS: Record<string, string> = {
  'tralalero':  '#4ade80',
  'tung-tung':  '#facc15',
  'bombardiro': '#ef4444',
  'cappuccino': '#c4b5fd',
}

const ENEMY_DEFS = [
  { name: 'Mini Brainrot', emoji: '🟢', hp: 50, speed: 2.5, reward: 10 },
  { name: 'Brainrot Grunt', emoji: '🟡', hp: 100, speed: 2.0, reward: 20 },
  { name: 'Mega Brainrot', emoji: '🔴', hp: 200, speed: 1.5, reward: 40 },
  { name: 'Boss Brainrot', emoji: '💜', hp: 500, speed: 1.0, reward: 100 },
]

const WAVES = [
  [{ t: 0, n: 5 }],
  [{ t: 0, n: 8 }, { t: 1, n: 2 }],
  [{ t: 0, n: 5 }, { t: 1, n: 5 }],
  [{ t: 1, n: 8 }, { t: 2, n: 2 }],
  [{ t: 1, n: 5 }, { t: 2, n: 5 }],
  [{ t: 2, n: 8 }, { t: 3, n: 1 }],
  [{ t: 2, n: 5 }, { t: 3, n: 3 }],
  [{ t: 3, n: 5 }],
  [{ t: 0, n: 10 }, { t: 1, n: 10 }, { t: 2, n: 5 }],
  [{ t: 3, n: 10 }],
]

const PATH = [
  { x: 0, y: 3 }, { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 2, y: 1 }, { x: 3, y: 1 },
  { x: 4, y: 1 }, { x: 4, y: 3 }, { x: 5, y: 3 }, { x: 5, y: 5 }, { x: 6, y: 5 },
  { x: 7, y: 5 }, { x: 7, y: 3 }, { x: 8, y: 3 }, { x: 9, y: 3 },
]

const PATH_SEGS = PATH.slice(0, -1).map((a, i) => {
  const b = PATH[i + 1]
  return { a, b, len: Math.abs(b.x - a.x) + Math.abs(b.y - a.y) }
})

const TOTAL_PATH = PATH_SEGS.reduce((s, seg) => s + seg.len, 0)

function getPosFromDist(dist: number) {
  let rem = Math.min(dist, TOTAL_PATH)
  for (const seg of PATH_SEGS) {
    if (rem <= seg.len) {
      const t = rem / seg.len
      return { x: seg.a.x + (seg.b.x - seg.a.x) * t, y: seg.a.y + (seg.b.y - seg.a.y) * t }
    }
    rem -= seg.len
  }
  return PATH[PATH.length - 1]
}

const PATH_TILES = (() => {
  const set = new Set<string>()
  for (const { a, b } of PATH_SEGS) {
    if (a.x === b.x) {
      for (let y = Math.min(a.y, b.y); y <= Math.max(a.y, b.y); y++) set.add(`${a.x},${y}`)
    } else {
      for (let x = Math.min(a.x, b.x); x <= Math.max(a.x, b.x); x++) set.add(`${x},${a.y}`)
    }
  }
  return set
})()

type Phase = 'intro' | 'playing' | 'paused' | 'won' | 'lost'

interface Enemy { id: number; type: number; dist: number; hp: number; maxHp: number }
interface Tower { id: number; type: string; x: number; y: number; lastFired: number }
interface Proj { id: number; x: number; y: number; targetId: number; damage: number }
interface AttackLine { id: number; x1: number; y1: number; x2: number; y2: number; color: string; born: number }
interface FloatText { id: number; x: number; y: number; text: string; born: number }
interface GS {
  towers: Tower[]; enemies: Enemy[]; projs: Proj[]
  gold: number; lives: number; wave: number; score: number
  waveInProgress: boolean; grid: (string | null)[][]
}

function mkGS(): GS {
  return {
    towers: [], enemies: [], projs: [],
    gold: 150, lives: 20, wave: 0, score: 0, waveInProgress: false,
    grid: Array.from({ length: ROWS }, () => new Array<string | null>(COLS).fill(null)),
  }
}

export default function BrainrotTowerGame() {
  const [phase, setPhase] = useState<Phase>('intro')
  const [sel, setSel] = useState<string | null>(null)
  const [, setTick] = useState(0)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const gameAreaRef = useRef<HTMLDivElement>(null)

  const sfx = useMemo(() => {
    if (!soundEnabled) return new Proxy({} as typeof SFX, { get: () => (..._args: any[]) => {} })
    return SFX
  }, [soundEnabled])

  const gs = useRef<GS>(mkGS())
  const phaseRef = useRef<Phase>('intro')
  const eid = useRef(0)
  const pid = useRef(0)
  const tid = useRef(0)
  const fxId = useRef(0)
  const spawnQ = useRef<number[]>([])
  const lastSpawnT = useRef(0)
  const loopRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined)

  // Visual effects refs (not in GS — purely presentational)
  const attackLinesRef = useRef<AttackLine[]>([])
  const hitFlashRef = useRef<Map<number, number>>(new Map())   // enemyId → expireTimestamp
  const floatTextsRef = useRef<FloatText[]>([])

  const g = gs.current

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (phase !== 'playing') {
      if (loopRef.current) clearInterval(loopRef.current)
      return
    }

    loopRef.current = setInterval(() => {
      if (phaseRef.current !== 'playing') return
      const s = gs.current
      const now = Date.now()
      const DT = 0.1

      // Spawn
      if (spawnQ.current.length > 0 && now - lastSpawnT.current >= 1200) {
        const type = spawnQ.current.shift()!
        const def = ENEMY_DEFS[type]
        s.enemies = [...s.enemies, { id: ++eid.current, type, dist: 0, hp: def.hp, maxHp: def.hp }]
        lastSpawnT.current = now
      }

      // Move enemies
      let livesLost = 0
      const reached = new Set<number>()
      s.enemies = s.enemies.map(e => {
        const nd = e.dist + ENEMY_DEFS[e.type].speed * DT
        if (nd >= TOTAL_PATH) { reached.add(e.id); livesLost++; return e }
        return { ...e, dist: nd }
      }).filter(e => !reached.has(e.id))

      if (livesLost > 0) {
        s.lives = Math.max(0, s.lives - livesLost)
        sfx.stolen()
        screenFlash('rgba(255,0,0,0.15)')
        if (gameAreaRef.current) screenShake(gameAreaRef.current, 4, 200)
        if (s.lives <= 0) {
          phaseRef.current = 'lost'
          setPhase('lost')
          sfx.gameOver()
          if (gameAreaRef.current) { screenFlash('rgba(239,68,68,0.3)'); screenShake(gameAreaRef.current, 12, 500) }
          setTick(t => t + 1)
          return
        }
      }

      // Towers attack
      const newProjs: Proj[] = []
      s.towers = s.towers.map(tw => {
        const def = TOWER_DEFS.find(d => d.id === tw.type)!
        if (now - tw.lastFired < def.fireRate) return tw
        const inRange = s.enemies.filter(e => {
          const p = getPosFromDist(e.dist)
          return Math.hypot(p.x - tw.x, p.y - tw.y) <= def.range
        })
        if (!inRange.length) return tw
        const targets = tw.type === 'tung-tung'
          ? inRange
          : [inRange.reduce((best, e) => {
            const pb = getPosFromDist(best.dist)
            const pe = getPosFromDist(e.dist)
            return Math.hypot(pe.x - tw.x, pe.y - tw.y) < Math.hypot(pb.x - tw.x, pb.y - tw.y) ? e : best
          })]

        const twPx = (tw.x + 0.5) * TILE
        const twPy = (tw.y + 0.5) * TILE
        const color = TOWER_COLORS[tw.type] || '#fff'

        targets.forEach(tgt => {
          newProjs.push({ id: ++pid.current, x: tw.x + 0.5, y: tw.y + 0.5, targetId: tgt.id, damage: def.damage })
          // Attack line FX
          const tp = getPosFromDist(tgt.dist)
          attackLinesRef.current = [...attackLinesRef.current, {
            id: ++fxId.current,
            x1: twPx, y1: twPy,
            x2: (tp.x + 0.5) * TILE, y2: (tp.y + 0.5) * TILE,
            color, born: now,
          }]
        })
        return { ...tw, lastFired: now }
      })
      s.projs = [...s.projs, ...newProjs]

      // Move projectiles + check hits
      const PSPD = 10
      const dmgMap = new Map<number, number>()
      const alive: Proj[] = []
      for (const p of s.projs) {
        const tgt = s.enemies.find(e => e.id === p.targetId)
        if (!tgt) continue
        const tp = getPosFromDist(tgt.dist)
        const ex = tp.x + 0.5, ey = tp.y + 0.5
        const dx = ex - p.x, dy = ey - p.y
        const d = Math.hypot(dx, dy)
        if (d <= PSPD * DT + 0.3) {
          dmgMap.set(tgt.id, (dmgMap.get(tgt.id) || 0) + p.damage)
        } else {
          alive.push({ ...p, x: p.x + (dx / d) * PSPD * DT, y: p.y + (dy / d) * PSPD * DT })
        }
      }
      s.projs = alive

      // Apply damage — hit flash
      s.enemies = s.enemies.map(e => {
        const d = dmgMap.get(e.id) || 0
        if (d) hitFlashRef.current.set(e.id, now + 120)
        return d ? { ...e, hp: e.hp - d } : e
      })

      // Earn gold + float text on death
      let earned = 0
      const deadEnemies = s.enemies.filter(e => e.hp <= 0)
      deadEnemies.forEach(e => {
        earned += ENEMY_DEFS[e.type].reward
        s.score += ENEMY_DEFS[e.type].reward * 10
        const pos = getPosFromDist(e.dist)
        const px = (pos.x + 0.5) * TILE
        const py = (pos.y + 0.5) * TILE
        floatTextsRef.current = [...floatTextsRef.current, {
          id: ++fxId.current, x: px, y: py, text: `+${ENEMY_DEFS[e.type].reward}`, born: now,
        }]
        sfx.enemyDeath()
        if (gameAreaRef.current) {
          const isBoss = e.type === 3
          explosion(gameAreaRef.current, px, py, isBoss ? 'big' : 'normal')
          if (isBoss) {
            sfx.bigScore()
            screenFlash('rgba(255,215,0,0.2)')
            screenShake(gameAreaRef.current, 5, 300)
            confetti(gameAreaRef.current, 20, ['💥','⭐','🎉'])
          }
        }
      })
      s.enemies = s.enemies.filter(e => e.hp > 0)
      s.gold += earned

      // Clean up expired FX
      attackLinesRef.current = attackLinesRef.current.filter(l => now - l.born < 250)
      floatTextsRef.current = floatTextsRef.current.filter(f => now - f.born < 600)

      // Wave complete?
      if (s.waveInProgress && !spawnQ.current.length && !s.enemies.length) {
        s.waveInProgress = false
        sfx.waveComplete()
        if (gameAreaRef.current) {
          confetti(gameAreaRef.current, 25, ['🎉','⭐','✨'])
          floatingText(gameAreaRef.current, COLS * TILE / 2, ROWS * TILE / 2, 'WAVE CLEAR!', '#4ade80', 28)
        }
        if (s.wave >= WAVES.length) {
          phaseRef.current = 'won'
          setPhase('won')
          sfx.victory()
          if (gameAreaRef.current) { confetti(gameAreaRef.current, 80, ['🏆','🎉','⭐','✨','💥']); screenFlash('rgba(191,255,0,0.2)') }
        }
      }

      setTick(t => t + 1)
    }, 100)

    return () => { if (loopRef.current) clearInterval(loopRef.current) }
  }, [phase])

  function startGame() {
    if (loopRef.current) clearInterval(loopRef.current)
    gs.current = mkGS()
    eid.current = pid.current = tid.current = fxId.current = 0
    spawnQ.current = []
    lastSpawnT.current = 0
    attackLinesRef.current = []
    hitFlashRef.current = new Map()
    floatTextsRef.current = []
    phaseRef.current = 'playing'
    setPhase('playing')
    setSel(null)
  }

  function nextWave() {
    const s = gs.current
    if (s.waveInProgress || s.wave >= WAVES.length) return
    const q: number[] = []
    WAVES[s.wave].forEach(({ t, n }) => { for (let i = 0; i < n; i++) q.push(t) })
    spawnQ.current = q
    lastSpawnT.current = 0
    s.wave++
    s.waveInProgress = true
    setTick(t => t + 1)
  }

  function placeTower(x: number, y: number) {
    if (!sel || PATH_TILES.has(`${x},${y}`)) return
    const s = gs.current
    if (s.grid[y][x]) return
    const def = TOWER_DEFS.find(d => d.id === sel)!
    if (s.gold < def.cost) return
    s.grid = s.grid.map((r, ri) => ri === y ? r.map((c, ci) => ci === x ? sel : c) : r)
    s.gold -= def.cost
    s.towers = [...s.towers, { id: ++tid.current, type: sel, x, y, lastFired: 0 }]
    sfx.towerPlace()
    if (gameAreaRef.current) {
      const container = gameAreaRef.current
      const px = (x + 0.5) * TILE
      const py = (y + 0.5) * TILE
      pulseRing(container, px, py, '#4ade80')
    }
    setTick(t => t + 1)
  }

  function handleNextWave() {
    sfx.waveStart()
    if (gameAreaRef.current) {
      floatingText(gameAreaRef.current, COLS * TILE / 2, ROWS * TILE / 2 - 40, `WAVE ${gs.current.wave + 1}`, '#facc15', 32)
    }
    nextWave()
  }

  const greenBtnStyle: React.CSSProperties = {
    padding: '12px 28px',
    background: 'linear-gradient(135deg, #4ade80, #22c55e)',
    border: 'none',
    borderRadius: 10,
    color: '#fff',
    fontSize: 16,
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: 'var(--font-fredoka), Fredoka One, cursive',
  }

  // ── Intro ────────────────────────────────────────────────────────────────────
  if (phase === 'intro') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 16px', minHeight: 480 }}>
        <div style={{ fontSize: 56, marginBottom: 12 }}>🏰</div>
        <h2 style={{ fontFamily: 'var(--font-fredoka), Fredoka One, cursive', fontSize: 28, color: '#fff', margin: '0 0 10px', textAlign: 'center' }}>
          Brainrot Tower Defense
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.55)', maxWidth: 440, textAlign: 'center', lineHeight: 1.65, marginBottom: 24 }}>
          Place Italian Brainrot character towers to defend against 10 waves of enemies.
          Earn gold by defeating enemies — survive all waves to win!
        </p>
        <div style={{ display: 'flex', gap: 10, marginBottom: 28, flexWrap: 'wrap', justifyContent: 'center' }}>
          {TOWER_DEFS.map(t => (
            <div
              key={t.id}
              style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, textAlign: 'center', minWidth: 72 }}
            >
              <div style={{ fontSize: 28 }}>{t.emoji}</div>
              <div style={{ fontSize: 11, color: '#fff', fontWeight: 600, marginTop: 4 }}>{t.name}</div>
              <div style={{ fontSize: 11, color: '#facc15' }}>💰 {t.cost}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{t.desc}</div>
            </div>
          ))}
        </div>
        <button onClick={startGame} style={greenBtnStyle}>Start Game →</button>
      </div>
    )
  }

  // ── Won / Lost ───────────────────────────────────────────────────────────────
  if (phase === 'won' || phase === 'lost') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 16px', minHeight: 400 }}>
        <div style={{ fontSize: 56, marginBottom: 12 }}>{phase === 'won' ? '🎉' : '💀'}</div>
        <h2 style={{
          fontFamily: 'var(--font-fredoka), Fredoka One, cursive', fontSize: 36,
          color: phase === 'won' ? '#4ade80' : '#f87171', margin: '0 0 8px',
        }}>
          {phase === 'won' ? 'Victory!' : 'The Nest Fell!'}
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 6 }}>
          {phase === 'won' ? 'The Nest is Safe!' : `Reached wave ${g.wave}`}
        </p>
        <p style={{ color: '#facc15', fontSize: 22, fontWeight: 700, marginBottom: 28 }}>
          Score: {g.score.toLocaleString()}
        </p>
        <button onClick={startGame} style={greenBtnStyle}>
          {phase === 'won' ? 'Play Again' : 'Try Again'}
        </button>
      </div>
    )
  }

  // ── Playing / Paused ─────────────────────────────────────────────────────────
  const gridW = COLS * TILE
  const gridH = ROWS * TILE
  const selDef = sel ? TOWER_DEFS.find(d => d.id === sel) : null
  const renderNow = Date.now()

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setSoundEnabled(prev => !prev)}
        className="absolute top-2 right-2 z-10 px-3 py-2 rounded-lg text-white text-sm"
        style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}
      >
        {soundEnabled ? '🔊' : '🔇'}
      </button>
      {/* CSS animations */}
      <style>{`
        @keyframes brainrot-floatUp {
          0%   { opacity: 1; transform: translateY(0) scale(1); }
          20%  { opacity: 1; transform: translateY(-8px) scale(1.1); }
          100% { opacity: 0; transform: translateY(-44px) scale(0.8); }
        }
        @keyframes brainrot-attackLine {
          0%   { opacity: 0.85; }
          100% { opacity: 0; }
        }
        @keyframes brainrot-towerFire {
          0%   { transform: scale(1); }
          35%  { transform: scale(1.25); }
          100% { transform: scale(1); }
        }
      `}</style>

      {/* HUD */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px',
        background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 10, marginBottom: 10, flexWrap: 'wrap',
      }}>
        <span style={{ color: '#facc15', fontWeight: 700, fontSize: 14 }}>💰 {g.gold}</span>
        <span style={{ color: '#f87171', fontWeight: 700, fontSize: 14 }}>❤️ {g.lives}</span>
        <span style={{ color: '#60a5fa', fontWeight: 700, fontSize: 14 }}>🌊 {g.wave}/{WAVES.length}</span>
        <span style={{ color: '#a78bfa', fontWeight: 700, fontSize: 14 }}>⭐ {g.score}</span>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <button
            onClick={handleNextWave}
            disabled={g.waveInProgress || g.wave >= WAVES.length}
            style={{
              padding: '6px 14px', borderRadius: 8,
              border: `1px solid ${g.waveInProgress || g.wave >= WAVES.length ? 'rgba(255,255,255,0.08)' : 'rgba(74,222,128,0.35)'}`,
              background: g.waveInProgress || g.wave >= WAVES.length ? 'rgba(255,255,255,0.04)' : 'rgba(74,222,128,0.12)',
              color: g.waveInProgress || g.wave >= WAVES.length ? 'rgba(255,255,255,0.3)' : '#4ade80',
              fontWeight: 600, fontSize: 13,
              cursor: g.waveInProgress || g.wave >= WAVES.length ? 'not-allowed' : 'pointer',
            }}
          >
            {g.waveInProgress ? '⚔️ Fighting...' : g.wave >= WAVES.length ? '✅ All Waves Done' : `▶ Wave ${g.wave + 1}`}
          </button>
          <button
            onClick={() => {
              const next: Phase = phase === 'paused' ? 'playing' : 'paused'
              phaseRef.current = next
              setPhase(next)
            }}
            style={{
              padding: '6px 12px', borderRadius: 8,
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.05)',
              color: 'rgba(255,255,255,0.7)',
              cursor: 'pointer', fontWeight: 600, fontSize: 13,
            }}
          >
            {phase === 'paused' ? '▶ Resume' : '⏸ Pause'}
          </button>
        </div>
      </div>

      {/* Tower selector */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 10, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {TOWER_DEFS.map(def => {
          const canAfford = g.gold >= def.cost
          const isSelected = sel === def.id
          return (
            <button
              key={def.id}
              onClick={() => setSel(isSelected ? null : def.id)}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
                padding: '8px 10px', borderRadius: 8,
                background: isSelected ? 'rgba(74,222,128,0.12)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${isSelected ? 'rgba(74,222,128,0.45)' : 'rgba(255,255,255,0.08)'}`,
                cursor: canAfford ? 'pointer' : 'not-allowed',
                opacity: canAfford || isSelected ? 1 : 0.35,
                color: '#fff', minWidth: 76,
              }}
            >
              <span style={{ fontSize: 22 }}>{def.emoji}</span>
              <span style={{ fontSize: 11, fontWeight: 700 }}>{def.name}</span>
              <span style={{ fontSize: 11, color: '#facc15' }}>💰 {def.cost}</span>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.38)', textAlign: 'center', lineHeight: 1.3 }}>{def.desc}</span>
            </button>
          )
        })}
        {sel && selDef && (
          <div style={{ display: 'flex', alignItems: 'center', padding: '0 8px', color: 'rgba(255,255,255,0.4)', fontSize: 12, fontStyle: 'italic', alignSelf: 'center' }}>
            Click a tile to place {selDef.emoji}
          </div>
        )}
      </div>

      {/* Game grid */}
      <div style={{ overflowX: 'auto' }}>
        <div ref={gameAreaRef} style={{
          position: 'relative', width: gridW, height: gridH,
          background: 'rgba(10,12,20,0.9)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 8, overflow: 'hidden',
        }}>
          {/* Tiles */}
          {Array.from({ length: ROWS }, (_, row) =>
            Array.from({ length: COLS }, (_, col) => {
              const key = `${col},${row}`
              const isPath = PATH_TILES.has(key)
              const tType = g.grid[row][col]
              const tDef = tType ? TOWER_DEFS.find(d => d.id === tType) : null
              const tObj = tType ? g.towers.find(t => t.x === col && t.y === row) : null
              const isStart = col === PATH[0].x && row === PATH[0].y
              const isEnd = col === PATH[PATH.length - 1].x && row === PATH[PATH.length - 1].y
              const canClick = !isPath && !tType && !!sel && g.gold >= (selDef?.cost ?? Infinity)
              // Tower fire animation: active within 200ms of last shot
              const isFiring = !!tObj && (renderNow - tObj.lastFired) < 200
              return (
                <div
                  key={key}
                  onClick={() => placeTower(col, row)}
                  title={isPath ? 'Enemy path' : tDef ? `${tDef.name} Tower` : canClick ? 'Click to place' : ''}
                  style={{
                    position: 'absolute', left: col * TILE, top: row * TILE,
                    width: TILE - 1, height: TILE - 1,
                    background: isPath
                      ? 'rgba(150,90,30,0.2)'
                      : tType ? 'rgba(74,222,128,0.07)' : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${
                      isPath ? 'rgba(150,90,30,0.28)'
                      : tType ? 'rgba(74,222,128,0.14)' : 'rgba(255,255,255,0.05)'
                    }`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: isStart || isEnd ? 16 : 24,
                    cursor: canClick ? 'crosshair' : 'default',
                    userSelect: 'none',
                    boxSizing: 'border-box',
                  }}
                >
                  {/* Tower emoji with fire-pulse animation */}
                  {isStart ? '➤' : isEnd ? '🏠' : tDef && (
                    <span
                      key={tObj?.lastFired ?? 0}
                      style={{
                        display: 'inline-block',
                        animation: isFiring ? 'brainrot-towerFire 0.2s ease-out' : undefined,
                      }}
                    >
                      {tDef.emoji}
                    </span>
                  )}
                </div>
              )
            })
          )}

          {/* Attack lines SVG overlay */}
          <svg
            style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 25 }}
            width={gridW}
            height={gridH}
          >
            {attackLinesRef.current.map(line => (
              <line
                key={line.id}
                x1={line.x1} y1={line.y1}
                x2={line.x2} y2={line.y2}
                stroke={line.color}
                strokeWidth={2}
                strokeLinecap="round"
                style={{
                  animation: 'brainrot-attackLine 0.22s ease-out forwards',
                  filter: `drop-shadow(0 0 3px ${line.color})`,
                }}
              />
            ))}
          </svg>

          {/* Enemies */}
          {g.enemies.map(e => {
            const pos = getPosFromDist(e.dist)
            const def = ENEMY_DEFS[e.type]
            const hpPct = e.hp / e.maxHp
            const px = (pos.x + 0.5) * TILE - 16
            const py = (pos.y + 0.5) * TILE - 24
            const isFlashing = (hitFlashRef.current.get(e.id) ?? 0) > renderNow
            return (
              <div key={e.id} style={{
                position: 'absolute', left: px, top: py,
                width: 32, pointerEvents: 'none', textAlign: 'center', zIndex: 10,
              }}>
                <div style={{
                  fontSize: 20, lineHeight: 1,
                  filter: isFlashing
                    ? 'brightness(3) drop-shadow(0 0 4px #fff)'
                    : 'drop-shadow(0 1px 3px rgba(0,0,0,0.9))',
                  transition: 'filter 0.05s',
                }}>
                  {def.emoji}
                </div>
                <div style={{ height: 3, background: 'rgba(0,0,0,0.6)', borderRadius: 2, marginTop: 2, overflow: 'hidden' }}>
                  <div style={{
                    width: `${hpPct * 100}%`, height: '100%', borderRadius: 2,
                    background: hpPct > 0.6 ? '#4ade80' : hpPct > 0.3 ? '#facc15' : '#f87171',
                    transition: 'width 0.1s linear',
                  }} />
                </div>
              </div>
            )
          })}

          {/* Projectiles */}
          {g.projs.map(p => (
            <div key={p.id} style={{
              position: 'absolute',
              left: p.x * TILE - 4,
              top: p.y * TILE - 4,
              width: 8, height: 8, borderRadius: '50%',
              background: '#fde047',
              boxShadow: '0 0 6px #fde047, 0 0 12px rgba(253,224,71,0.5)',
              pointerEvents: 'none', zIndex: 20,
            }} />
          ))}

          {/* Gold float texts */}
          {floatTextsRef.current.map(ft => (
            <div key={ft.id} style={{
              position: 'absolute',
              left: ft.x - 20,
              top: ft.y - 16,
              width: 40,
              textAlign: 'center',
              fontSize: 13,
              fontWeight: 700,
              color: '#facc15',
              pointerEvents: 'none',
              zIndex: 40,
              animation: 'brainrot-floatUp 0.55s ease-out forwards',
              textShadow: '0 1px 4px rgba(0,0,0,0.9)',
            }}>
              {ft.text}
            </div>
          ))}

          {/* Paused overlay */}
          {phase === 'paused' && (
            <div style={{
              position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.62)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              zIndex: 50,
            }}>
              <div style={{ fontSize: 36, marginBottom: 8 }}>⏸</div>
              <p style={{ color: '#fff', fontFamily: 'var(--font-fredoka), Fredoka One, cursive', fontSize: 22, fontWeight: 700, margin: '0 0 16px' }}>
                Paused
              </p>
              <button
                onClick={() => { phaseRef.current = 'playing'; setPhase('playing') }}
                style={{
                  padding: '10px 24px', background: 'rgba(74,222,128,0.15)',
                  border: '1px solid rgba(74,222,128,0.3)', borderRadius: 8,
                  color: '#4ade80', cursor: 'pointer', fontWeight: 600, fontSize: 14,
                }}
              >
                ▶ Resume
              </button>
            </div>
          )}
        </div>
      </div>

      <p style={{ marginTop: 8, fontSize: 11, color: 'rgba(255,255,255,0.22)', textAlign: 'center' }}>
        Select a tower type · Click an empty tile to place · ➤ = entrance · 🏠 = exit
      </p>
    </div>
  )
}
