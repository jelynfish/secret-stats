import type { NextApiRequest, NextApiResponse } from "next";
import { addPlayerToDB } from "@/lib/api/players";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { puuid, name, tag, region } = req.body;

  try {
    const data = await addPlayerToDB(puuid, name, tag, region);

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
}
