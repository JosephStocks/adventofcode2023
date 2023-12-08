import { promises as fs } from "fs";

//UNUSED but could be useful utility function
function replaceFirstMatch(str, replacements) {
  const searchPattern = new RegExp(Object.keys(replacements).join("|"));
  return str.replace(searchPattern, (match) => replacements[match]);
}

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

async function readInputFile(filePath) {
  try {
    return await fs.readFile(filePath, "utf8");
  } catch (err) {
    console.error(err);
  }
}

async function fetchAndSaveInputToFile(dayNum) {
  const response = await fetch(
    `https://adventofcode.com/2023/day/${dayNum}/input`,
    {
      headers: {
        cookie:
          "session=53616c7465645f5f5dbdabc712426835ec5af78c977a4f4d077beedada13410e0fb2fe8f412addc27438fb61c17323b2ec1aa5492df9b43702477cd1214c6e18",
      },
    }
  );
  const text = await response.text();

  await fs.writeFile(`day${dayNum}_input.txt`, text, "utf8");

  return text;
}

fetchAndSaveInputToFile(3);

export { readInputFile };
