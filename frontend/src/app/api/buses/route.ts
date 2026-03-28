import { NextResponse } from "next/server";

const api_url = process.env.API_URL!;

export async function GET() {

  try {
    const buses = await fetch(`${api_url}/api/buses`, {
      cache: "no-store",
    });

    if (!buses.ok) {
      return NextResponse.json(
        { success: false, message: "No bus founded" },
        { status: buses.status },
      );
    }

    const { data } = await buses.json();

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}