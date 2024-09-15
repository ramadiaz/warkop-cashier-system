import fetchWithAuth from "@/utilities/fetchWithAuth";

export async function POST(req) {
  const url = new URL(req.url);

  try {
    const apiRes = await fetchWithAuth(
      `${process.env.BASE_API_URL}/user/request-reset${url.search}`,
      {
        method: "POST",
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
