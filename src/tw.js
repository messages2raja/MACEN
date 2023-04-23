const prevPoints = [
  {
    periodName: "1stSet",
    homepoint: 7,
    awaypoint: 6,
    homePeriodPoint: 7,
    awayPeriodPoint: 6,
  },
  {
    periodName: "2stSet",
    homepoint: 5,
    awaypoint: 7,
    homePeriodPoint: 5,
    awayPeriodPoint: 8,
  },
  {
    periodName: "3stSet",
    homepoint: 4,
    awaypoint: 5,
    homePeriodPoint: 9,
    awayPeriodPoint: 6,
  },
  {
    periodName: "4stSet",
    homepoint: 3,
    awaypoint: 7,
    homePeriodPoint: 9,
    awayPeriodPoint: 9,
  },
  {
    periodName: "5stSet",
    homepoint: 8,
    awaypoint: 8,
    homePeriodPoint: 8,
    awayPeriodPoint: 6,
  },
];

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

console.log(getWinner(prevPoints));
