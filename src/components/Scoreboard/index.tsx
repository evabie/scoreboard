import type { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMatchResults } from "api/getMatchResults";

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

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default Scoreboard;
