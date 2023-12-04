/**
 * The engine schematic (your puzzle input) consists of a visual representation of the engine. There are lots of numbers and symbols you don't really understand, but apparently any number adjacent to a symbol, even diagonally, is a "part number" and should be included in your sum. (Periods (.) do not count as a symbol.)

Here is an example engine schematic:

467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
In this schematic, two numbers are not part numbers because they are not adjacent to a symbol: 114 (top right) and 58 (middle right). Every other number is adjacent to a symbol and so is a part number; their sum is 4361.

Of course, the actual engine schematic is much larger. What is the sum of all of the part numbers in the engine schematic?
 * 
 * 
 */

import { range } from "ramda";
import { input } from "./input";

type CharacterLine = {
  isSymbol: boolean;
  isNumber: boolean;
  isLastNumberInGroup: boolean;
  currentNumber: string;
};

const isDigit = (char: string) => /[0-9]/.test(char);

const calculateSolution = (input: string) => {
  const lines = input.split("\n");
  const characterLines: Array<Array<CharacterLine>> = lines.map((line) => {
    let currentNumber = "";
    return Array.from(line).map((char, charIndex) => {
      const isNumber = isDigit(char);
      const isLastNumberInGroup =
        isNumber &&
        (line[charIndex + 1] === undefined || !isDigit(line[charIndex + 1]));
      currentNumber = isNumber ? `${currentNumber}${char}` : "";
      return {
        isSymbol: !isNumber && char !== ".",
        char,
        isNumber,
        isLastNumberInGroup,
        currentNumber,
      };
    });
  });

  console.log({ characterLines: JSON.stringify(characterLines) });

  const MAX = 140 - 1;

  const total = characterLines.reduce((acc, characterLine, yIndex) => {
    return (
      acc +
      characterLine.reduce((runningSubTotal, character, xIndex) => {
        const length = character.currentNumber.length;
        if (character.isLastNumberInGroup) {
          if (characterLines[yIndex - 1]) {
            const numberRange = range(
              Math.max(xIndex - length, 0),
              Math.max(xIndex + 1, MAX)
            );
            if (
              numberRange.some((x) => {
                return characterLines[yIndex - 1][x].isSymbol;
              })
            ) {
              return runningSubTotal + parseInt(character.currentNumber);
            }
          }
          if (characterLines[yIndex + 1]) {
            const numberRange = range(
              Math.max(xIndex - length, 0),
              Math.max(xIndex + 1, MAX)
            );
            if (
              numberRange.some((x) => {
                return characterLines[yIndex + 1][x].isSymbol;
              })
            ) {
              return runningSubTotal + parseInt(character.currentNumber);
            }
          }
        }
        return runningSubTotal;
      }, 0)
    );
  }, 0);

  return total;
};

console.log("RESULT", calculateSolution(input));

// too low: 438127
// too high:551128
// too high: 578783

// anwer is 526404
