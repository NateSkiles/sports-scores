// app/api/football/scoreboard/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard",
      {
        headers: { "Content-Type": "application/json" },
        next: { revalidate: 30 },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Error fetching scoreboard data" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching scoreboard data:", error);
    return NextResponse.json(
      { error: "Error fetching scoreboard data" },
      { status: 500 }
    );
  }
}
