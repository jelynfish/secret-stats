import AddableMatchList from "@/components/add-data/AddableMatchList";
import { MatchType } from "@/components/types";
import React, { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [tag, setTag] = useState("");

  const [matches, setMatches] = useState<MatchType[]>();
  const [error, setError] = useState<string | null>(null);

  // async function handleSubmitPlayer(e: React.FormEvent) {
  //   e.preventDefault();

  //   try {
  //     const queryParams = new URLSearchParams({ name, tag }).toString();
  //     const get = await fetch(`/api/ext/getPlayer?${queryParams}`);

  //     if (!get.ok) {
  //       throw new Error("Failed to fetch player data");
  //     }

  //     const playerData = await get.json();
  //     console.log(playerData);

  //     const add = await fetch("/api/db/addPlayer", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(playerData),
  //     });

  //     if (!add.ok) {
  //       throw new Error("Failed to add player to database.");
  //     }

  //     const dbres = await add.json();
  //     setResponse(dbres);
  //   } catch (err) {
  //     setError((err as Error).message);
  //   }
  // }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const region = "na";
      const puuid = "9ccb6834-44aa-599f-be27-ba3219ab17b6";

      const queryParams = new URLSearchParams({
        region,
        puuid,
        // mode, size, start
      }).toString();
      const res = await fetch(`/api/ext/getMatchesByPlayer?${queryParams}`);
      if (!res.ok) {
        throw new Error("Failed to fetch matches.");
      }

      const matches: MatchType[] = await res.json();
      setMatches(matches);
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

      {matches && <AddableMatchList matches={matches} />}
    </div>
  );
}
