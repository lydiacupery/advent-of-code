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
  const lines = input.split(/\r?\n/);
  const characterLines: Array<Array<CharacterLine>> = lines.map((rawLine) => {
    let currentNumber = "";
    const line = rawLine.trim();
    return Array.from(line.trim()).map((char, charIndex) => {
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

  const MAX = 140; // extra 1 as range is exclusive

  const total = characterLines.reduce((acc, characterLine, yIndex) => {
    return (
      acc +
      characterLine.reduce((runningSubTotal, character, xIndex) => {
        const length = character.currentNumber.length;
        // console.log({ character, yIndex, xIndex, length });
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
              //       console.log(
              //         "pre ADDING NUMBER",
              //         parseInt(character.currentNumber)
              //       );
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
              //       console.log(
              //         "post ADDING NUMBER",
              //         parseInt(character.currentNumber)
              //       );
              return runningSubTotal + parseInt(character.currentNumber);
            }
          }
          //   console.log("LEFT", characterLines[yIndex][xIndex - length]);
          if (
            characterLines[yIndex][xIndex - length] &&
            characterLines[yIndex][xIndex - length].isSymbol
          ) {
            //     console.log(
            //       "left ADDING NUMBER",
            //       parseInt(character.currentNumber)
            //     );
            return runningSubTotal + parseInt(character.currentNumber);
          }
          if (
            characterLines[yIndex][xIndex + 1] &&
            characterLines[yIndex][xIndex + 1].isSymbol
          ) {
            //     console.log(
            //       "right ADDING NUMBER",
            //       parseInt(character.currentNumber)
            //     );
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

// try: 481931

// try: 527369
