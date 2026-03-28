import { NextResponse, NextRequest } from "next/server";

const api_url = process.env.API_URL!;

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { success: false, message: "Missing trip id" },
      { status: 400 },
    );
  }

  try {
    const trip = await fetch(`${api_url}/api/trips/tripPlans/${id}`, {
      cache: "no-store",
    });

    if (!trip.ok) {
      return NextResponse.json(
        { success: false, message: "Trip not found" },
        { status: trip.status },
      );
    }

    const { data } = await trip.json();

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  console.log(id)

  if (!id) {
    return NextResponse.json(
      { success: false, message: "Missing trip id" },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(`${api_url}/api/trips/tripPlans/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: "Failed to delete trip" },
        { status: response.status },
      );
    }

    return NextResponse.json({ success: true, message: "Trip deleted" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
