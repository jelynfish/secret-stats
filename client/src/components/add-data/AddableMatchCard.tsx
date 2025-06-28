import { Minus, Plus } from "lucide-react";
import { MatchType } from "../types";
import { Button } from "../ui/button";
import { getTeamDataFromMatch } from "../utils/getMyTeamFromMatch";

interface Props {
  puuids: string[];
  selectedMatches: string[];
  addMatchToSelectedMatches: (match_id: string) => void;
  removeMatchFromSelectedMatches: (match_id: string) => void;
  match: MatchType;
}

export const AddableMatchCard = ({
  puuids,
  selectedMatches,
  addMatchToSelectedMatches,
  removeMatchFromSelectedMatches,
  match,
}: Props) => {
  const added = selectedMatches.some(
    (m_id) => m_id === match.metadata.match_id
  );

  const team_data = getTeamDataFromMatch(puuids, match.players, match.teams);

  const addMatch = () => {
    addMatchToSelectedMatches(match.metadata.match_id);
  };

  const removeMatch = () => {
    removeMatchFromSelectedMatches(match.metadata.match_id);
  };

  if (team_data === null) {
    return <div>Match failed to properly load</div>;
  }
  return (
    <div className="flex py-2 px-4 space-x-2 items-center outline rounded-md justify-between">
      <div>
        <h3>{team_data.won ? "Won" : "Lost"}</h3>
        <div>
          {team_data.rounds.won} : {team_data.rounds.lost}
        </div>
      </div>
      <Button
        onClick={added ? removeMatch : addMatch}
        variant={added ? "default" : "outline"}
        size="icon"
      >
        {added ? <Minus /> : <Plus />}
      </Button>
    </div>
  );
};
