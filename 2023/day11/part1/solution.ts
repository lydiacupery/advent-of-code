import * as R from "ramda";
const isTestInput = false;
const input: string = require("fs").readFileSync(
  require("path").resolve(__dirname, isTestInput ? "test.txt" : "input.txt"),
  "utf-8"
);

const parseInput = (input: string) => {
  const lines = input.split("\n");

  let galaxyNumber = 0;

  const parsedInput = lines.map((line, y) => {
    return Array.from(line).map((char, x) => {
      const isGalaxy = char === "#";
      if (isGalaxy) {
        return {
          isGalaxy,
          galaxyNumber: galaxyNumber++,
        };
      }
      return {
        isGalaxy: false,
      };
    });
  });
  return { parsedInput, numberOfGalaxies: galaxyNumber };
};

const getGalaxyLocationsFromInput = (input: Input) => {
  // get all the galaxy locations from the input
  const galaxyLocations = [];
  input.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell.isGalaxy) {
        galaxyLocations.push({ x, y });
      }
    });
  });
  return galaxyLocations;
};

const addXLines = (input: Input) => {
  let currentX = 0;
  const xIndexesToAddEmptyLine = [];
  while (currentX < input[0].length) {
    const columnHasNoGalaxy = input.every((row) => !row[currentX].isGalaxy);
    if (columnHasNoGalaxy) {
      // add a column at currentX
      xIndexesToAddEmptyLine.push(xIndexesToAddEmptyLine.length + currentX);
    }

    currentX += 1;
  }
  let newInput = input;
  xIndexesToAddEmptyLine.forEach((xIndex) => {
    newInput = newInput.map((row) =>
      R.insert(xIndex, { isGalaxy: false })(row)
    );
  });
  return newInput;
};

type Input = Array<Array<{ isGalaxy: boolean; galaxyNumber?: number }>>;

const addYLines = (input: Input) => {
  let currentY = 0;
  const yIndexesToAddEmptyLine = [];

  while (currentY < input.length) {
    const rowHasNoGalaxy = input[currentY].every((cell) => !cell.isGalaxy);
    if (rowHasNoGalaxy) {
      // add a row at currentY
      yIndexesToAddEmptyLine.push(yIndexesToAddEmptyLine.length + currentY);
    }
    currentY += 1;
  }
  let newInput = input;
  yIndexesToAddEmptyLine.forEach((yIndex) => {
    newInput = R.insert(
      yIndex,
      Array.from({ length: input[0].length }).map(() => ({ isGalaxy: false }))
    )(newInput);
  });
  return newInput;
};

const findPath = (
  galaxyLocations: Array<{ x: number; y: number }>,
  startGalaxy: number,
  endGalaxy: number
) => {
  return (
    Math.abs(galaxyLocations[startGalaxy].x - galaxyLocations[endGalaxy].x) +
    Math.abs(galaxyLocations[startGalaxy].y - galaxyLocations[endGalaxy].y)
  );
};

const solution = (input: string) => {
  const { parsedInput, numberOfGalaxies } = parseInput(input);

  const inputWithExtraYLines = addYLines(parsedInput);
  const inputWithExtraYLinesAndExtraXLines = addXLines(inputWithExtraYLines);

  const galaxyLocations = getGalaxyLocationsFromInput(
    inputWithExtraYLinesAndExtraXLines
  );

  let totalPaths = 0;
  const pairChecked = {};
  for (let i = 0; i < numberOfGalaxies; i++) {
    for (let j = i; j < numberOfGalaxies; j++) {
      if (i !== j && !pairChecked[`${j},${i}`]) {
        const path = findPath(
          inputWithExtraYLinesAndExtraXLines,
          galaxyLocations,
          i,
          j
        );
        console.log(`distance between ${i} and ${j} is ${path}`);
        totalPaths += path;
        pairChecked[`${i},${j}`] = true;
      }
    }
  }
  return totalPaths;
};

console.log("SOLUTION", solution(input));
