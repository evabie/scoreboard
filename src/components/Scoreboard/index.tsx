import type { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMatchResults } from "api/getMatchResults";
import ScoreboardItem from "components/Scoreboard/ScoreboardItem";
import {
  filterMatches,
  sortMatchScoreAndDate,
} from "components/Scoreboard/utils";

const SEASON_ID = "3161";
const DATE_FROM = "2022-10-20";
const DATE_TO = "2022-10-21";

const Scoreboard: FC = () => {
  const { data, isLoading, isError } = useQuery(
    ["getMatchResults", { SEASON_ID, DATE_FROM, DATE_TO }],
    () => getMatchResults(SEASON_ID, DATE_FROM, DATE_TO)
    // {
    //   refetchInterval: 5 * 1000,
    // }
  );

  if (isLoading) {
    return <>Loading data...</>;
  }

  if (isError) {
    return <>Sorry, something went wrong</>;
  }

  const sortedAndFilteredData = sortMatchScoreAndDate(filterMatches(data));

  return (
    <>
      <h2>SCOREBOARD</h2>
      {sortedAndFilteredData.map((item) => (
        <ScoreboardItem
          homeName={item.home_team.name}
          awayName={item.away_team.name}
          homeScore={item.stats?.home_score}
          awayScore={item.stats?.away_score}
          date={item.match_start}
        />
      ))}
    </>
  );
};

export default Scoreboard;
