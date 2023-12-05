export const calibrateValues = (input: string) => {
  // break the input up by new lines
  const lines = input.split("\n");
  return lines.reduce((total, current) => {
    const digits = current.match(/\d/g) || [];
    const first = digits[0] || "0";
    const last = digits[digits.length - 1] || "0";
    return total + parseInt(`${first}${last}`);
  }, 0);
};
