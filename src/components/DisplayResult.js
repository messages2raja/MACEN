import serverWon from "../assets/serverWon.webp";
import receiverWon from "../assets/receiverWon.gif";
import doubleFault from "../assets/DoubleFault.gif";
import firstServeFault from "../assets/firstServeFault.webp";
import ScoreContext from "../context";
import ace from "../assets/Ace.gif";
import { useContext } from "react";
export default function DisplayResult() {
  const { currentResult, currentFSF } = useContext(ScoreContext);
  return (
    <>
      {currentFSF ? (
        <figure>
          <img
            src={firstServeFault}
            alt={firstServeFault}
            style={{ width: "100%" }}
          />
          <figcaption>firstServeFault</figcaption>
        </figure>
      ) : (
        <figure>
          {currentResult === "serverWon" && (
            <img
              src={serverWon}
              alt={currentResult}
              style={{ width: "100%" }}
            />
          )}
          {currentResult === "receiverWon" && (
            <img
              src={receiverWon}
              alt={currentResult}
              style={{ width: "100%" }}
            />
          )}
          {currentResult === "ace" && (
            <img src={ace} alt={currentResult} style={{ width: "100%" }} />
          )}
          {currentResult === "doubleFault" && (
            <img
              src={doubleFault}
              alt={currentResult}
              style={{ width: "100%" }}
            />
          )}

          <figcaption> {currentResult}</figcaption>
        </figure>
      )}
    </>
  );
}
