const textToDigitMap: Record<string, string> = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

export const calibrateValues = (input: string) => {
  // break the input up by new lines
  const lines = input.split("\n");
  return lines.reduce((total, current) => {
    // using matchAll with capture group since match only gives ['one'] for eg 'oneeight' but we need ['one', 'eight']
    const digits = [
      ...current.matchAll(
        /(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g
      ),
    ].map((match) => match[1]);
    const firstDigit = digits[0] || "0";
    const first = Object.keys(textToDigitMap).includes(firstDigit)
      ? textToDigitMap[firstDigit]
      : digits[0];
    const lastDigit = digits[digits.length - 1] || "0";
    const last = Object.keys(textToDigitMap).includes(lastDigit)
      ? textToDigitMap[lastDigit]
      : digits[digits.length - 1];
    return total + parseInt(`${first}${last}`);
  }, 0);
};
