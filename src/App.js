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
  const [prevPoints, setPrevPoints] = useState([]);
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
    console.log(events);
    events.map((event) => {
      event.firstServeFault || event.result === "doubleFault"
        ? setIsFault(true)
        : setIsFault(false);
      if (event.type === "matchStarted") {
        setIsMatchStarted(true);
      }
      if (event.type === "matchEnded") {
        setGameWinner(getWinner());
        setIsMatchEnded(true);
      }
      if (event.type === "periodStart") {
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
          setPrevPoints([...prevPoints, addPrevPoints]);
        }

        setCurrentPoints({ ...currentPoints, periodName: event.periodName });
      }
      if (event.type === "point") {
        setCurrentHomePoint(event.homeScore);
        setCurrentAwayPoint(event.awayScore);
        setCurrentServer(event.server);
        event.firstServeFault
          ? setCurrentFSF(event.firstServeFault)
          : setCurrentFSF(false);
        setCurrentResult(event.result);
      }
      if (event.type === "periodScore") {
        setCurrentHomePeriodPoint(event.homeScore);
        setCurrentAwayPeriodPoint(event.awayScore);
      }
    });
  };
  //get winner
  const getWinner = (prevPoints) => {
    const winner = prevPoints
      .reduce((acc, point) => {
        const result =
          point.homePeriodPoint > point.awayPeriodPoint
            ? "home"
            : point.homePeriodPoint === point.awayPeriodPoint
            ? "tie"
            : "away";
        acc.push(result);
        return acc;
      }, [])
      .reduce((acc, team) => {
        acc[team] = acc[team] ? acc[team] + 1 : 1;
        return acc;
      }, {});
    const mostRepeated = Object.keys(winner).reduce((a, b) =>
      winner[a] > winner[b] ? a : b
    );
    return mostRepeated;
  };

  return (
    <ScoreContext.Provider
      value={{
        isMatchStarted: isMatchStarted,
        currentServer: currentServer,
        prevPoints: prevPoints,
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
