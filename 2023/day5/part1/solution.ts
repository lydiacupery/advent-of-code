/**
 *
 */

import { range } from "ramda";
import { input } from "./input";

const inputsToOutputs = (
  inputs: number[],
  map: Array<{ source: number; destination: number; range: number }>
) => {
  const outputs = inputs.map((input) => {
    let match = input;
    map.forEach(({ source, destination, range }) => {
      if (input >= source && input < source + range) {
        match = destination + (input - source);
        return;
      }
    });
    return match;
  });
  return outputs;
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

  let bestResult = Infinity;

  for (let i = 0; i < seeds.length; i += 2) {
    const [rangeStart, rangeEnd] = seeds.slice(i, i + 2);
    const seedGroup = range(rangeStart, rangeEnd);

    const result = maps.reduce((acc, curr) => {
      const nextInput = inputsToOutputs(acc, curr);
      console.log("next input", nextInput);
      return nextInput;
    }, seedGroup);
    bestResult = Math.min(bestResult, Math.min(...result));
  }
};

console.log(solution(input));
