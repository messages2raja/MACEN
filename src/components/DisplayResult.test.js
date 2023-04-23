import { render, screen } from "@testing-library/react";
import ScoreContext from "../context";
import DisplayResult from "./DisplayResult";
import serverWon from "../assets/serverWon.webp";
import receiverWon from "../assets/receiverWon.gif";
import doubleFault from "../assets/DoubleFault.gif";
import firstServeFault from "../assets/firstServeFault.webp";
import ace from "../assets/Ace.gif";

describe("DisplayResult", () => {
  it('renders the correct image when currentResult is "serverWon"', () => {
    const currentResult = "serverWon";
    render(
      <ScoreContext.Provider value={{ currentResult }}>
        <DisplayResult />
      </ScoreContext.Provider>
    );
    const image = screen.getByAltText(currentResult);
    expect(image).toHaveAttribute("src", serverWon);
  });

  it('renders the correct image when currentResult is "receiverWon"', () => {
    const currentResult = "receiverWon";
    render(
      <ScoreContext.Provider value={{ currentResult }}>
        <DisplayResult />
      </ScoreContext.Provider>
    );
    const image = screen.getByAltText(currentResult);
    expect(image).toHaveAttribute("src", receiverWon);
  });

  it('renders the correct image when currentResult is "ace"', () => {
    const currentResult = "ace";
    render(
      <ScoreContext.Provider value={{ currentResult }}>
        <DisplayResult />
      </ScoreContext.Provider>
    );
    const image = screen.getByAltText(currentResult);
    expect(image).toHaveAttribute("src", ace);
  });

  it('renders the correct image when currentResult is "doubleFault"', () => {
    const currentResult = "doubleFault";
    render(
      <ScoreContext.Provider value={{ currentResult }}>
        <DisplayResult />
      </ScoreContext.Provider>
    );
    const image = screen.getByAltText(currentResult);
    expect(image).toHaveAttribute("src", doubleFault);
  });

  it("renders the correct image when currentFSF is true", () => {
    const currentFSF = true;
    render(
      <ScoreContext.Provider value={{ currentFSF }}>
        <DisplayResult />
      </ScoreContext.Provider>
    );
    const image = screen.getByAltText(firstServeFault);
    expect(image).toHaveAttribute("src", firstServeFault);
  });

  it("renders the correct text when currentResult is not a valid value", () => {
    const currentResult = "invalidResult";
    render(
      <ScoreContext.Provider value={{ currentResult }}>
        <DisplayResult />
      </ScoreContext.Provider>
    );
    const text = screen.getByText(currentResult);
    expect(text).toBeInTheDocument();
  });
});
