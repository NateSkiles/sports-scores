import { getFootballScores } from "@/services/espnApi";
import ScoreCard from "./ScoreCard";

export default async function Dashboard() {
  const scores = await getFootballScores();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">NFL Scores</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {scores.map((game) => (
          <ScoreCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}
