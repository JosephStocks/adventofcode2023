import { readInputFile } from "../utilities.js";

async function main() {
  const text = await readInputFile("input.txt");
  const lines = text.split("\n");
  let sumOfWinningPoints = 0;
  for (const [rowIndex, line] of lines.entries()) {
    if (line) {
      const [card, numbers] = line.split(": ");
      const [_, cardId] = card.split(/\s+/);
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

(async () => {
  const result = await main();
})();
