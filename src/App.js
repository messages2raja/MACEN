import React, { useState, useEffect } from "react";
import ScoreContext from "./context";
import ScoreBoard from "./components/ScoreBoard/ScoreBoard";
import gameLoading from "./assets/gameLoading.gif";
import gameOver from "./assets/gameOver.gif";
import { openTennisWebSocket } from "./Utils/gameUtils";
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
    openTennisWebSocket(
      baseurl,
      setIsMatchStarted,
      setGameWinner,
      prevSetPoints,
      setIsMatchEnded,
      currentPeriodName,
      currentHomePoint,
      currentAwayPoint,
      currentHomePeriodPoint,
      currentAwayPeriodPoint,
      setCurrentPeriodName,
      setPrevSetPoints,
      setCurrentPoints,
      currentPoints,
      setCurrentHomePoint,
      setCurrentAwayPoint,
      setCurrentServer,
      setCurrentFSF,
      setCurrentResult,
      setCurrentHomePeriodPoint,
      setCurrentAwayPeriodPoint,
      setGameEvents,
      setApiError,
      setIsFault
    );
  });

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
            <figure className="gameLoading">
              <img src={gameLoading} alt="Match Loading" />
              <figcaption>Match not started yet, Please wait...</figcaption>
            </figure>
          </div>
        )}
        {isMatchEnded && (
          <div className="flexItem flexColumn">
            <h2>And the winner is {gameWinner}</h2>
            <figure className="gameLoading">
              <img src={gameOver} alt="Game Over" />
              <figcaption>Game Over</figcaption>
            </figure>
          </div>
        )}
      </>
    </ScoreContext.Provider>
  );
}

export default App;
