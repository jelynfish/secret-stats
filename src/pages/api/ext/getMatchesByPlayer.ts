import { getMatchesByPlayerFromAPI } from "@/lib/api/matches";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { region, puuid } = req.body;
  try {
    const data = await getMatchesByPlayerFromAPI(
      region, puuid
    )
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: `Failed to find matches for player...` });
  }
}
