/**
 * The newly-improved calibration document consists of lines of text; each line originally contained a specific calibration value that the Elves now need to recover. On each line, the calibration value can be found by combining the first digit and the last digit (in that order) to form a single two-digit number.
 * 
 * Your calculation isn't quite right. It looks like some of the digits are actually spelled out with letters: one, two, three, four, five, six, seven, eight, and nine also count as valid "digits".

Equipped with this new information, you now need to find the real first and last digit on each line. For example:

two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen
In this example, the calibration values are 29, 83, 13, 24, 42, 14, and 76. Adding these together produces 281.
 */

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
