import { calibrateValues } from "./solution";

describe("calibrateValues", () => {
  it("adds the first and last digits of each line, including text digits", () => {
    expect(
      calibrateValues(`two1nine
	eightwothree
	abcone2threexyz
	xtwone3four
	4nineeightseven2
	zoneight234
	7pqrstsixteen`)
    ).toEqual(281);
  });
});
