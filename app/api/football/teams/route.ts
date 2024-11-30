import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(
      "http://site.api.espn.com/apis/site/v2/sports/football/nfl/teams",
      {
        next: {
          revalidate: 3600 // Cache for 1 hour
        }
      }
    );

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching teams data" },
      { status: 500 }
    );
  }
}
