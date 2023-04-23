import React from "react";
import { render, screen } from "@testing-library/react";
import ScoreContext from "../../context";
import ScoreBoard from "./ScoreBoard";

describe("ScoreBoard component", () => {
  it("renders without crashing", () => {
    render(<ScoreBoard />);
  });
  it("displays the live status correctly", () => {
    const mockContext = {
      isMatchStarted: true,
    };

    render(
      <ScoreContext.Provider value={mockContext}>
        <ScoreBoard />
      </ScoreContext.Provider>
    );

    const liveStatus = screen.getByText(/Live/);
    expect(liveStatus).toBeInTheDocument();
    const greenStatus = screen.getByTestId("status");
    expect(greenStatus).toHaveClass("green");
  });

  it("displays the correct player score", () => {
    const mockContext = {
      currentServer: "home",
      prevPoints: [
        {
          periodName: "Q1",
          homePeriodPoint: 2,
          awayPeriodPoint: 6,
          homepoint: 30,
          awaypoint: 15,
        },
      ],
      currentPeriodName: "Q2",
      currentHomePeriodPoint: 10,
      currentAwayPeriodPoint: 5,
      currentHomePoint: 20,
      currentAwayPoint: 40,
    };

    render(
      <ScoreContext.Provider value={mockContext}>
        <ScoreBoard />
      </ScoreContext.Provider>
    );

    expect(screen.getByText("HOME")).toBeInTheDocument();
    expect(screen.getByText("AWAY")).toBeInTheDocument();
    expect(screen.getByText("PLAYER")).toBeInTheDocument();

    expect(screen.getByText(/Q1/)).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("6")).toBeInTheDocument();

    expect(screen.getByText(/Q2/)).toBeInTheDocument();
    expect(screen.getByText("30")).toBeInTheDocument();
    expect(screen.getByText("15")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("20")).toBeInTheDocument();
    expect(screen.getByText("40")).toBeInTheDocument();
  });
});
