const colorToNumber: Record<string, number> = {
  red: 12,
  green: 13,
  blue: 14,
};

export const calculateSolution = (input: string): number => {
  const lines = input.split("\n");
  return lines.reduce((acc, line, i) => {
    const [_, sets] = line.split(":");

    const areAllSetsPossible = sets.split(";").every((set) => {
      const items = set.split(",");

      return items.every((item) => {
        const [number, color] = item.trim().split(" ");
        const maxForColor = colorToNumber[color];
        return maxForColor >= parseInt(number);
      });
    });

    if (areAllSetsPossible) {
      return acc + i + 1;
    }
    return acc;
  }, 0);
};

const input = ``;
