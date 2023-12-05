/**
 *
 */

import { input } from "./input";

const inputsToOutputs = (
  inputs: number[],
  map: Array<{ source: number; destination: number; range: number }>
) => {
  const sourceToDestination = {};
  map.forEach(({ source, destination, range }) => {
    console.log("processing", source, destination, range);
    for (let i = 0; i < range; i++) {
      if (inputs.includes(source + i)) {
        sourceToDestination[source + i] = destination + i;
      }
    }
  });
  return inputs.map((input) => sourceToDestination[input] || input);
};

const parseNumbers = (str: string) =>
  str
    .split(" ")
    .filter((x) => x !== "")
    .map((x) => parseInt(x));

export const solution = (input: string) => {
  const parsed = input
    .replaceAll(/\r(\d)/g, " $1")
    .split("\n")
    .filter((x) => x !== "");
  const seeds = parseNumbers(parsed[0].split(": ")[1]);
  const maps = parsed.splice(1).reduce((acc, line) => {
    // if a header
    const isHeader = line.includes("-");
    if (isHeader) {
      acc.push([]);
      return acc;
    } else {
      const [destination, source, range] = parseNumbers(line);
      acc[acc.length - 1].push({ destination, source, range });
      return acc;
    }
  }, []);

  const result = maps.reduce((acc, curr) => {
    const nextInput = inputsToOutputs(acc, curr);
    console.log("next input", nextInput);
    return nextInput;
  }, seeds);
  return Math.min(...result);
};

console.log(solution(input));
