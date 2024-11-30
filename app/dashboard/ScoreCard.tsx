"use client";
import { Game } from "@/services/espnApi";
import Image from "next/image";
import { useState } from "react";

interface ScoreCardProps {
  game: Game;
}

export default function ScoreCard({ game }: ScoreCardProps) {
  const [errorImages, setErrorImages] = useState<Record<string, boolean>>({});

  const homeTeam = game.competitions[0].competitors.find(
    (c) => c.homeAway === "home"
  );
  const awayTeam = game.competitions[0].competitors.find(
    (c) => c.homeAway === "away"
  );

  if (!homeTeam || !awayTeam) return null;

  const TeamLogo = ({ src, alt }: { src: string; alt: string }) => {
    const hasError = errorImages[src];

    if (hasError) {
      return (
        <div className="w-8 h-8 bg-gray-200 rounded-full mr-2 flex items-center justify-center">
          <span className="text-xs text-gray-500">{alt.charAt(0)}</span>
        </div>
      );
    }

    return (
      <Image
        src={src}
        alt={alt}
        width={32}
        height={32}
        className="mr-2"
        onError={() => {
          setErrorImages((prev) => ({
            ...prev,
            [src]: true,
          }));
        }}
        unoptimized
      />
    );
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-2">{game.name}</h2>
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <TeamLogo src={awayTeam.team.logo} alt={awayTeam.team.displayName} />
          <p>{awayTeam.team.abbreviation}</p>
        </div>
        <p>{awayTeam.score}</p>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <TeamLogo src={homeTeam.team.logo} alt={homeTeam.team.displayName} />
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
  );
}
