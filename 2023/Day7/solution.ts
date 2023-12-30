import * as fs from 'fs';

const inputLines = fs.readFileSync('input.txt', 'utf8').split('\n');

enum HandType {
  HighCard,
  OnePair,
  TwoPair,
  ThreeOfAKind,
  FullHouse,
  FourOfAKind,
  FiveOfAKind,
}

const cards = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
const cardsWithJokerRule = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'];

interface CamelCard {
  hand: string[];
  bid: number;
  type: HandType;
}

function getXOfAKind(cardMap: Map<string, number>, x: number): [string, number][] {
  return Array.from(cardMap.entries()).filter(([_, count]) => count === x);
}

function getCardStrength(cardDeck: string[], card: string): number {
  return cardDeck.length - cardDeck.indexOf(card);
}

function getHandType(hand: string[], useJokerRule: boolean): HandType {
  // If all cards are the same, it's a five of a kind
  if (hand.every((card) => card === hand[0])) {
    return HandType.FiveOfAKind;
  }

  if (useJokerRule) {
    let bestHandType = HandType.HighCard;

    // Consider all possible substitutions for 'J'
    for (const substitute of cards) {
      const substitutedHand = hand.map(card => card === 'J' ? substitute : card);
      const currentHandType = getHandType(substitutedHand, false);
      bestHandType = Math.max(bestHandType, currentHandType);
    }
    return bestHandType;
  }

  const cardMap = new Map<string, number>();
  for (const card of hand) {
    const count = cardMap.get(card) || 0;
    cardMap.set(card, count + 1);
  }

  // If all cards are the same except one, it's a four of a kind
  const fourOfTheSame = getXOfAKind(cardMap, 4);
  if (fourOfTheSame.length > 0) {
    return HandType.FourOfAKind;
  }

  // If three cards have the same label and the remaining two have the same label (but different from the first three), it's a full house
  const threeOfTheSame = getXOfAKind(cardMap, 3);
  const twoOfTheSame = getXOfAKind(cardMap, 2);

  if (threeOfTheSame.length > 0 && twoOfTheSame.length > 0) {
    return HandType.FullHouse;
  }

  // If three cards are the same and the other two are both different, it's three of a kind
  const uniqueCards = getXOfAKind(cardMap, 1);

  if (threeOfTheSame.length > 0 && uniqueCards.length === 2) {
    return HandType.ThreeOfAKind;
  }

  // If two pair are the same and the other is different, it's two pair
  if (twoOfTheSame.length === 2 && uniqueCards.length === 1) {
    return HandType.TwoPair;
  }

  // If two cards are the same and the other three are all different, it's one pair
  if (twoOfTheSame.length === 1 && uniqueCards.length === 3) {
    return HandType.OnePair;
  }

  // If the cards are all different, it's a high card

  return HandType.HighCard;
}

function parseCamelCards(inputLines: string[], useJokerRule = false): CamelCard[] {
  const camelCards: CamelCard[] = [];
  for (const line of inputLines) {
    const [cards, bid] = line.split(' ');
    const hand = cards.split('');

    camelCards.push({
      hand,
      bid: parseInt(bid, 10),
      type: getHandType(hand, useJokerRule),
    });
  }
  return camelCards;
}

function getSolution1(inputLines: string[]) {
  let sol = 0;

  let camelCards = parseCamelCards(inputLines);

  // Sort by type:
  camelCards = camelCards.sort((a, b) => b.type - a.type);

  // Sort the hands of the same type by their card strength:
  camelCards = camelCards.sort((a, b) => {
    if (a.type === b.type) {
      // Compare all the strengths of the cards in the hand
      for (let i = 0; i < a.hand.length; i++) {
        const aStrength = getCardStrength(cards, a.hand[i]);
        const bStrength = getCardStrength(cards, b.hand[i]);
        if (aStrength !== bStrength) {
          return bStrength - aStrength;
        }
      }
    }
    return 0;
  });

  camelCards = camelCards.reverse();

  // Calculate the score:
  sol = camelCards.reduce((acc, camelCard, index) => acc + camelCard.bid * (index + 1), 0);

  return sol;
}

function getSolution2(inputLines: string[]) {
  let sol = 0;

  let camelCards = parseCamelCards(inputLines, true);

  // Sort by type:
  camelCards = camelCards.sort((a, b) => b.type - a.type);

  // Sort the hands of the same type by their card strength:
  camelCards = camelCards.sort((a, b) => {
    if (a.type === b.type) {
      // Compare all the strengths of the cards in the hand
      for (let i = 0; i < a.hand.length; i++) {
        const aStrength = getCardStrength(cardsWithJokerRule, a.hand[i]);
        const bStrength = getCardStrength(cardsWithJokerRule, b.hand[i]);
        if (aStrength !== bStrength) {
          return bStrength - aStrength;
        }
      }
    }
    return 0;
  });

  camelCards = camelCards.reverse();

  // Calculate the score:
  sol = camelCards.reduce((acc, camelCard, index) => acc + camelCard.bid * (index + 1), 0);

  return sol;
}

// Part 1
const solution1 = getSolution1(inputLines);
console.log(`Solution part 1: ${solution1}`);

// Part 2
const solution2 = getSolution2(inputLines);
console.log(`Solution part 2: ${solution2}`);
