import { input } from "./input";

const colorToNumber: Record<string, number> = {
  red: 12,
  green: 13,
  blue: 14,
};

export const calculateSolution = (input: string): number => {
  const lines = input.split("\n");
  return lines.reduce((acc, line, i) => {
    const [_, sets] = line.split(":");

    let [minRed, minGreen, minBlue] = [0, 0, 0];

    sets.split(";").forEach((set) => {
      const items = set.split(",");

      return items.forEach((item) => {
        const [number, color] = item.trim().split(" ");
        const parsedNumber = parseInt(number);
        if (color === "red") {
          minRed = Math.max(minRed, parsedNumber);
        }
        if (color === "green") {
          minGreen = Math.max(minGreen, parsedNumber);
        }
        if (color === "blue") {
          minBlue = Math.max(minBlue, parsedNumber);
        }
      });
    });
    const power = minRed * minGreen * minBlue;

    return acc + power;
  }, 0);
};

console.log("RESULT", calculateSolution(input));
