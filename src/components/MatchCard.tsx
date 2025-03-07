import { MatchType } from "./types"
import { getTeamDataFromMatch } from "./utils/getMyTeamFromMatch"

interface Props {
    puuids: string[]
    match: MatchType
}

export const MatchCard = ({puuids, match}: Props) => {
    const team_data = getTeamDataFromMatch(puuids, match.players, match.teams)

    if (team_data === null) {
        return (
            <div>Match failed to properly load</div>
        )
    }
    return (
        <div>
            <h3>{team_data.won ? "Won" : "Lost"}</h3>
            <p>
                {team_data.rounds.won} : {team_data.rounds.lost}
            </p>
        </div>
    )
}
