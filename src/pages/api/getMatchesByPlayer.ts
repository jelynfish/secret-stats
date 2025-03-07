import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const apiKey = process.env.VAL_API_KEY as string;

  const { region, puuid } = req.body;

  try {
    const response = await fetch(
      `https://api.henrikdev.xyz/valorant/v4/by-puuid/matches/${region}/pc/${puuid}?mode=competitive`,
      {
        method: "GET",
        headers: {
          Authorization: apiKey,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const jsonData = await response.json();
    const { data } = jsonData;
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to find matches for player...` });
  }
}
