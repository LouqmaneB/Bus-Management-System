import { NextResponse } from "next/server";

const api_url = process.env.API_URL!;

export async function GET() {

  try {
    const route = await fetch(`${api_url}/api/routes`, {
      cache: "no-store",
    });

    if (!route.ok) {
      return NextResponse.json(
        { success: false, message: "No route founded" },
        { status: route.status },
      );
    }

    const { data } = await route.json();

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}