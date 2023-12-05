import { calculateSolution } from "./solution";

describe.only("calculateSolution", () => {
  it.only("add part numbers", () => {
    const input = `12.......*..
    +.........34
    .......-12..
    ..78........
    ..*....60...
    78..........
    .......23...
    ....90*12...
    ............
    2.2......12.
    .*.........*
    1.1.......56`;
    expect(calculateSolution(input)).toEqual(413);
  });
});

/**
 * Missing: 467, 592
 */
