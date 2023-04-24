//get the event data and assign it to state to display in the score board

export const extractGameData = (
  events,
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
  setCurrentAwayPeriodPoint
) => {
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
        resetCurrentPointStates(
          setCurrentPeriodName,
          setCurrentHomePoint,
          setCurrentAwayPoint,
          setCurrentHomePeriodPoint,
          setCurrentAwayPeriodPoint
        );
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

export const getWinner = (prevPoints) => {
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

//Reset the current set points so that new setpoints can be tracked
export const resetCurrentPointStates = (
  setCurrentPeriodName,
  setCurrentHomePoint,
  setCurrentAwayPoint,
  setCurrentHomePeriodPoint,
  setCurrentAwayPeriodPoint
) => {
  setCurrentPeriodName("");
  setCurrentHomePoint(0);
  setCurrentAwayPoint(0);
  setCurrentHomePeriodPoint(0);
  setCurrentAwayPeriodPoint(0);
};

export const openTennisWebSocket = (
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
  setApiError
) => {
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
          extractGameData(
            json.events,
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
            setCurrentAwayPeriodPoint
          );
        }
      }
    } catch (err) {
      setApiError(err);
    }
  };
};
