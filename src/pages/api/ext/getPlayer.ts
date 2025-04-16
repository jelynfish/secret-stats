import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const apiKey = process.env.VAL_API_KEY as string;

  const { name, tag } = req.query;
  if (!name || !tag) {
    return res.status(400).json({ error: "No name or tag" })
  }

  try {
    const response = await fetch(`https://api.henrikdev.xyz/valorant/v2/account/${name}/${tag}`,
      {
        method: 'GET',
        headers: {
          'Authorization': apiKey,
          'Content-Type': 'application/json'
        }
      });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const jsonData = await response.json()
    const { data } = jsonData
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: `Failed to find player ${name}#${tag}.` })
  }
}
