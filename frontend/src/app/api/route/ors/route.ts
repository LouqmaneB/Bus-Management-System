import { NextResponse } from "next/server";

const ORS_API_KEY = process.env.ORS_API_KEY!;

export async function POST(req: Request) {
  try {
    const { coordinates } = await req.json();

    if (!coordinates || coordinates.length < 2) {
      return NextResponse.json(
        { error: "At least 2 coordinates required" },
        { status: 400 }
      );
    }

    const orsRes = await fetch(
      "https://api.openrouteservice.org/v2/directions/driving-car/geojson",
      {
        method: "POST",
        headers: {
          Authorization: ORS_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ coordinates }),
      }
    );

    const orsData = await orsRes.json();

    if (
      !orsData ||
      orsData.type !== "FeatureCollection" ||
      !orsData.features?.length
    ) {
      return NextResponse.json(
        { error: "Invalid ORS GeoJSON", raw: orsData },
        { status: 500 }
      );
    }

    return NextResponse.json({
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: orsData.features[0].geometry,
          properties: {},
        },
      ],
    });
  } catch (err) {
    return NextResponse.json(
      { error: `- ORS request failed;\n- ${err}` },
      { status: 500 }
    );
  }
}
