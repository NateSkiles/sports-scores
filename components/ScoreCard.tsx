import { Game } from '@/services/espnApi'
import Image from 'next/image'

interface ScoreCardProps {
  game: Game
}

export default function ScoreCard({ game }: ScoreCardProps) {
  const homeTeam = game.competitions[0].competitors.find(c => c.homeAway === 'home')
  const awayTeam = game.competitions[0].competitors.find(c => c.homeAway === 'away')

  if (!homeTeam || !awayTeam) return null

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-2">{game.name}</h2>
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <Image src={awayTeam.team.logo} alt={awayTeam.team.displayName} width={32} height={32} className="mr-2" />
          <p>{awayTeam.team.abbreviation}</p>
        </div>
        <p>{awayTeam.score}</p>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Image src={homeTeam.team.logo} alt={homeTeam.team.displayName} width={32} height={32} className="mr-2" />
          <p>{homeTeam.team.abbreviation}</p>
        </div>
        <p>{homeTeam.score}</p>
      </div>
      <div className="mt-2 text-sm text-gray-600">
        <p>Status: {game.status.type.state}</p>
        <p>Clock: {game.status.displayClock}</p>
        <p>Period: {game.status.period}</p>
      </div>
    </div>
  )
}

