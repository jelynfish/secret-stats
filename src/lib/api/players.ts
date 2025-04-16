import { supabase } from "@/lib/supabase";
const API_BASE_URL = "https://api.henrikdev.xyz/valorant";
const API_KEY = process.env.VAL_API_KEY as string;

export async function getPlayerFromAPI(name: string, tag: string) {
  const response = await fetch(`${API_BASE_URL}/v2/account/${name}/${tag}`, {
    method: "GET",
    headers: {
      Authorization: API_KEY,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Error fetching player from the external API. Status: ${response.status}`
    );
  }

  const jsonData = await response.json();
  return jsonData.data;
}

export async function addPlayerToDB(
  puuid: string,
  name: string,
  tag: string,
  region: string
) {
  const { data, error } = await supabase.from("Players").upsert([
    {
      puuid,
      name,
      tag,
      region,
    },
  ]);

  if (error) {
    throw new Error(`Postgres Error: ${error.message} (Code: ${error.code})`);
  }

  return data;
}
