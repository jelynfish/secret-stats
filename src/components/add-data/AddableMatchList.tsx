import { MatchType } from "../types";
import { AddableMatchCard } from "./AddableMatchCard";
import { without } from "lodash";
import { useState } from "react";

interface Props {
  matches: MatchType[];
}
const AddableMatchList = ({ matches }: Props) => {
  const [selectedMatches, setSelectedMatches] = useState<string[]>([]);

  const addMatchToSelectedMatches = (match_id: string) => {
    setSelectedMatches((prev) => [...prev, match_id]);
    console.log(selectedMatches.join(", "));
  };

  const removeMatchFromSelectedMatches = (match_id: string) => {
    setSelectedMatches((prev) => without(prev, match_id));
    console.log(selectedMatches.join(", "));
  };

  return (
    <div>
      <h2>Matches Found:</h2>
      {matches.map((match: MatchType) => (
        <AddableMatchCard
          puuids={["9ccb6834-44aa-599f-be27-ba3219ab17b6"]}
          selectedMatches={selectedMatches}
          match={match}
          addMatchToSelectedMatches={addMatchToSelectedMatches}
          removeMatchFromSelectedMatches={removeMatchFromSelectedMatches}
        />
      ))}
    </div>
  );
};

export default AddableMatchList;
