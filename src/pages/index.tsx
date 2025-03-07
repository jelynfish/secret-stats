import { MatchCard } from "@/components/MatchCard";
import { MatchType } from "@/components/types";
import React, { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [tag, setTag] = useState("");

  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmitPlayer(e: React.FormEvent) {
    e.preventDefault();

    try {
      const queryParams = new URLSearchParams({ name, tag }).toString();
      const get = await fetch(`/api/getPlayer?${queryParams}`);

      if (!get.ok) {
        throw new Error("Failed to fetch player data");
      }

      const playerData = await get.json();
      console.log(playerData);

      const add = await fetch("/api/addPlayer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(playerData),
      });

      if (!add.ok) {
        throw new Error("Failed to add player to database.");
      }

      const dbres = await add.json();
      setResponse(dbres);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const region = "na";
      const mode = "competitive";
      const size = "10";
      const start = "0";

      // const queryParams = new URLSearchParams({ mode, size, start }).toString();
      const res = await fetch("/api/getMatchesByPlayer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          region: "na",
          puuid: "9ccb6834-44aa-599f-be27-ba3219ab17b6"
          // queryParams,
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to fetch matches.");
      }

      const matches: MatchType[] = await res.json();
      setResponse(matches);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  return (
    <div>
      <h1>Search player</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Tag"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          required
        />
        <button type="submit">Search</button>
      </form>

      {response && (
        <div>
          <h2>Matches Found:</h2>
          {response.map((match: MatchType) => (
            <MatchCard
              puuids={["9ccb6834-44aa-599f-be27-ba3219ab17b6"]}
              match={match}
            />
          ))}
        </div>
      )}
    </div>
  );
}
