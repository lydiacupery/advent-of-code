/**
 * As the race is about to start, you realize the piece of paper with race times and record distances you got earlier actually just has very bad kerning. There's really only one race - ignore the spaces between the numbers on each line.

So, the example from before:

Time:      7  15   30
Distance:  9  40  200
...now instead means this:

Time:      71530
Distance:  940200
Now, you have to figure out how many ways there are to win this single race. In this example, the race lasts for 71530 milliseconds and the record distance you need to beat is 940200 millimeters. You could hold the button anywhere from 14 to 71516 milliseconds and beat the record, a total of 71503 ways!
 * 
 */

import * as R from "ramda";

const testInput = true;
const rawInput: string = require("fs").readFileSync(
  require("path").resolve(__dirname, testInput ? "test.txt" : "input.txt"),
  "utf-8"
);

const parseOutNumbers = (str: string) =>
  parseInt(str.trim().split(":")[1].replaceAll(" ", ""));

const calculateDistancesForTime = (totalTime: number) => {
  return R.range(0, totalTime).map((holdTime) => {
    // calculate distance for this time
    return (totalTime - holdTime) * holdTime;
  });
};

export const solution = (input: string) => {
  const time = parseOutNumbers(input.split("\n")[0]);
  const distance = parseOutNumbers(input.split("\n")[1]);
  console.log({ time, distance });

  const distances = calculateDistancesForTime(time);
  const possibleDistances = distances.filter((d) => d > distance);

  return possibleDistances.length;
};

console.log(solution(rawInput));
