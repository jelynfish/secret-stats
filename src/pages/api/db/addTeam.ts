import { addTeamToDB } from "@/lib/api/teams";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name } = req.body;

  try {
    const data = addTeamToDB(name)

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
}
