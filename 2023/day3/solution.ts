import { range } from "ramda";
import { input } from "./input";

type CharacterLine = {
  isSymbol: boolean;
  isNumber: boolean;
  isLastNumberInGroup: boolean;
  currentNumber: string;
};

const isDigit = (char: string) => /[0-9]/.test(char);

export const calculateSolution = (input: string) => {
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

  const MAX = 139;

  const total = characterLines.reduce((acc, characterLine, yIndex) => {
    return (
      acc +
      characterLine.reduce((runningSubTotal, character, xIndex) => {
        const length = character.currentNumber.length;
        if (character.isLastNumberInGroup) {
          if (characterLines[yIndex - 1]) {
            const numberRange = range(
              Math.max(xIndex - length, 0),
              Math.min(xIndex + 2, MAX)
            ); // must be +2 because range is exclusive of the last number
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
              Math.min(xIndex + 2, MAX)
            );
            if (
              numberRange.some((x) => {
                return characterLines[yIndex + 1][x].isSymbol;
              })
            ) {
              return runningSubTotal + parseInt(character.currentNumber);
            }
          }
          if (
            characterLines[yIndex][xIndex - 1] &&
            characterLines[yIndex][xIndex - 1].isSymbol
          ) {
            return runningSubTotal + parseInt(character.currentNumber);
          }
          if (
            characterLines[yIndex][xIndex + 1] &&
            characterLines[yIndex][xIndex + 1].isSymbol
          ) {
            return runningSubTotal + parseInt(character.currentNumber);
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
// too high: 551128
// too high: 578783
