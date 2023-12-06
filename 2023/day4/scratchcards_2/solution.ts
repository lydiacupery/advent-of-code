import * as R from "ramda";

export const solution = (input: string) => {
  const lines = input.split("\n");
  const copies = R.range(0, lines.length).map((i) => 1);
  return lines.reduce((acc, line, i) => {
    // replace double space with single space, split at :
    const [_, numbers] = line.replace(/\s+/g, " ").split(": ");
    const [rawWinningNumbers, rawActualNumbers] = numbers.split(" | ");
    const winningNumbers = rawWinningNumbers.split(" ").map((n) => parseInt(n));
    const actualNumbers = rawActualNumbers.split(" ").map((n) => parseInt(n));
    console.log({ winningNumbers, actualNumbers });
    // find overlap between winningNumbers and actualNumbers
    const overlap = R.intersection(actualNumbers, winningNumbers);
    const numberOfCopies = copies[i];
    R.range(i + 1, i + 1 + overlap.length).forEach((j) => {
      copies[j] = copies[j] + numberOfCopies;
    });

    return acc + numberOfCopies;
  }, 0);
};
