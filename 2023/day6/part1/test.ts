import { solution } from "./solution";

describe("solution", () => {
  it("should output race scores", () => {
    const input = `Time:      7  15   30
    Distance:  9  40  200`;
    expect(solution(input)).toEqual(288);
  });
});
