async function fetchInputText() {
  return (
    await fetch("https://adventofcode.com/2023/day/1/input", {
      headers: {
        cookie:
          "session=53616c7465645f5f5dbdabc712426835ec5af78c977a4f4d077beedada13410e0fb2fe8f412addc27438fb61c17323b2ec1aa5492df9b43702477cd1214c6e18",
      },
    })
  ).text();
}

const digits = new Set("0123456789");

// (async () => {
//   const text = await fetchInputText();
//   const lines = text.split("\n");
//   let result = 0;
//   for (const line of lines) {
//     if (line) {
//       let firstDigit;
//       let lastDigit;
//       for (let i = 0; i < line.length; i++) {
//         if (digits.has(line[i])) {
//           firstDigit = line[i];
//           break;
//         }
//       }
//       for (let i = line.length - 1; i >= 0; i--) {
//         if (digits.has(line[i])) {
//           lastDigit = line[i];
//           break;
//         }
//       }
//       result += parseInt(firstDigit + lastDigit, 10);
//     }
//   }
//   console.log(result);
// })();

// function replaceStrings(str, replacements) {
//   const searchPattern = new RegExp(Object.keys(replacements).join("|"), "g");
//   return str.replace(searchPattern, (match) => replacements[match]);
// }

const wordToDigitMap = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

function replaceFirstAndLast(str) {
  // Function to replace a word with its corresponding digit
  const replaceWord = (word) => wordToDigitMap[word.toLowerCase()] ?? word;

  // Create a regular expression from the map keys
  const regex = new RegExp(Object.keys(wordToDigitMap).join("|"), "gi");

  // Find all matches
  const matches = [...str.matchAll(regex)].map((match) => match[0]);

  // Replace the first occurrence
  if (matches.length > 0) {
    const firstMatch = matches[0];
    str = str.replace(firstMatch, replaceWord(firstMatch));
  }

  // Replace the last occurrence (if there's more than one match)
  if (matches.length > 1) {
    const lastMatch = matches[matches.length - 1];
    str = str.replace(
      new RegExp(lastMatch + "(?!.*" + lastMatch + ")"),
      replaceWord(lastMatch)
    );
  }

  return str;
}

const originalString =
  "This is one example. Maybe two or three examples. Ending with nine.";
const replacedString = replaceFirstAndLast(originalString);

console.log(replacedString);

//Part 2

(async () => {
  console.log("PART 2");
  const text = await fetchInputText();
  const lines = text.split("\n");
  let result = 0;
  for (let line of lines) {
    if (line) {
      let lineold = line;
      line = replaceFirstAndLast(line);
      console.log(lineold, line);
      let firstDigit;
      let lastDigit;
      for (let i = 0; i < line.length; i++) {
        if (digits.has(line[i])) {
          firstDigit = line[i];
          break;
        }
      }
      for (let i = line.length - 1; i >= 0; i--) {
        if (digits.has(line[i])) {
          lastDigit = line[i];
          break;
        }
      }
      result += parseInt(firstDigit + lastDigit, 10);
    }
  }
  console.log(result);
})();
