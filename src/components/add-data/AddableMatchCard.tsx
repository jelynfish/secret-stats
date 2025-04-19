import { Minus, Plus } from "lucide-react";
import { MatchType } from "../types";
import { Button } from "../ui/button";
import { getTeamDataFromMatch } from "../utils/getMyTeamFromMatch";

interface Props {
  puuids: string[];
  match: MatchType;
  added: boolean;
}

export const AddableMatchCard = ({ puuids, match, added = false }: Props) => {
  const team_data = getTeamDataFromMatch(puuids, match.players, match.teams);

  if (team_data === null) {
    return <div>Match failed to properly load</div>;
  }
  return (
    <div className="flex p-2 space-x-2 items-center">
      <div>
        <h3>{team_data.won ? "Won" : "Lost"}</h3>
        <div>
          {team_data.rounds.won} : {team_data.rounds.lost}
        </div>
      </div>
      <Button variant={added ? "default" : "outline"} size="icon">
        {added ? <Minus /> : <Plus />}
      </Button>
    </div>
  );
};
