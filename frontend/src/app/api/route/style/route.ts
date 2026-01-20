// /api/route/style/

export async function GET() {
  const res = await fetch(
    `https://api.maptiler.com/maps/streets/style.json?key=${process.env.MAPTILER_KEY}`
  );
  const data = await res.json();
  return new Response(JSON.stringify(data), { status: 200 });
}
