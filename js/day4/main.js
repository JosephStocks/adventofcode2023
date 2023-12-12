import { readInputFile } from "../utilities.js";

async function part1() {
  const text = await readInputFile("input.txt");
  const lines = text.split("\n");
  let sumOfWinningPoints = 0;
  for (const line of lines) {
    if (line) {
      const [_, numbers] = line.split(": ");
      let [winningNumbers, myNumbers] = numbers.split(" | ");
      winningNumbers = new Set(winningNumbers.trim().split(/\s+/));
      myNumbers = new Set(myNumbers.trim().split(/\s+/));
      const matching = [...winningNumbers].filter((x) => myNumbers.has(x));
      if (matching.length > 0) {
        sumOfWinningPoints += 2 ** (matching.length - 1);
      }
    }
  }
  return sumOfWinningPoints;
}

function toInt(numStr) {
  return parseInt(numStr, 10);
}

async function part2() {
  const text = await readInputFile("input.txt");
  const lines = text.split("\n");
  const cardIdToNumMatching = new Map();
  for (const line of lines) {
    if (line) {
      const [card, numbers] = line.split(": ");
      let [_, cardId] = card.split(/\s+/);
      cardId = toInt(cardId);
      let [winningNumbers, myNumbers] = numbers.split(" | ");
      winningNumbers = new Set(winningNumbers.trim().split(/\s+/));
      myNumbers = new Set(myNumbers.trim().split(/\s+/));
      const numMatching = [...winningNumbers].filter((x) =>
        myNumbers.has(x)
      ).length;
      cardIdToNumMatching.set(cardId, numMatching);
    }
  }

  let numScratchCards = 0;
  function traverse(cardId, numMatching) {
    numScratchCards++;
    for (let i = 1; i < numMatching + 1; i++) {
      traverse(cardId + i, cardIdToNumMatching.get(cardId + i));
    }
  }

  for (const [cardId, numMatching] of cardIdToNumMatching) {
    traverse(cardId, numMatching);
  }
  return numScratchCards;
}

(async () => {
  console.log("PART 1");
  const result1 = await part1();
  console.log(result1);

  console.log("PART 2");
  const result2 = await part2();
  console.log(result2);
})();

/*

1: 4 |
2: 2 | *
3: 2 | * *
4: 1 | * * * 
5: 0 | *   * *
6: 0 |






*/
