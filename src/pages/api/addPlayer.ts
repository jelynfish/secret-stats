import { supabase } from "@/libs/lib/supabase";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { puuid, name, tag, region } = req.body;

  try {
    const { data, error } = await supabase.from("Players").upsert([
      {
        puuid,
        name,
        tag,
        region,
      },
    ]);

    if (error) {
      throw error;
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
}
