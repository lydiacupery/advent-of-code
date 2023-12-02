import { computerFloor } from "./solution";

describe("computerFloor", () => {
  it("adds floor for opening parens", () => {
    expect(computerFloor("(((((")).toEqual(5);
  });
  it("removes floor for closing parens", () => {
    expect(computerFloor(")))))")).toEqual(-5);
  });
  it("handles opening and closing parens", () => {
    expect(computerFloor("((((()))))()()()(()))")).toEqual(-1);
  });
});
