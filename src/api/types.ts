export interface IApiDataResponse<T extends object> {
  query: Record<string, string>;
  data: T;
}

interface ITeamData {
  name: string;
  logo: string;
}

// for the sake of excercise I assume all fields may be returned as null

export interface IMatchData {
  status_code: number | null;
  match_start: string | null;
  home_team: ITeamData | null;
  away_team: ITeamData | null;
  stats: {
    home_score: number | null;
    away_score: number | null;
  } | null;
}

export type TMatchesData = IMatchData[];
