import { readInputFile, isDigit } from "../utilities.js";

async function part1() {
  const text = await readInputFile("input.txt");
  const lines = text.split("\n");
  let result = 0;
  for (const line of lines) {
    if (line) {
      let firstDigit;
      let lastDigit;
      for (let i = 0; i < line.length; i++) {
        if (isDigit(line[i])) {
          firstDigit = line[i];
          break;
        }
      }
      for (let i = line.length - 1; i >= 0; i--) {
        if (isDigit(line[i])) {
          lastDigit = line[i];
          break;
        }
      }
      result += parseInt(firstDigit + lastDigit, 10);
    }
  }
  return result;
}

function reverseString(str) {
  return str.split("").reverse().join("");
}

function findFirstDigit(str, replacements) {
  const searchPattern = new RegExp(Object.keys(replacements).join("|"));
  return replacements[str.match(searchPattern)[0]];
}

const replacements = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
  1: "1",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  7: "7",
  8: "8",
  9: "9",
};

const reverseReplacements = Object.entries(replacements).reduce(
  (acc, [key, value]) => {
    acc[reverseString(key)] = value;
    return acc;
  },
  {}
);

async function part2() {
  const text = await readInputFile("input.txt");
  const lines = text.split("\n");
  let result = 0;
  for (const line of lines) {
    if (line) {
      const firstDigit = findFirstDigit(line, replacements);
      const lastDigit = findFirstDigit(
        reverseString(line),
        reverseReplacements
      );

      result += parseInt(firstDigit + lastDigit, 10);
    }
  }
  return result;
}

(async () => {
  console.log("PART 1");
  const result1 = await part1();
  console.log(result1);

  console.log("PART 2");
  const result2 = await part2();
  console.log(result2);
})();
