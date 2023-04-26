import serverWon from "../assets/serverWon.webp";
import receiverWon from "../assets/receiverWon.gif";
import doubleFault from "../assets/DoubleFault.gif";
import firstServeFault from "../assets/firstServeFault.webp";
import ScoreContext from "../context";
import ace from "../assets/Ace.gif";
import { useContext } from "react";
export default function DisplayResult() {
  const { currentResult, currentFSF } = useContext(ScoreContext);
  const images = {
    serverWon,
    receiverWon,
    doubleFault,
    firstServeFault,
  };

  function getImageByKey(key) {
    return images[key];
  }
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
          <img
            src={getImageByKey(currentResult)}
            alt={currentResult}
            style={{ width: "100%" }}
          />

          <figcaption>{currentResult}</figcaption>
        </figure>
      )}
    </>
  );
}
