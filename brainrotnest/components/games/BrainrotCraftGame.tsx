'use client'
import { useState, useCallback } from 'react'

interface Resource {
  id: string
  name: string
  emoji: string
}

interface Ingredient {
  id: string
  amount: number
}

interface Recipe {
  id: string
  name: string
  emoji: string
  ingredients: Ingredient[]
  reward: { points: number; description: string }
}

interface ClickEffect {
  id: number
  resource: string
  x: number
  y: number
}

interface LogEntry {
  id: number
  text: string
  emoji: string
  timestamp: number
}

const RESOURCES: Resource[] = [
  { id: 'brainrot', name: 'Brainrot', emoji: '🧠' },
  { id: 'chaos', name: 'Chaos', emoji: '💥' },
  { id: 'espresso', name: 'Espresso', emoji: '☕' },
  { id: 'feathers', name: 'Feathers', emoji: '🪶' },
  { id: 'scales', name: 'Scales', emoji: '🐊' },
  { id: 'rhythm', name: 'Rhythm', emoji: '🎵' },
]

const CRAFTING_RECIPES: Recipe[] = [
  {
    id: 'basic-nest',
    name: 'Basic Nest',
    emoji: '🪺',
    ingredients: [
      { id: 'brainrot', amount: 5 },
      { id: 'chaos', amount: 3 },
    ],
    reward: { points: 50, description: '+50 points' },
  },
  {
    id: 'espresso-bomb',
    name: 'Espresso Bomb',
    emoji: '💣',
    ingredients: [
      { id: 'espresso', amount: 5 },
      { id: 'chaos', amount: 5 },
    ],
    reward: { points: 150, description: '+150 points' },
  },
  {
    id: 'croc-armor',
    name: 'Croc Armor',
    emoji: '🛡️',
    ingredients: [
      { id: 'scales', amount: 8 },
      { id: 'chaos', amount: 3 },
    ],
    reward: { points: 300, description: '+300 points' },
  },
  {
    id: 'rhythm-blade',
    name: 'Rhythm Blade',
    emoji: '⚔️',
    ingredients: [
      { id: 'rhythm', amount: 10 },
      { id: 'feathers', amount: 5 },
    ],
    reward: { points: 500, description: '+500 points' },
  },
  {
    id: 'brainrot-potion',
    name: 'Brainrot Potion',
    emoji: '🧪',
    ingredients: [
      { id: 'brainrot', amount: 10 },
      { id: 'espresso', amount: 5 },
      { id: 'chaos', amount: 5 },
    ],
    reward: { points: 1000, description: '+1000 points' },
  },
  {
    id: 'satellite-dish',
    name: 'Satellite Dish',
    emoji: '📡',
    ingredients: [
      { id: 'scales', amount: 15 },
      { id: 'feathers', amount: 15 },
      { id: 'rhythm', amount: 15 },
    ],
    reward: { points: 5000, description: '+5000 points' },
  },
]

const CLICK_REWARD = 2

const RESOURCE_META: Record<string, { label: string }> = {
  brainrot: { label: 'Gather Brainrot' },
  chaos: { label: 'Create Chaos' },
  espresso: { label: 'Brew Espresso' },
  feathers: { label: 'Collect Feathers' },
  scales: { label: 'Harvest Scales' },
  rhythm: { label: 'Capture Rhythm' },
}

let nextEffectId = 0
let nextLogId = 0

export default function BrainrotCraftGame() {
  const [resources, setResources] = useState<Record<string, number>>(() =>
    Object.fromEntries(RESOURCES.map((r) => [r.id, 0]))
  )
  const [points, setPoints] = useState(0)
  const [craftedItems, setCraftedItems] = useState<string[]>([])
  const [clickEffects, setClickEffects] = useState<ClickEffect[]>([])
  const [craftLog, setCraftLog] = useState<LogEntry[]>([])
  const [bouncingBtn, setBouncingBtn] = useState<string | null>(null)

  const handleGather = useCallback(
    (resourceId: string, e: React.MouseEvent<HTMLButtonElement>) => {
      setResources((prev) => ({ ...prev, [resourceId]: prev[resourceId] + CLICK_REWARD }))

      const rect = e.currentTarget.getBoundingClientRect()
      const id = nextEffectId++
      setClickEffects((prev) => [
        ...prev,
        { id, resource: resourceId, x: rect.left + rect.width / 2, y: rect.top },
      ])
      setTimeout(() => {
        setClickEffects((prev) => prev.filter((ef) => ef.id !== id))
      }, 900)

      setBouncingBtn(resourceId)
      setTimeout(() => setBouncingBtn(null), 300)
    },
    []
  )

  const canCraft = useCallback(
    (recipe: Recipe): boolean => {
      return recipe.ingredients.every((ing) => resources[ing.id] >= ing.amount)
    },
    [resources]
  )

  const handleCraft = useCallback(
    (recipe: Recipe) => {
      if (!canCraft(recipe)) return
      setResources((prev) => {
        const updated = { ...prev }
        recipe.ingredients.forEach((ing) => {
          updated[ing.id] = updated[ing.id] - ing.amount
        })
        return updated
      })
      setPoints((prev) => prev + recipe.reward.points)
      setCraftedItems((prev) => [...prev, recipe.id])

      const logId = nextLogId++
      const entry: LogEntry = {
        id: logId,
        text: `Crafted ${recipe.name} — ${recipe.reward.description}`,
        emoji: recipe.emoji,
        timestamp: Date.now(),
      }
      setCraftLog((prev) => [entry, ...prev].slice(0, 5))
    },
    [canCraft]
  )

  const uniqueCrafted = new Set(craftedItems).size

  return (
    <div style={{ color: '#fff', fontFamily: 'inherit', userSelect: 'none' }}>
      {/* Click effect portals */}
      {clickEffects.map((ef) => (
        <div
          key={ef.id}
          style={{
            position: 'fixed',
            left: ef.x,
            top: ef.y,
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 9999,
            fontSize: '18px',
            fontWeight: 700,
            color: '#4ade80',
            animation: 'floatUp 0.9s ease-out forwards',
          }}
        >
          +{CLICK_REWARD}
        </div>
      ))}

      <style>{`
        @keyframes floatUp {
          0% { opacity: 1; transform: translate(-50%, -50%) translateY(0); }
          100% { opacity: 0; transform: translate(-50%, -50%) translateY(-60px); }
        }
        @keyframes btnBounce {
          0% { transform: scale(1); }
          40% { transform: scale(0.92); }
          70% { transform: scale(1.06); }
          100% { transform: scale(1); }
        }
        .btn-bounce { animation: btnBounce 0.3s ease; }
      `}</style>

      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '24px',
          padding: '16px 20px',
          background: 'rgba(255,255,255,0.04)',
          borderRadius: '12px',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-fredoka), Fredoka One, cursive',
            fontSize: '26px',
            fontWeight: 700,
            margin: 0,
            color: '#fff',
          }}
        >
          ⚒️ Brainrot Craft
        </h2>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <div
            style={{
              background: 'rgba(250,204,21,0.12)',
              border: '1px solid rgba(250,204,21,0.25)',
              borderRadius: '8px',
              padding: '8px 16px',
              fontSize: '15px',
              fontWeight: 700,
              color: '#facc15',
            }}
          >
            ✨ Points: {points.toLocaleString()}
          </div>
          <div
            style={{
              background: 'rgba(74,222,128,0.1)',
              border: '1px solid rgba(74,222,128,0.25)',
              borderRadius: '8px',
              padding: '8px 16px',
              fontSize: '15px',
              fontWeight: 700,
              color: '#4ade80',
            }}
          >
            🏆 Crafted: {uniqueCrafted} / {CRAFTING_RECIPES.length}
          </div>
        </div>
      </div>

      {/* Main two-column layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
          marginBottom: '20px',
        }}
      >
        {/* Left: Gather Resources */}
        <div
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '12px',
            padding: '20px',
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-fredoka), Fredoka One, cursive',
              fontSize: '18px',
              fontWeight: 700,
              color: '#fff',
              margin: '0 0 16px',
            }}
          >
            Gather Resources
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '10px',
            }}
          >
            {RESOURCES.map((res) => (
              <button
                key={res.id}
                className={bouncingBtn === res.id ? 'btn-bounce' : ''}
                onClick={(e) => handleGather(res.id, e)}
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '10px',
                  padding: '12px 10px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  color: '#fff',
                  transition: 'background 0.15s, border-color 0.15s',
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLButtonElement).style.background =
                    'rgba(255,255,255,0.1)'
                  ;(e.currentTarget as HTMLButtonElement).style.borderColor =
                    'rgba(255,255,255,0.22)'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLButtonElement).style.background =
                    'rgba(255,255,255,0.06)'
                  ;(e.currentTarget as HTMLButtonElement).style.borderColor =
                    'rgba(255,255,255,0.12)'
                }}
              >
                <div style={{ fontSize: '26px', marginBottom: '4px' }}>{res.emoji}</div>
                <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>
                  {RESOURCE_META[res.id].label}
                </div>
                <div
                  style={{
                    fontSize: '12px',
                    color: 'rgba(255,255,255,0.5)',
                  }}
                >
                  You have:{' '}
                  <span style={{ color: '#a5f3fc', fontWeight: 700 }}>
                    {resources[res.id]}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Craft Items */}
        <div
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '12px',
            padding: '20px',
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-fredoka), Fredoka One, cursive',
              fontSize: '18px',
              fontWeight: 700,
              color: '#fff',
              margin: '0 0 16px',
            }}
          >
            Craft Items
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {CRAFTING_RECIPES.map((recipe) => {
              const craftable = canCraft(recipe)
              const craftedCount = craftedItems.filter((id) => id === recipe.id).length

              return (
                <div
                  key={recipe.id}
                  style={{
                    background: craftable
                      ? 'rgba(74,222,128,0.06)'
                      : 'rgba(255,255,255,0.03)',
                    border: craftable
                      ? '1px solid rgba(74,222,128,0.2)'
                      : '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '10px',
                    padding: '12px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  {/* Emoji + name */}
                  <div style={{ flexShrink: 0, textAlign: 'center', minWidth: '44px' }}>
                    <div style={{ fontSize: '24px' }}>{recipe.emoji}</div>
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>
                      {recipe.reward.description}
                    </div>
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: '14px',
                        fontWeight: 700,
                        color: '#fff',
                        marginBottom: '5px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      {recipe.name}
                      {craftedCount > 0 && (
                        <span
                          style={{
                            background: 'rgba(74,222,128,0.15)',
                            border: '1px solid rgba(74,222,128,0.3)',
                            color: '#4ade80',
                            borderRadius: '20px',
                            padding: '1px 8px',
                            fontSize: '11px',
                            fontWeight: 600,
                          }}
                        >
                          ✓ ×{craftedCount}
                        </span>
                      )}
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {recipe.ingredients.map((ing) => {
                        const res = RESOURCES.find((r) => r.id === ing.id)!
                        const have = resources[ing.id]
                        const enough = have >= ing.amount
                        return (
                          <span
                            key={ing.id}
                            style={{
                              fontSize: '11px',
                              color: enough ? '#4ade80' : 'rgba(255,255,255,0.45)',
                              background: enough
                                ? 'rgba(74,222,128,0.08)'
                                : 'rgba(255,255,255,0.05)',
                              borderRadius: '6px',
                              padding: '2px 7px',
                            }}
                          >
                            {res.emoji} {ing.amount} / {have}
                          </span>
                        )
                      })}
                    </div>
                  </div>

                  {/* Craft button */}
                  <button
                    onClick={() => handleCraft(recipe)}
                    disabled={!craftable}
                    style={{
                      flexShrink: 0,
                      padding: '7px 14px',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: craftable ? 'pointer' : 'not-allowed',
                      border: 'none',
                      background: craftable
                        ? 'linear-gradient(135deg, #4ade80, #22c55e)'
                        : 'rgba(255,255,255,0.08)',
                      color: craftable ? '#000' : 'rgba(255,255,255,0.25)',
                      transition: 'opacity 0.15s',
                      opacity: craftable ? 1 : 0.7,
                    }}
                  >
                    {craftable ? 'Craft!' : 'Need more'}
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Crafting Log */}
      <div
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '12px',
          padding: '16px 20px',
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-fredoka), Fredoka One, cursive',
            fontSize: '16px',
            fontWeight: 700,
            color: 'rgba(255,255,255,0.6)',
            margin: '0 0 10px',
          }}
        >
          Crafting Log
        </h3>
        {craftLog.length === 0 ? (
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px', margin: 0 }}>
            No items crafted yet. Gather resources and start crafting!
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {craftLog.map((entry) => (
              <div
                key={entry.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.6)',
                }}
              >
                <span style={{ fontSize: '16px' }}>{entry.emoji}</span>
                <span>{entry.text}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
