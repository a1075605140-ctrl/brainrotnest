'use client'
import { useState, useCallback } from 'react'

const CHARACTERS = [
  { id: 'tralalero', name: 'Tralalero Tralala', emoji: '🦈', power: 1 },
  { id: 'bombardiro', name: 'Bombardiro Crocodilo', emoji: '🐊', power: 5 },
  { id: 'tung-tung', name: 'Tung Tung Sahur', emoji: '🥁', power: 3 },
  { id: 'ballerina', name: 'Ballerina Cappuccina', emoji: '☕', power: 2 },
  { id: 'cappuccino', name: 'Cappuccino Assassino', emoji: '💀', power: 6 },
  { id: 'lirili', name: 'Lirili Larila', emoji: '🌺', power: 2 },
  { id: 'bobrito', name: 'Bobrito Bandito', emoji: '🤠', power: 4 },
  { id: 'frulli', name: 'Frulli Frulla', emoji: '🍓', power: 2 },
  { id: 'brr-brr', name: 'Brr Brr Patapim', emoji: '🐸', power: 3 },
  { id: 'la-vaca', name: 'La Vaca Saturno', emoji: '🐄', power: 8 },
]

interface Character {
  id: string
  name: string
  emoji: string
  power: number
}

type GameState = 'intro' | 'playing' | 'result'

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function initGame() {
  const shuffled = shuffleArray(CHARACTERS)
  return {
    playerHand: shuffled.slice(0, 3),
    aiHand: shuffled.slice(3, 6),
    deck: shuffled.slice(6),
    playerCollection: [] as Character[],
    aiCollection: [] as Character[],
  }
}

export default function StealBrainrotGame() {
  const [gameState, setGameState] = useState<GameState>('intro')
  const [playerHand, setPlayerHand] = useState<Character[]>([])
  const [aiHand, setAiHand] = useState<Character[]>([])
  const [deck, setDeck] = useState<Character[]>([])
  const [playerCollection, setPlayerCollection] = useState<Character[]>([])
  const [aiCollection, setAiCollection] = useState<Character[]>([])
  const [selectedCard, setSelectedCard] = useState<string | null>(null)
  const [lastAction, setLastAction] = useState<string | null>(null)
  const [turn, setTurn] = useState(1)
  const [isAnimating, setIsAnimating] = useState(false)

  const startGame = useCallback(() => {
    const init = initGame()
    setPlayerHand(init.playerHand)
    setAiHand(init.aiHand)
    setDeck(init.deck)
    setPlayerCollection(init.playerCollection)
    setAiCollection(init.aiCollection)
    setSelectedCard(null)
    setLastAction(null)
    setTurn(1)
    setIsAnimating(false)
    setGameState('playing')
  }, [])

  const checkGameOver = useCallback(
    (
      currentDeck: Character[],
      pHand: Character[],
      aHand: Character[],
      pCol: Character[],
      aCol: Character[]
    ) => {
      if (currentDeck.length === 0) {
        setPlayerHand(pHand)
        setAiHand(aHand)
        setDeck(currentDeck)
        setPlayerCollection(pCol)
        setAiCollection(aCol)
        setGameState('result')
        return true
      }
      return false
    },
    []
  )

  const handleSteal = useCallback(() => {
    if (!selectedCard || isAnimating) return

    const playerCard = playerHand.find((c) => c.id === selectedCard)
    if (!playerCard) return

    setIsAnimating(true)

    const aiTargetIndex = Math.floor(Math.random() * aiHand.length)
    const aiTargetCard = aiHand[aiTargetIndex]

    let newPlayerHand = [...playerHand]
    let newAiHand = [...aiHand]
    let newDeck = [...deck]
    let newPlayerCollection = [...playerCollection]
    let newAiCollection = [...aiCollection]
    let action = ''

    if (playerCard.power > aiTargetCard.power) {
      // Player wins: steal AI card, AI draws from deck
      newPlayerCollection = [...playerCollection, aiTargetCard]
      newAiHand = newAiHand.filter((_, i) => i !== aiTargetIndex)
      if (newDeck.length > 0) {
        newAiHand = [...newAiHand, newDeck[0]]
        newDeck = newDeck.slice(1)
      }
      action = `🎉 You stole ${aiTargetCard.name}!`
    } else {
      // AI wins: AI steals player card, player draws from deck
      newAiCollection = [...aiCollection, playerCard]
      newPlayerHand = newPlayerHand.filter((c) => c.id !== selectedCard)
      if (newDeck.length > 0) {
        newPlayerHand = [...newPlayerHand, newDeck[0]]
        newDeck = newDeck.slice(1)
      }
      action = `😤 AI blocked and stole your ${playerCard.name}!`
    }

    setLastAction(action)
    setSelectedCard(null)

    const playerTurnDone = () => {
      if (checkGameOver(newDeck, newPlayerHand, newAiHand, newPlayerCollection, newAiCollection)) {
        setIsAnimating(false)
        return
      }

      setPlayerHand(newPlayerHand)
      setAiHand(newAiHand)
      setDeck(newDeck)
      setPlayerCollection(newPlayerCollection)
      setAiCollection(newAiCollection)
      setTurn((t) => t + 1)

      // AI turn
      if (newAiHand.length === 0 || newPlayerHand.length === 0) {
        setIsAnimating(false)
        return
      }

      setTimeout(() => {
        const aiAttackIndex = Math.floor(Math.random() * newAiHand.length)
        const aiAttackCard = newAiHand[aiAttackIndex]
        const playerTargetIndex = Math.floor(Math.random() * newPlayerHand.length)
        const playerTargetCard = newPlayerHand[playerTargetIndex]

        let aiTurnPlayerHand = [...newPlayerHand]
        let aiTurnAiHand = [...newAiHand]
        let aiTurnDeck = [...newDeck]
        let aiTurnPlayerCollection = [...newPlayerCollection]
        let aiTurnAiCollection = [...newAiCollection]
        let aiAction = ''

        if (aiAttackCard.power > playerTargetCard.power) {
          aiTurnAiCollection = [...aiTurnAiCollection, playerTargetCard]
          aiTurnPlayerHand = aiTurnPlayerHand.filter((_, i) => i !== playerTargetIndex)
          if (aiTurnDeck.length > 0) {
            aiTurnPlayerHand = [...aiTurnPlayerHand, aiTurnDeck[0]]
            aiTurnDeck = aiTurnDeck.slice(1)
          }
          aiAction = `😤 AI stole your ${playerTargetCard.name}!`
        } else {
          aiTurnPlayerCollection = [...aiTurnPlayerCollection, aiAttackCard]
          aiTurnAiHand = aiTurnAiHand.filter((_, i) => i !== aiAttackIndex)
          if (aiTurnDeck.length > 0) {
            aiTurnAiHand = [...aiTurnAiHand, aiTurnDeck[0]]
            aiTurnDeck = aiTurnDeck.slice(1)
          }
          aiAction = `🎉 You defended! Stole AI's ${aiAttackCard.name}!`
        }

        setLastAction(aiAction)

        if (
          !checkGameOver(
            aiTurnDeck,
            aiTurnPlayerHand,
            aiTurnAiHand,
            aiTurnPlayerCollection,
            aiTurnAiCollection
          )
        ) {
          setPlayerHand(aiTurnPlayerHand)
          setAiHand(aiTurnAiHand)
          setDeck(aiTurnDeck)
          setPlayerCollection(aiTurnPlayerCollection)
          setAiCollection(aiTurnAiCollection)
          setTurn((t) => t + 1)
        }

        setIsAnimating(false)
      }, 1200)
    }

    setTimeout(playerTurnDone, 600)
  }, [
    selectedCard,
    isAnimating,
    playerHand,
    aiHand,
    deck,
    playerCollection,
    aiCollection,
    checkGameOver,
  ])

  if (gameState === 'intro') {
    return (
      <div
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '16px',
          padding: '48px 32px',
          textAlign: 'center',
          maxWidth: '480px',
          margin: '0 auto',
        }}
      >
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>🃏</div>
        <h2
          style={{
            fontFamily: 'var(--font-fredoka), Fredoka One, cursive',
            fontSize: '32px',
            fontWeight: 700,
            color: '#fff',
            margin: '0 0 8px',
          }}
        >
          Steal a Brainrot
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '32px', fontSize: '15px' }}>
          Outsmart the AI. Steal their cards. Win.
        </p>

        <div
          style={{
            background: 'rgba(255,255,255,0.04)',
            borderRadius: '12px',
            padding: '20px 24px',
            marginBottom: '32px',
            textAlign: 'left',
          }}
        >
          {[
            ['🃏', 'Each side starts with 3 random character cards'],
            ['⚔️', 'Play a card — if your Power beats theirs, you steal it'],
            ['📦', 'If you lose, they steal yours. Draw from the deck to refill'],
            ['🏆', 'When the deck runs out, most cards collected wins'],
          ].map(([icon, text]) => (
            <div
              key={text}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                marginBottom: '12px',
                color: 'rgba(255,255,255,0.7)',
                fontSize: '14px',
                lineHeight: 1.5,
              }}
            >
              <span style={{ fontSize: '18px', flexShrink: 0 }}>{icon}</span>
              <span>{text}</span>
            </div>
          ))}
        </div>

        <button
          onClick={startGame}
          style={{
            background: 'linear-gradient(135deg, #22c55e, #16a34a)',
            border: 'none',
            borderRadius: '12px',
            padding: '14px 36px',
            color: '#fff',
            fontSize: '17px',
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: 'var(--font-fredoka), Fredoka One, cursive',
            letterSpacing: '0.02em',
          }}
        >
          Start Game →
        </button>
      </div>
    )
  }

  if (gameState === 'result') {
    const playerScore = playerCollection.length
    const aiScore = aiCollection.length
    const isWin = playerScore > aiScore
    const isTie = playerScore === aiScore

    return (
      <div
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '16px',
          padding: '48px 24px',
          textAlign: 'center',
          maxWidth: '520px',
          margin: '0 auto',
        }}
      >
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>
          {isTie ? '🤝' : isWin ? '🎉' : '😤'}
        </div>
        <h2
          style={{
            fontFamily: 'var(--font-fredoka), Fredoka One, cursive',
            fontSize: '36px',
            fontWeight: 700,
            color: isTie ? '#facc15' : isWin ? '#4ade80' : '#f87171',
            margin: '0 0 8px',
          }}
        >
          {isTie ? "It's a Tie!" : isWin ? 'You Win!' : 'AI Wins!'}
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '24px', fontSize: '15px' }}>
          {isTie
            ? 'Both sides collected the same number!'
            : isWin
              ? `You stole ${playerScore} character${playerScore !== 1 ? 's' : ''}!`
              : 'Better luck next time'}
        </p>

        <div
          style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              background: 'rgba(74,222,128,0.1)',
              border: '1px solid rgba(74,222,128,0.25)',
              borderRadius: '12px',
              padding: '16px 24px',
              minWidth: '120px',
            }}
          >
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#4ade80' }}>
              {playerScore}
            </div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', marginTop: '4px' }}>
              Your cards
            </div>
          </div>
          <div
            style={{
              background: 'rgba(248,113,113,0.1)',
              border: '1px solid rgba(248,113,113,0.25)',
              borderRadius: '12px',
              padding: '16px 24px',
              minWidth: '120px',
            }}
          >
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#f87171' }}>{aiScore}</div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', marginTop: '4px' }}>
              AI cards
            </div>
          </div>
        </div>

        {playerCollection.length > 0 && (
          <div style={{ marginBottom: '32px' }}>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', marginBottom: '10px' }}>
              YOUR COLLECTION
            </p>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                justifyContent: 'center',
              }}
            >
              {playerCollection.map((c, i) => (
                <div
                  key={`${c.id}-${i}`}
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    fontSize: '20px',
                  }}
                  title={c.name}
                >
                  {c.emoji}
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={startGame}
          style={{
            background: 'linear-gradient(135deg, #22c55e, #16a34a)',
            border: 'none',
            borderRadius: '12px',
            padding: '14px 36px',
            color: '#fff',
            fontSize: '17px',
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: 'var(--font-fredoka), Fredoka One, cursive',
          }}
        >
          Play Again
        </button>
      </div>
    )
  }

  // Playing state
  return (
    <div style={{ maxWidth: '640px', margin: '0 auto' }}>
      {/* Status bar */}
      <div
        style={{
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap',
          marginBottom: '20px',
          justifyContent: 'center',
        }}
      >
        {[
          { label: 'Turn', value: turn },
          { label: 'Your Cards', value: playerCollection.length, color: '#4ade80' },
          { label: 'AI Cards', value: aiCollection.length, color: '#f87171' },
          { label: 'Deck Left', value: deck.length, color: '#facc15' },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '8px',
              padding: '6px 14px',
              fontSize: '13px',
              color: 'rgba(255,255,255,0.5)',
            }}
          >
            {label}:{' '}
            <span style={{ fontWeight: 700, color: color ?? '#fff' }}>{value}</span>
          </div>
        ))}
      </div>

      {/* AI zone */}
      <div
        style={{
          background: 'rgba(248,113,113,0.05)',
          border: '1px solid rgba(248,113,113,0.15)',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '16px',
        }}
      >
        <p
          style={{
            color: 'rgba(255,255,255,0.4)',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.08em',
            marginBottom: '12px',
          }}
        >
          AI&apos;S HAND
        </p>

        {/* AI hand cards (face down) */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
          {aiHand.map((_, i) => (
            <div
              key={i}
              style={{
                background: 'linear-gradient(135deg, rgba(248,113,113,0.2), rgba(239,68,68,0.1))',
                border: '1px solid rgba(248,113,113,0.3)',
                borderRadius: '10px',
                width: '64px',
                height: '88px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                color: 'rgba(255,255,255,0.25)',
                fontSize: '24px',
              }}
            >
              ?
            </div>
          ))}
          {aiHand.length === 0 && (
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>No cards</span>
          )}
        </div>

        {/* AI collection */}
        {aiCollection.length > 0 && (
          <div>
            <p
              style={{
                color: 'rgba(255,255,255,0.3)',
                fontSize: '10px',
                letterSpacing: '0.06em',
                marginBottom: '6px',
              }}
            >
              COLLECTED ({aiCollection.length})
            </p>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {aiCollection.map((c, i) => (
                <div
                  key={`${c.id}-${i}`}
                  style={{
                    background: 'rgba(248,113,113,0.1)',
                    borderRadius: '6px',
                    padding: '4px 8px',
                    fontSize: '16px',
                  }}
                  title={c.name}
                >
                  {c.emoji}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action area */}
      <div
        style={{
          textAlign: 'center',
          padding: '16px',
          marginBottom: '16px',
        }}
      >
        {lastAction && (
          <p
            style={{
              color: lastAction.startsWith('🎉') ? '#4ade80' : '#facc15',
              fontSize: '15px',
              fontWeight: 600,
              marginBottom: '12px',
              minHeight: '24px',
              transition: 'all 0.3s',
            }}
          >
            {lastAction}
          </p>
        )}

        <button
          onClick={handleSteal}
          disabled={!selectedCard || isAnimating}
          style={{
            background:
              selectedCard && !isAnimating
                ? 'linear-gradient(135deg, #f59e0b, #d97706)'
                : 'rgba(255,255,255,0.06)',
            border:
              selectedCard && !isAnimating
                ? '1px solid rgba(245,158,11,0.5)'
                : '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px',
            padding: '12px 32px',
            color: selectedCard && !isAnimating ? '#fff' : 'rgba(255,255,255,0.25)',
            fontSize: '16px',
            fontWeight: 700,
            cursor: selectedCard && !isAnimating ? 'pointer' : 'not-allowed',
            fontFamily: 'var(--font-fredoka), Fredoka One, cursive',
            letterSpacing: '0.04em',
            transition: 'all 0.2s',
          }}
        >
          {isAnimating ? '⏳ Stealing...' : '⚔️ Steal!'}
        </button>

        {!selectedCard && !isAnimating && (
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px', marginTop: '8px' }}>
            Select a card from your hand first
          </p>
        )}
      </div>

      {/* Player zone */}
      <div
        style={{
          background: 'rgba(74,222,128,0.05)',
          border: '1px solid rgba(74,222,128,0.15)',
          borderRadius: '12px',
          padding: '16px',
        }}
      >
        <p
          style={{
            color: 'rgba(255,255,255,0.4)',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.08em',
            marginBottom: '12px',
          }}
        >
          YOUR HAND
        </p>

        {/* Player hand cards */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '12px' }}>
          {playerHand.map((card) => {
            const isSelected = selectedCard === card.id
            return (
              <button
                key={card.id}
                onClick={() => !isAnimating && setSelectedCard(isSelected ? null : card.id)}
                style={{
                  background: isSelected
                    ? 'linear-gradient(135deg, rgba(250,204,21,0.25), rgba(234,179,8,0.15))'
                    : 'linear-gradient(135deg, rgba(74,222,128,0.12), rgba(34,197,94,0.06))',
                  border: isSelected
                    ? '2px solid #facc15'
                    : '1px solid rgba(74,222,128,0.25)',
                  borderRadius: '10px',
                  padding: '10px',
                  cursor: isAnimating ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  minWidth: '80px',
                  transition: 'all 0.15s',
                  transform: isSelected ? 'translateY(-4px)' : 'none',
                }}
              >
                <span style={{ fontSize: '28px' }}>{card.emoji}</span>
                <span
                  style={{
                    color: '#fff',
                    fontSize: '10px',
                    fontWeight: 600,
                    lineHeight: 1.2,
                    textAlign: 'center',
                    maxWidth: '72px',
                  }}
                >
                  {card.name.split(' ').slice(0, 2).join(' ')}
                </span>
                <div
                  style={{
                    background: 'rgba(250,204,21,0.15)',
                    border: '1px solid rgba(250,204,21,0.3)',
                    borderRadius: '4px',
                    padding: '2px 6px',
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#facc15',
                    marginTop: '2px',
                  }}
                >
                  PWR {card.power}
                </div>
              </button>
            )
          })}
          {playerHand.length === 0 && (
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>No cards</span>
          )}
        </div>

        {/* Player collection */}
        {playerCollection.length > 0 && (
          <div>
            <p
              style={{
                color: 'rgba(255,255,255,0.3)',
                fontSize: '10px',
                letterSpacing: '0.06em',
                marginBottom: '6px',
              }}
            >
              COLLECTED ({playerCollection.length})
            </p>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {playerCollection.map((c, i) => (
                <div
                  key={`${c.id}-${i}`}
                  style={{
                    background: 'rgba(74,222,128,0.1)',
                    borderRadius: '6px',
                    padding: '4px 8px',
                    fontSize: '16px',
                  }}
                  title={c.name}
                >
                  {c.emoji}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
