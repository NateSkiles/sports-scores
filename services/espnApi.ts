import { cache } from "react";

export interface Team {
  id: string;
  name: string;
  abbreviation: string;
  displayName: string;
  logo: string;
}

export interface Game {
  id: string;
  name: string;
  shortName: string;
  date: string;
  status: {
    type: {
      state: string;
    };
    displayClock: string;
    period: number;
  };
  competitions: Array<{
    competitors: Array<{
      id: string;
      homeAway: string;
      team: Team;
      score: string;
    }>;
  }>;
}

// services/espnApi.ts
export const getFootballScores = cache(async (): Promise<Game[]> => {
  try {
    // Add base URL for absolute path
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/football/scoreboard`, {
      next: { revalidate: 30 },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.events || [];
  } catch (error) {
    console.error("Error fetching NFL scores:", error);
    return [];
  }
}); 

export const getFootballTeams = cache(async (): Promise<Team[]> => {
  try {
    const response = await fetch("/api/football/teams", {
      next: {
        revalidate: 3600, // Cache teams for 1 hour
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.sports?.[0]?.leagues?.[0]?.teams || [];
  } catch (error) {
    console.error("Error fetching NFL teams:", error);
    return [];
  }
});
