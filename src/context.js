import React from "react";

export default React.createContext({
  isMatchStarted: Boolean,
  currentServer: "",
  prevPoints: [],
  currentPeriodName: "",
  currentHomePeriodPoint: Number,
  currentAwayPeriodPoint: Number,
  currentHomePoint: Number,
  currentAwayPoint: Number,
  currentResult: "",
  currentFSF: Boolean,
  isFault: Boolean,
});
