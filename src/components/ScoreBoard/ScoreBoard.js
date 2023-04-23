import { useContext } from "react";
import DisplayResult from "../DisplayResult";
import ScoreColumn from "../ScoreColumn";
import ScoreContext from "../../context";
import "../ScoreBoard/ScoreBoard.css";

export default function ScoreBoard() {
  const {
    isMatchStarted,
    prevPoints,
    currentServer,
    currentPeriodName,
    currentHomePeriodPoint,
    currentAwayPeriodPoint,
    currentHomePoint,
    currentAwayPoint,
    isFault,
  } = useContext(ScoreContext);

  return (
    <>
      <div>
        <div className="displayDetails">
          <div className="detailWrapper">
            <div className="liveStatus">
              Live
              {isMatchStarted ? (
                <span className="status green"></span>
              ) : (
                <span className="status red"></span>
              )}
            </div>
          </div>
        </div>

        <div className="flexItem">
          <div className="scoreBoard">
            <div className="column">
              <div>PLAYER</div>
              <div>
                HOME
                <span>{currentServer === "home" ? <>&#127934;</> : ""}</span>
              </div>
              <div>
                AWAY
                <span>{currentServer === "away" ? <>&#127934;</> : ""}</span>
              </div>
            </div>
            {prevPoints &&
              prevPoints.map((prev) => (
                <ScoreColumn
                  periodName={prev.periodName}
                  homePeriodPoint={prev.homePeriodPoint}
                  homepoint={prev.homepoint}
                  awayPeriodPoint={prev.awayPeriodPoint}
                  awaypoint={prev.awaypoint}
                />
              ))}
            <ScoreColumn
              periodName={currentPeriodName}
              homePeriodPoint={currentHomePeriodPoint}
              homepoint={currentHomePoint}
              awayPeriodPoint={currentAwayPeriodPoint}
              awaypoint={currentAwayPoint}
            />
          </div>
          <div className={`result ${isFault ? "fault" : "success"}`}>
            <DisplayResult />
          </div>
        </div>
      </div>
    </>
  );
}
