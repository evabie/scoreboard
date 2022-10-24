import type { FC } from "react";

interface IProps {
  homeName: string;
  awayName: string;
  homeScore?: number | null;
  awayScore?: number | null;
  date?: string | null;
}

const ScoreboardItem: FC<IProps> = ({
  homeName,
  homeScore,
  awayName,
  awayScore,
  date,
}) => {
  return (
    <div className="scoreboard-item">
      <span className="scoreboard-item-teams">
        {homeName} - {awayName}
      </span>
      <span className="scoreboard-item-score">
        {typeof homeScore === "number" && typeof awayScore === "number"
          ? `${homeScore} : ${awayScore}`
          : "no data"}
      </span>
      {date}
    </div>
  );
};

export default ScoreboardItem;
