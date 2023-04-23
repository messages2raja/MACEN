import React from "react";
import { render, screen } from "@testing-library/react";
import ScoreColumn from "./ScoreColumn";

describe("ScoreColumn component", () => {
  it("renders correctly", () => {
    const periodName = "Period 1";
    const homePeriodPoint = "5";
    const homepoint = "HOME";
    const awayPeriodPoint = "3";
    const awaypoint = "AWAY";

    render(
      <ScoreColumn
        periodName={periodName}
        homePeriodPoint={homePeriodPoint}
        homepoint={homepoint}
        awayPeriodPoint={awayPeriodPoint}
        awaypoint={awaypoint}
      />
    );

    expect(screen.getByText(periodName)).toBeInTheDocument();
    expect(screen.getByText(homePeriodPoint)).toBeInTheDocument();
    expect(screen.getByText(homepoint)).toBeInTheDocument();
    expect(screen.getByText(awayPeriodPoint)).toBeInTheDocument();
    expect(screen.getByText(awaypoint)).toBeInTheDocument();
  });
});
