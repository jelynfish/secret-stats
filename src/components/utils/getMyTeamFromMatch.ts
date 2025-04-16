import { MatchPlayerType, MatchTeamType } from "../types";

export function getTeamDataFromMatch(
  puuids: string[],
  players: MatchPlayerType[],
  teams: MatchTeamType[]
): MatchTeamType | null {
  const matchingPlayer = players.find((p) => puuids.includes(p.puuid));

  if (!matchingPlayer) {
    console.log("Unable to find matching player from match.");
    return null;
  }

  const matchingTeam = teams.find(
    (team) => team.team_id === matchingPlayer.team_id
  );
  return matchingTeam || null;
}
