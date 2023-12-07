import { readInputFile } from "./utilities.js";

// 12 red cubes, 13 green cubes, and 14 blue cubes
const colorToMAX = {
  red: 12,
  green: 13,
  blue: 14,
};

function isGameValid(handfuls) {
  const results = [];
  for (const handful of handfuls) {
    for (const [_, amount, color] of handful.matchAll(
      /(\d+)\s+(red|blue|green)/g
    )) {
      if (amount > colorToMAX[color]) return false;
    }
  }
  return true;
}

async function part1() {
  const text = await readInputFile("day2_input.txt");
  const lines = text.split("\n");
  let sumOfIds = 0;
  for (const line of lines) {
    if (line) {
      const [left, right] = line.split(":");
      const gameId = parseInt(left.trim().split(" ")[1], 10);
      const handfuls = right.trim().split(";");
      if (isGameValid(handfuls)) sumOfIds += parseInt(gameId, 10);
    }
  }
  return sumOfIds;
}

function getMaxOfEachColor(handfuls) {
  const maxForEachColor = {
    red: 0,
    green: 0,
    blue: 0,
  };

  for (const handful of handfuls) {
    for (const [_, amount, color] of handful.matchAll(
      /(\d+)\s+(red|blue|green)/g
    )) {
      maxForEachColor[color] = Math.max(amount, maxForEachColor[color]);
    }
  }
  return maxForEachColor;
}

async function part2() {
  const text = await readInputFile("day2_input.txt");
  const lines = text.split("\n");
  let sumOfPowers = 0;
  for (const line of lines) {
    if (line) {
      const [left, right] = line.split(":");
      const gameId = parseInt(left.trim().split(" ")[1], 10);
      const handfuls = right.trim().split(";");
      const { red, green, blue } = getMaxOfEachColor(handfuls);
      sumOfPowers += red * green * blue;
    }
  }
  return sumOfPowers;
}

(async () => {
  console.log("PART 1");
  const result1 = await part1();
  console.log(result1);

  console.log("PART 2");
  const result2 = await part2();
  console.log(result2);
})();
