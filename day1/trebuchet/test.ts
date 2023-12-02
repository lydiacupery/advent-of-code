import { calibrateValues } from "./solution";

describe("calibrateValues", () => {
  it("adds the first and last digits of each line", () => {
    expect(
      calibrateValues("1abc2\npqr3stu8vwx\na1b2c3d4e5f\ntreb7uchet")
    ).toEqual(142);
  });
});
