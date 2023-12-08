/**
 * In Camel Cards, you get a list of hands, and your goal is to order them based on the strength of each hand. A hand consists of five cards labeled one of A, K, Q, J, T, 9, 8, 7, 6, 5, 4, 3, or 2. The relative strength of each card follows this order, where A is the highest and 2 is the lowest.

Every hand is exactly one type. From strongest to weakest, they are:

Five of a kind, where all five cards have the same label: AAAAA
Four of a kind, where four cards have the same label and one card has a different label: AA8AA
Full house, where three cards have the same label, and the remaining two cards share a different label: 23332
Three of a kind, where three cards have the same label, and the remaining two cards are each different from any other card in the hand: TTT98
Two pair, where two cards share one label, two other cards share a second label, and the remaining card has a third label: 23432
One pair, where two cards share one label, and the other three cards have a different label from the pair and each other: A23A4
High card, where all cards' labels are distinct: 23456
Hands are primarily ordered based on type; for example, every full house is stronger than any three of a kind.

If two hands have the same type, a second ordering rule takes effect. Start by comparing the first card in each hand. If these cards are different, the hand with the stronger first card is considered stronger. If the first card in each hand have the same label, however, then move on to considering the second card in each hand. If they differ, the hand with the higher second card wins; otherwise, continue with the third card in each hand, then the fourth, then the fifth.

So, 33332 and 2AAAA are both four of a kind hands, but 33332 is stronger because its first card is stronger. Similarly, 77888 and 77788 are both a full house, but 77888 is stronger because its third card is stronger (and both hands have the same first and second card).

To play Camel Cards, you are given a list of hands and their corresponding bid (your puzzle input). For example:

32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
This example shows five hands; each hand is followed by its bid amount. Each hand wins an amount equal to its bid multiplied by its rank, where the weakest hand gets rank 1, the second-weakest hand gets rank 2, and so on up to the strongest hand. Because there are five hands in this example, the strongest hand will have rank 5 and its bid will be multiplied by 5.

So, the first step is to put the hands in order of strength:

32T3K is the only one pair and the other hands are all a stronger type, so it gets rank 1.
KK677 and KTJJT are both two pair. Their first cards both have the same label, but the second card of KK677 is stronger (K vs T), so KTJJT gets rank 2 and KK677 gets rank 3.
T55J5 and QQQJA are both three of a kind. QQQJA has a stronger first card, so it gets rank 5 and T55J5 gets rank 4.
Now, you can determine the total winnings of this set of hands by adding up the result of multiplying each hand's bid with its rank (765 * 1 + 220 * 2 + 28 * 3 + 684 * 4 + 483 * 5). So the total winnings in this example are 6440.

Find the rank of every hand in your set. What are the total winnings?
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
  console.log("groupedHand", groupedHand);

  const sortedGroupedHand = R.sort((a, b) => b.length - a.length, groupedHand);
  console.log("sortedGroupedHand", sortedGroupedHand);

  // Five of a kind, where all five cards have the same label: AAAAA
  if (sortedGroupedHand[0].length === 5) {
    return 7;
  }
  // Four of a kind, where four cards have the same label and one card has a different label: AA8AA
  if (sortedGroupedHand[1].length === 4) {
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

const compareHands = (hand1: string[], hand2: string[]) => {
  const hand1Rank = calculateHandRank(hand1);
  const hand2Rank = calculateHandRank(hand2);
  if (hand1Rank !== hand2Rank) {
    return hand1Rank > hand2Rank ? 1 : -1;
  }
  let index = 0;
  while (index < 5) {
    const hand1Card = hand1[index];
    const hand2Card = hand2[index];
    if (hand1Card !== hand2Card) {
      return hand1Card > hand2Card ? 1 : -1;
    }
    index++;
  }
  return 0;
};

export const solution = (input: string) => {
  const lines = input.split("\n");
  const hands = lines.map((line) => {
    const [hand, bid] = line.split(" ");
    console.log({ split: hand.split("") });
    return { hand: hand.split(""), bid: parseInt(bid) };
  });
  console.log({ hands: JSON.stringify(hands) });
  const sortedHands = R.sort((a, b) => compareHands(a.hand, b.hand), hands);

  console.log({ sortedHands: JSON.stringify(sortedHands) });

  return R.sum(sortedHands.map((hand, i) => hand.bid * (i + 1)));
};

console.log(solution(rawInput));

// 252474522 is too high
// 251029473 is answer
