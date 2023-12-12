/**
 *
 */

import * as R from "ramda";

const testInput = false;
const rawInput: string = require("fs").readFileSync(
  require("path").resolve(__dirname, testInput ? "test.txt" : "input.txt"),
  "utf-8"
);

// ranks are A, K, Q, J, T, 9, 8, 7, 6, 5, 4, 3, or 2
const cardToRank = {
  A: 13,
  K: 12,
  Q: 11,
  J: 10,
  T: 9,
  9: 8,
  8: 7,
  7: 6,
  6: 5,
  5: 4,
  4: 3,
  3: 2,
  2: 1,
};

const diff = function (a: string, b: string) {
  return cardToRank[a] - cardToRank[b];
};

const calculateHandRank = (hand: string[]) => {
  const groupedHand = R.groupWith((a, b) => a === b, R.sort(diff, hand));

  const sortedGroupedHand = R.sort((a, b) => b.length - a.length, groupedHand);

  // Five of a kind, where all five cards have the same label: AAAAA
  if (sortedGroupedHand[0].length === 5) {
    return 7;
  }
  // Four of a kind, where four cards have the same label and one card has a different label: AA8AA
  if (sortedGroupedHand[0].length === 4) {
    return 6;
  }
  // Full house, where three cards have the same label, and the remaining two cards share a different label: 23332
  if (
    sortedGroupedHand[0].length === 3 &&
    sortedGroupedHand[1] &&
    sortedGroupedHand[1].length === 2
  ) {
    return 5;
  }
  // Three of a kind, where three cards have the same label, and the remaining two cards are each different from any other card in the hand: TTT98
  if (sortedGroupedHand[0].length === 3) {
    return 4;
  }
  // Two pair, where two cards share one label, two other cards share a second label, and the remaining card has a third label: 23432
  if (sortedGroupedHand[0].length === 2 && sortedGroupedHand[1].length === 2) {
    return 3;
  }

  // One pair, where two cards share one label, and the other three cards have a different label from the pair and each other: A23A4
  if (sortedGroupedHand[0].length === 2) {
    return 2;
  }
  // High card, where all cards' labels are distinct: 23456
  return 1;
};

const getNumericValue = (hand: string[]) =>
  hand
    .map((card, i) => cardToRank[card] * Math.pow(10, 6 - i))
    .reduce((a, b) => a + b, 0);

const compareHands = (hand1: string[], hand2: string[]) => {
  const hand1Rank = calculateHandRank(hand1);
  const hand2Rank = calculateHandRank(hand2);
  if (hand1Rank !== hand2Rank) {
    return hand1Rank - hand2Rank;
  }
  return getNumericValue(hand1) - getNumericValue(hand2);
};

export const solution = (input: string) => {
  const lines = input.split("\n");
  const hands = lines.map((line) => {
    const [hand, bid] = line.split(" ");
    return { hand: hand.split(""), bid: parseInt(bid) };
  });
  const sortedHands = R.sort((a, b) => compareHands(a.hand, b.hand), hands);

  return R.sum(sortedHands.map((hand, i) => hand.bid * (i + 1)));
};

console.log(solution(rawInput));
