import { promises as fs } from "fs"; // OR import fs from 'node:fs/promises'

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

  await fs.writeFile(`day${dayNum}/input.txt`, text, "utf8");

  return text;
}

fetchAndSaveInputToFile(5);
