import * as R from "ramda";

const testInput = false;
const rawInput: string = require("fs").readFileSync(
  require("path").resolve(__dirname, testInput ? "test.txt" : "input.txt"),
  "utf-8"
);

const parseOutNumbers = (str: string) =>
  str
    .trim()
    .split(":")[1]
    .split(" ")
    .filter((x) => x !== "")
    .map((x) => parseInt(x));

const calculateDistancesForTime = (totalTime: number) => {
  return R.range(0, totalTime).map((holdTime) => {
    // calculate distance for this time
    return (totalTime - holdTime) * holdTime;
  });
};

export const solution = (input: string) => {
  const times = parseOutNumbers(input.split("\n")[0]);
  const distances = parseOutNumbers(input.split("\n")[1]);
  const timeWithDistance = R.zip(times, distances);

  return timeWithDistance.reduce((acc, [time, distance]) => {
    // calculate ways to do it given time that beats the distance
    const distances = calculateDistancesForTime(time);
    const possibleDistances = distances.filter((d) => d > distance);
    return acc * possibleDistances.length;
  }, 1);
};

console.log(solution(rawInput));
