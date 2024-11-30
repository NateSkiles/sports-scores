import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { team: string } }
) {
  try {
    const response = await fetch(
      `http://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/${params.team}`,
      {
        next: {
          revalidate: 3600 // Cache for 1 hour
        }
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Team not found" },
        { status: 404 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching team data" },
      { status: 500 }
    );
  }
}
