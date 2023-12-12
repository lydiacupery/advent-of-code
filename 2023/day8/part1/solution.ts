// /**
//  * It seems like you're meant to use the left/right instructions to navigate the network. Perhaps if you have the camel follow the same instructions, you can escape the haunted wasteland!

// After examining the maps for a bit, two nodes stick out: AAA and ZZZ. You feel like AAA is where you are now, and you have to follow the left/right instructions until you reach ZZZ.

// This format defines each node of the network individually. For example:

// RL

// AAA = (BBB, CCC)
// BBB = (DDD, EEE)
// CCC = (ZZZ, GGG)
// DDD = (DDD, DDD)
// EEE = (EEE, EEE)
// GGG = (GGG, GGG)
// ZZZ = (ZZZ, ZZZ)
// Starting with AAA, you need to look up the next element based on the next left/right instruction in your input. In this example, start with AAA and go right (R) by choosing the right element of AAA, CCC. Then, L means to choose the left element of CCC, ZZZ. By following the left/right instructions, you reach ZZZ in 2 steps.

// Of course, you might not find ZZZ right away. If you run out of left/right instructions, repeat the whole sequence of instructions as necessary: RL really means RLRLRLRLRLRLRLRL... and so on. For example, here is a situation that takes 6 steps to reach ZZZ:

// LLR

// AAA = (BBB, BBB)
// BBB = (AAA, ZZZ)
// ZZZ = (ZZZ, ZZZ)
// Starting at AAA, follow the left/right instructions. How many steps are required to reach ZZZ?
//  *
//  */

// const testInput = false;
// const rawInput: string = require("fs").readFileSync(
//   require("path").resolve(__dirname, testInput ? "test.txt" : "input.txt"),
//   "utf-8"
// );

// const parseInput = (input: string) => {
//   const lines = input.split("\n");
//   const sequence = lines[0]
//     .replace(";", "")
//     .split("")
//     .map((c) => (c === "R" ? "right" : "left"));
//   const map = lines.slice(2).map((line) => {
//     const [key, value] = line.split(" = ");
//     console.log("VALUE??", value, value.split(","));
//     const [left, right] = value.split(", ");
//     return {
//       key,
//       left: left.replace("(", ""),
//       right: right.replace(")", "").replace(";", ""),
//     };
//   });
//   return { sequence, map };
// };

// const executeSequence = (
//   sequence: string[],
//   map: Record<string, { left: string; right: string }>,
//   startignNode: string
// ) => {
//   let currentKey = startignNode;
//   let requiredSteps = 0;
//   sequence.forEach((direction) => {
//     if (direction === "left") {
//       currentKey = map[currentKey].left;
//     } else {
//       currentKey = map[currentKey].right;
//     }
//     requiredSteps++;
//   });
//   return { currentKey, requiredSteps };
// };

// const solution = (input: string) => {
//   const { sequence, map } = parseInput(rawInput);

//   const constructedMap: Record<string, { left: string; right: string }> = {};
//   map.forEach(({ key, left, right }) => {
//     constructedMap[key] = { left, right };
//   });
//   let requiredSteps = 0;
//   let currentKey = "AAA";
//   while (currentKey !== "ZZZ") {
//     const { currentKey: nextKey, requiredSteps: steps } = executeSequence(
//       sequence,
//       constructedMap,
//       currentKey
//     );
//     currentKey = nextKey;
//     requiredSteps += steps;
//     console.log("required steps up to", requiredSteps);
//   }
//   return requiredSteps;
// };

// console.log(solution(rawInput));
