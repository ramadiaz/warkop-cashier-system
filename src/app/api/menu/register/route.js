import fetchWithAuth from "@/utilities/fetchWithAuth";

export async function POST(req) {
  const data = await req.json();

  try {
    const apiRes = await fetchWithAuth(
      `${process.env.BASE_API_URL}/menu/register`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );

    if (apiRes.ok) {
      const data = await apiRes.json();
      return new Response(JSON.stringify(data), { status: 200 });
    } else {
      const errorData = await apiRes.json();
      return new Response(JSON.stringify({ error: errorData.error }), {
        status: apiRes.status,
      });
    }
  } catch (err) {
    return new Response(JSON.stringify({ error: err }), {
      status: 500,
    });
  }
}
