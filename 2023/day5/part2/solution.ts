/**
 *
 */

import { range, splitEvery } from "ramda";
import { input } from "./input";

const inputsToOutputs = (
  inputs: number[],
  map: Array<{ source: number; destination: number; range: number }>
) => {
  console.log("inputs to outputs processing...");
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
  //   console.log({ parsed });
  const seeds = parseNumbers(parsed[0].split(": ")[1]);
  //   console.log({ seeds });
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
    const [rangeStart, r] = seeds.slice(i, i + 2);
    const seedGroup = range(rangeStart, rangeStart + r);
    console.log(
      `🌲 processing seed group range --- START ${rangeStart} to END ${
        rangeStart + r
      }`
    );

    const numberOfGroups = seedGroup.length / 100;
    console.log(`🌲 number of subgroups: ${numberOfGroups}`);
    // break seed group into smaller groups
    splitEvery(numberOfGroups, seedGroup).forEach((subSeedGroup) => {
      const result = maps.reduce((acc, curr) => {
        const nextInput = inputsToOutputs(acc, curr);
        //       console.log("next input", nextInput);
        return nextInput;
      }, subSeedGroup);
      //       console.log(result);
      bestResult = Math.min(bestResult, Math.min(...result));
    });
  }
  return bestResult;
};

console.log(solution(input));
