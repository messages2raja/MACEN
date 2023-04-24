import React, { useState, useEffect } from "react";
import ScoreContext from "./context";
import ScoreBoard from "./components/ScoreBoard/ScoreBoard";
import gameLoading from "./assets/gameLoading.gif";
import gameOver from "./assets/gameOver.gif";
import "./App.css";
function App() {
  //Declaring constants
  const [gameEvents, setGameEvents] = useState([]);
  const [isMatchStarted, setIsMatchStarted] = useState(false);
  const [isMatchEnded, setIsMatchEnded] = useState(false);
  const [currentPeriodName, setCurrentPeriodName] = useState("");
  const [currentHomePoint, setCurrentHomePoint] = useState(0);
  const [currentAwayPoint, setCurrentAwayPoint] = useState(0);
  const [currentHomePeriodPoint, setCurrentHomePeriodPoint] = useState(0);
  const [currentAwayPeriodPoint, setCurrentAwayPeriodPoint] = useState(0);
  const [currentServer, setCurrentServer] = useState("");
  const [currentResult, setCurrentResult] = useState("");
  const [currentFSF, setCurrentFSF] = useState(false);
  const [isFault, setIsFault] = useState(false);
  const [apiError, setApiError] = useState("");
  const [gameWinner, setGameWinner] = useState("");
  const [currentPoints, setCurrentPoints] = useState({
    period: 0,
    periodName: "",
    currentHomePoint: 0,
    awaypoint: 0,
    homePeriodPoint: 0,
    awayPeriodPoint: 0,
  });
  const [prevSetPoints, setPrevSetPoints] = useState([]);
  const baseurl = "ws://localhost:8081/"; // Websocket Baseurl

  //Open websocket to receive the game details and live score
  useEffect(() => {
    const ws = new WebSocket(baseurl);

    const apiCall = {
      cmd: "start",
      opts: {
        speed: 60,
      },
    };

    ws.onopen = (event) => {
      ws.send(JSON.stringify(apiCall));
    };

    ws.onmessage = function (event) {
      const json = JSON.parse(event.data);
      try {
        if ((json.event = "data")) {
          if (json.events.length > 0) {
            setGameEvents(json.events);
            extractGameData(json.events);
          }
        }
      } catch (err) {
        setApiError(err);
      }
    };
  });

  //Reset the current set points so that new setpoints can be tracked
  const resetCurrentPointStates = () => {
    setCurrentPeriodName("");
    setCurrentHomePoint(0);
    setCurrentAwayPoint(0);
    setCurrentHomePeriodPoint(0);
    setCurrentAwayPeriodPoint(0);
  };

  //get the event data and assign it to state to display in the score board

  const extractGameData = (events) => {
    for (const event of events) {
      switch (event.type) {
        case "matchStarted":
          setIsMatchStarted(true);
          break;
        case "matchEnded":
          setGameWinner(getWinner(prevSetPoints));
          setIsMatchEnded(true);
          break;
        case "periodStart":
          const addPrevPoints = {
            periodName: currentPeriodName,
            homepoint: currentHomePoint,
            awaypoint: currentAwayPoint,
            homePeriodPoint: currentHomePeriodPoint,
            awayPeriodPoint: currentAwayPeriodPoint,
          };
          resetCurrentPointStates();
          setCurrentPeriodName(event.periodName);
          if (event.periodName !== "1stSet") {
            setPrevSetPoints([...prevSetPoints, addPrevPoints]);
          }
          setCurrentPoints({ ...currentPoints, periodName: event.periodName });
          break;
        case "point":
          setCurrentHomePoint(event.homeScore);
          setCurrentAwayPoint(event.awayScore);
          setCurrentServer(event.server);
          setCurrentFSF(event.firstServeFault || false);
          setCurrentResult(event.result);
          break;
        case "periodScore":
          setCurrentHomePeriodPoint(event.homeScore);
          setCurrentAwayPeriodPoint(event.awayScore);
          break;
        default:
          break;
      }
    }
  };

  //get winner

  const getWinner = (prevPoints) => {
    const wins = {};
    let maxWins = 0;
    let winner;

    for (const point of prevPoints) {
      const result =
        point.homePeriodPoint > point.awayPeriodPoint
          ? "home"
          : point.homePeriodPoint === point.awayPeriodPoint
          ? "tie"
          : "away";
      if (wins[result]) {
        wins[result]++;
      } else {
        wins[result] = 1;
      }
      if (wins[result] > maxWins) {
        maxWins = wins[result];
        winner = result;
      }
    }

    return winner;
  };

  return (
    <ScoreContext.Provider
      value={{
        isMatchStarted: isMatchStarted,
        currentServer: currentServer,
        prevSetPoints: prevSetPoints,
        currentPeriodName: currentPeriodName,
        currentHomePeriodPoint: currentHomePeriodPoint,
        currentAwayPeriodPoint: currentAwayPeriodPoint,
        currentHomePoint: currentHomePoint,
        currentAwayPoint: currentAwayPoint,
        currentResult: currentResult,
        currentFSF: currentFSF,
        isFault: isFault,
      }}
    >
      <>
        {apiError && <div className="error">Error: {apiError}</div>}
        <h4>Tennis Score Board</h4>
        {isMatchStarted ? (
          <ScoreBoard />
        ) : (
          <div className="flexItem">
            <figure>
              <img
                src={gameLoading}
                alt="Match Loading"
                style={{ width: "260px" }}
              />
              <figcaption>Match not started yet, Please wait...</figcaption>
            </figure>
          </div>
        )}
        {isMatchEnded && (
          <div className="flexItem flexColumn">
            <h2>And the winner is {gameWinner}</h2>
            <figure>
              <img src={gameOver} alt="Game Over" style={{ width: "260px" }} />
              <figcaption>Game Over</figcaption>
            </figure>
          </div>
        )}
      </>
    </ScoreContext.Provider>
  );
}

export default App;
