import { calculateSolution } from "./solution";

describe.only("calculateSolution", () => {
  it.only("add part numbers", () => {
    const input = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;
    expect(calculateSolution(input)).toEqual(4361);
  });
});
