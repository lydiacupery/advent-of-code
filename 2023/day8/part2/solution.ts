/**
 * It seems like you're meant to use the left/right instructions to navigate the network. Perhaps if you have the camel follow the same instructions, you can escape the haunted wasteland!

After examining the maps for a bit, two nodes stick out: AAA and ZZZ. You feel like AAA is where you are now, and you have to follow the left/right instructions until you reach ZZZ.

This format defines each node of the network individually. For example:

RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)
Starting with AAA, you need to look up the next element based on the next left/right instruction in your input. In this example, start with AAA and go right (R) by choosing the right element of AAA, CCC. Then, L means to choose the left element of CCC, ZZZ. By following the left/right instructions, you reach ZZZ in 2 steps.

Of course, you might not find ZZZ right away. If you run out of left/right instructions, repeat the whole sequence of instructions as necessary: RL really means RLRLRLRLRLRLRLRL... and so on. For example, here is a situation that takes 6 steps to reach ZZZ:

LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)
Starting at AAA, follow the left/right instructions. How many steps are required to reach ZZZ?
 * 
 */

const testInput = false;
const rawInput: string = require("fs").readFileSync(
  require("path").resolve(__dirname, testInput ? "test.txt" : "input.txt"),
  "utf-8"
);

// Recursive function to return gcd of a and b
const gcd = (a: number, b: number) => {
  if (b == 0) return a;
  return gcd(b, a % b);
};

// Function to return LCM of two numbers
const lcm = (a: number, b: number) => {
  return (a / gcd(a, b)) * b;
};

const parseInput = (input: string) => {
  const lines = input.split("\n");
  const sequence = lines[0]
    .replace(";", "")
    .split("")
    .map((c) => (c === "R" ? "right" : "left"));
  const map = lines.slice(2).map((line) => {
    const [key, value] = line.split(" = ");
    const [left, right] = value.split(", ");
    return {
      key,
      left: left.replace("(", ""),
      right: right.replace(")", "").replace(";", ""),
    };
  });
  return { sequence, map };
};

const executeSequence = (
  sequence: string[],
  map: Record<string, { left: string; right: string }>,
  startingNodes: string[]
) => {
  let currentKeys = startingNodes;
  let requiredSteps = 0;
  sequence.forEach((direction) => {
    if (direction === "left") {
      currentKeys = currentKeys.map((key) => map[key].left);
    } else {
      currentKeys = currentKeys.map((key) => map[key].right);
    }
    requiredSteps++;
  });
  return { currentKeys, requiredSteps };
};

const solution = (input: string) => {
  const { sequence, map } = parseInput(input);

  const constructedMap: Record<string, { left: string; right: string }> = {};
  map.forEach(({ key, left, right }) => {
    constructedMap[key] = { left, right };
  });
  let requiredSteps = 0;
  let currentKeys = Object.keys(constructedMap).filter((key) => key[2] === "A");

  // get required steps for each ke
  const requiredSteps = currentKeys.map((key) => {
    let currentKey = key;
    let requiredSteps = 0;
    while (currentKey !== "ZZZ") {
      const { currentKey: nextKey, requiredSteps: steps } = executeSequence(
        sequence,
        constructedMap,
        currentKey
      );
      currentKey = nextKey;
      requiredSteps += steps;
    }

  }
  while (!currentKeys.every((key) => key[2] === "Z")) {
    const { currentKeys: nextKeys, requiredSteps: steps } = executeSequence(
      sequence,
      constructedMap,
      currentKeys
    );
    currentKeys = nextKeys;
    requiredSteps += steps;
    console.log("required steps up to", requiredSteps);
  }
  return requiredSteps;
};

console.log(solution(rawInput));
