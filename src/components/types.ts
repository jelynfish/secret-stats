export interface MatchType {
    metadata: MatchMetadataType
    players: MatchPlayerType[]
    teams: MatchTeamType[]
}

export interface MatchMetadataType {
  match_id: string
  map: MapType
  started_at: string
  game_length_in_ms: Number,
  queue: QueueType
  season: SeasonIDType
  platform: PlatformType
  premier: boolean | null
  party_rr_penalties: PartyType[]
  region: string
}

export interface PlayerType {
    puuid: string
    name: string
    tag: string
    platform: string
}

export interface MatchPlayerType extends PlayerType {
    team_id: string
    agent: AgentType
    party_id: string
    stats: MatchStatsType
}

export interface PartyType {
  party_id: string;
}

export interface MapType {
  name: string;
}

export interface QueueType {
  name: string;
  mode_type: string;
}

export interface SeasonIDType {
    short: SeasonType
}

export enum SeasonType {
  e1a1 = "E1: A1",
  e1a2 = "E1: A2",
  e1a3 = "E1: A3",
  e2a1 = "E2: A1",
  e2a2 = "E2: A2",
  e2a3 = "E2: A3",
  e3a1 = "E3: A1",
  e3a2 = "E3: A2",
  e3a3 = "E3: A3",
  e4a1 = "E4: A1",
  e4a2 = "E4: A2",
  e4a3 = "E4: A3",
  e5a1 = "E5: A1",
  e5a2 = "E5: A2",
  e5a3 = "E5: A3",
  e6a1 = "E6: A1",
  e6a2 = "E6: A2",
  e6a3 = "E6: A3",
  e7a1 = "E7: A1",
  e7a2 = "E7: A2",
  e7a3 = "E7: A3",
  e8a1 = "E8: A1",
  e8a2 = "E8: A2",
  e8a3 = "E8: A3",
  e9a1 = "E9: A1",
  e9a2 = "E9: A2",
  e9a3 = "E9: A3",
  e10a1 = "V25: A1",
  e10a2 = "V25: A2",
  e10a3 = "V25: A3",
}

export enum PlatformType {
    pc = "PC",
    console = "Console"
}

export interface AgentType {
    name: string
}

export interface MatchStatsType {
    score: number
    kills: number
    deaths: number
    assists: number
    headshots: number
    legshots: number
    bodyshots: number
    damage: DamageDealtRecievedType
}

export interface DamageDealtRecievedType {
    dealt: number
    recieved: number
}

export interface MatchTeamType {
    team_id: string
    rounds: BasicRoundType
    won: boolean
}

export interface BasicRoundType {
    won: number
    lost: number
}
