import type { NextApiRequest, NextApiResponse } from "next";
import { getPlayerFromAPI } from "@/lib/api/players";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { name, tag } = req.query;
  if (typeof name !== 'string' || typeof tag !== 'string') {
    return res.status(400).json({ error: "Invalid name or tag" });
  }

  try {
    const data = await getPlayerFromAPI(name, tag)
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: `Failed to find player ${name}#${tag}.` })
  }
}
