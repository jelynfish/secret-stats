import { getMatchesByPlayerFromAPI } from "@/lib/api/matches";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { region, puuid, mode, size, start } = req.query;

  if (typeof region !== "string" || typeof puuid !== "string") {
    return res.status(400).json({ error: "Invalid region or puuid" });
  }

  try {
    const data = await getMatchesByPlayerFromAPI(
      region,
      puuid,
      mode as string,
      size as string,
      start as string
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: `Failed to find matches for player...` });
  }
}
