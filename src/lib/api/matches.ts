const API_BASE_URL = "https://api.henrikdev.xyz/valorant";
const API_KEY = process.env.VAL_API_KEY as string;

export async function getMatchesByPlayerFromAPI(
  region: string,
  puuid: string,
  mode: string = "competitive",
  size: string = "10",
  start: string = "0"
) {
  const response = await fetch(
    `${API_BASE_URL}/v4/by-puuid/matches/${region}/pc/${puuid}?mode=${mode}&size=${size}&start=${start}`,
    {
      method: "GET",
      headers: {
        Authorization: API_KEY,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `Error fetching matches from the external API. Status: ${response.status}`
    );
  }

  const jsonData = await response.json();
  return jsonData.data;
}
