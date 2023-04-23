export default function ScoreColumn({
  periodName,
  homePeriodPoint,
  homepoint,
  awayPeriodPoint,
  awaypoint,
}) {
  return (
    <div className="column">
      <div>{periodName}</div>
      <div>
        {homePeriodPoint}
        <span className="pointCont">{homepoint}</span>
      </div>
      <div>
        {awayPeriodPoint}
        <span className="pointCont">{awaypoint}</span>
      </div>
    </div>
  );
}
