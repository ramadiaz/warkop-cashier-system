import fetchWithAuth from "@/utilities/fetchWithAuth";

export async function GET(req) {
  try {
    const apiRes = await fetchWithAuth(
      `${process.env.BASE_API_URL}/transaction/history`,
      {
        method: "GET",
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
