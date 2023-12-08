import { readInputFile } from "./utilities.js";

const isDigit = (() => {
  const digitSet = new Set("0123456789");

  return (char) => digitSet.has(char);
})();

function isSymbol(char) {
  return char !== "." && !isDigit(char);
}

export function isPartNumber(rowIndex, colIndexWordStart, wordLength, grid) {
  function safeIsSymbol(row, col) {
    return (
      row >= 0 &&
      row < grid.length &&
      col >= 0 &&
      col < grid[row].length &&
      isSymbol(grid[row][col])
    );
  }

  for (
    let i = colIndexWordStart - 1;
    i <= colIndexWordStart + wordLength;
    i++
  ) {
    if (safeIsSymbol(rowIndex - 1, i)) return true;
  }
  if (
    safeIsSymbol(rowIndex, colIndexWordStart - 1) ||
    safeIsSymbol(rowIndex, colIndexWordStart + wordLength)
  )
    return true;
  for (
    let i = colIndexWordStart - 1;
    i <= colIndexWordStart + wordLength;
    i++
  ) {
    if (safeIsSymbol(rowIndex + 1, i)) return true;
  }

  return false;
}

async function part1() {
  const text = await readInputFile("day3_input.txt");
  const lines = text.split("\n");
  let sumOfPartNumbers = 0;
  for (const [rowIndex, line] of lines.entries()) {
    const matches = line.matchAll(/\d+/g);
    for (const match of matches) {
      const numberStr = match[0];
      if (isPartNumber(rowIndex, match.index, numberStr.length, lines)) {
        sumOfPartNumbers += parseInt(numberStr, 10);
      }
    }
  }
  return sumOfPartNumbers;
}

function isValidPosition(row, col, grid) {
  return row >= 0 && row < grid.length && col >= 0 && col < grid[row].length;
}

function fetchContigousNumber(strIndex, str) {
  let start = strIndex;
  let end = strIndex;

  while (start > 0 && isDigit(str[start - 1])) {
    start--;
  }

  while (end < str.length - 1 && isDigit(str[end + 1])) {
    end++;
  }

  const fullNumberStr = str.substring(start, end + 1); // (inclusive, exclusive)

  return [start, end, fullNumberStr];
}

function fetchGearRatioNumbers(rowIndex, strIndex, grid) {
  function safeIsDigit(row, col) {
    return isValidPosition(row, col, grid) && isDigit(grid[row][col]);
  }

  const directionDeltas = [
    [-1, -1], // topLeft
    [-1, 0], // top
    [-1, 1], // topRight
    [0, -1], // left
    [0, 1], // right
    [1, -1], // bottomLeft
    [1, 0], // bottom
    [1, 1], //bottomRight
  ];

  const uniqueNumbers = new Set();

  for (const [rowDelta, colDelta] of directionDeltas) {
    const currentRow = rowIndex + rowDelta;
    const currentCol = strIndex + colDelta;
    if (safeIsDigit(currentRow, currentCol)) {
      const [startIndex, endIndex, fullNumberStr] = fetchContigousNumber(
        currentCol,
        grid[currentRow]
      );
      uniqueNumbers.add(JSON.stringify([startIndex, endIndex, fullNumberStr]));
    }
  }

  if (uniqueNumbers.size === 2) {
    const convertedArray = [...uniqueNumbers];
    return [
      parseInt(JSON.parse(convertedArray[0])[2], 10),
      parseInt(JSON.parse(convertedArray[1])[2], 10),
    ];
  }
  return [0, 0];
}

async function part2() {
  const text = await readInputFile("day3_input.txt");
  const lines = text.split("\n");
  let sumOfGearRatios = 0;
  for (const [rowIndex, line] of lines.entries()) {
    const matches = line.matchAll(/\*/g);
    for (const match of matches) {
      // match.index is location
      const [number1, number2] = fetchGearRatioNumbers(
        rowIndex,
        match.index,
        lines
      );
      sumOfGearRatios += number1 * number2;
    }
  }
  return sumOfGearRatios;
}

(async () => {
  console.log("PART 1");
  const result1 = await part1();
  console.log(result1);

  console.log("PART 2");
  const result2 = await part2();
  console.log(result2);
})();

const testGrid1 = ["......", ".1234.", ".....*"];
const testGrid2 = ["......", ".1234.", "......"];

console.log(isPartNumber(1, 1, 4, testGrid1)); //true
console.log(isPartNumber(1, 1, 4, testGrid2)); //false
