import { isValid, isBefore, isAfter } from "date-fns";

import type { IMatchData } from "api/types";
import type { DeepNonNullableObject } from "types";

// filter only ongoing matches (with status codes: 1, 11, 12, 13 or 14) with valid team names
// for the sake of displaying sorted results I have included status: 0 "notstarted" & 3 "ended"

type TFilterMatchData = Omit<IMatchData, "home_team" | "away_team"> &
  DeepNonNullableObject<Pick<IMatchData, "home_team" | "away_team">>;

export const filterMatchDataIsValid = (
  match: IMatchData
): match is TFilterMatchData =>
  !!(
    match.home_team?.name &&
    match.away_team?.name &&
    (match.status_code === 0 ||
      match.status_code === 3 ||
      match.status_code === 1 ||
      match.status_code === 11 ||
      match.status_code === 12 ||
      match.status_code === 13 ||
      match.status_code === 14)
  );

export const filterMatches = (data: IMatchData[]): TFilterMatchData[] =>
  data.filter<TFilterMatchData>(filterMatchDataIsValid);

const getSortOrderByDate = (
  matchDateA: string | null,
  matchDateB: string | null
): number => {
  try {
    const dateA = new Date(matchDateA ?? "");
    const dateB = new Date(matchDateB ?? "");
    if (isValid(dateA) && isValid(dateB)) {
      if (isAfter(dateA, dateB)) {
        return -1;
      }
      if (isBefore(dateA, dateB)) {
        return 1;
      }
      return 0;
    } else {
      return 0;
    }
  } catch {
    return 0;
  }
};

export const sortMatchScoreAndDate = (
  data: TFilterMatchData[]
): TFilterMatchData[] =>
  data.sort((a, b) => {
    // sort matches by total score
    // if no score is returned from API but match status is correct display match at the bottom (total score < 0)
    const aTotalScore =
      typeof a.stats?.home_score === "number" &&
      typeof a.stats?.away_score === "number"
        ? a.stats.home_score + a.stats.away_score
        : -1;
    const bTotalScore =
      typeof b.stats?.home_score === "number" &&
      typeof b.stats?.away_score === "number"
        ? b.stats.home_score + b.stats.away_score
        : -1;

    if (aTotalScore > bTotalScore) {
      return -1;
    }
    if (aTotalScore < bTotalScore) {
      return 1;
    }
    // sort matches by match_start
    // if any of dates is invalid or null keep original sorting order
    return getSortOrderByDate(a.match_start, b.match_start);
  });
