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

(async () => {
  console.log("PART 1");
  const result1 = await part1();
  console.log(result1);

  console.log("PART 2");
  //   const result2 = await part2();
  //   console.log(result2);
})();
