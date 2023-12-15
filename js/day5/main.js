import { readInputFile } from "../utilities.js";
import path from "path";
import { fileURLToPath } from "url";

function buildFilePath(filename) {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  return path.join(__dirname, filename);
}

function fromSourceToDestination(source, transformations) {
  for (const {
    destinationRangeStart,
    sourceRangeStart,
    rangeLength,
  } of transformations) {
    if (source >= sourceRangeStart && source < sourceRangeStart + rangeLength)
      return source + (destinationRangeStart - sourceRangeStart);
  }
  return source;
}

async function part1() {
  const text = await readInputFile(buildFilePath("input.txt"));
  let sections = text
    .split(/\n\s*\n/)
    .filter((str) => str.trim())
    .map((section) => section.split("\n"))
    .map((array) => array.filter((str) => str.trim()));
  let seeds = sections[0][0]
    .split(/\s+/)
    .filter((str) => str.trim())
    .slice(1)
    .map((str) => parseInt(str, 10));
  let maps = sections.slice(1);
  maps = maps.map((arr) =>
    arr.slice(1).map((str) => str.split(/\s+/).map((str) => parseInt(str, 10)))
  );
  maps = maps.map((arr) =>
    arr.map(([destinationRangeStart, sourceRangeStart, rangeLength]) => ({
      destinationRangeStart,
      sourceRangeStart,
      rangeLength,
    }))
  );
  let [
    seedToSoil,
    soilToFertilizer,
    fertilizerToWater,
    waterToLight,
    lightToTemperature,
    temperatureToHumidity,
    humidityToLocation,
  ] = maps;

  const locations = seeds.map((seed) => {
    const soil = fromSourceToDestination(seed, seedToSoil);
    const fertilizer = fromSourceToDestination(soil, soilToFertilizer);
    const water = fromSourceToDestination(fertilizer, fertilizerToWater);
    const light = fromSourceToDestination(water, waterToLight);
    const temperature = fromSourceToDestination(light, lightToTemperature);
    const humidity = fromSourceToDestination(
      temperature,
      temperatureToHumidity
    );
    const location = fromSourceToDestination(humidity, humidityToLocation);
    return location;
  });

  return Math.min(...locations);
}

async function part2() {
  const text = await readInputFile(buildFilePath("input.txt"));
  let sections = text
    .split(/\n\s*\n/)
    .filter((str) => str.trim())
    .map((section) => section.split("\n"))
    .map((array) => array.filter((str) => str.trim()));
  let seeds = sections[0][0]
    .split(/\s+/)
    .filter((str) => str.trim())
    .slice(1)
    .map((str) => parseInt(str, 10));
  let maps = sections.slice(1);
  maps = maps.map((arr) =>
    arr.slice(1).map((str) => str.split(/\s+/).map((str) => parseInt(str, 10)))
  );
  maps = maps.map((arr) =>
    arr.map(([destinationRangeStart, sourceRangeStart, rangeLength]) => ({
      destinationRangeStart,
      sourceRangeStart,
      rangeLength,
    }))
  );

  let [
    seedToSoil,
    soilToFertilizer,
    fertilizerToWater,
    waterToLight,
    lightToTemperature,
    temperatureToHumidity,
    humidityToLocation,
  ] = maps;

  function seedToLocation(seed) {
    const soil = fromSourceToDestination(seed, seedToSoil);
    const fertilizer = fromSourceToDestination(soil, soilToFertilizer);
    const water = fromSourceToDestination(fertilizer, fertilizerToWater);
    const light = fromSourceToDestination(water, waterToLight);
    const temperature = fromSourceToDestination(light, lightToTemperature);
    const humidity = fromSourceToDestination(
      temperature,
      temperatureToHumidity
    );
    const location = fromSourceToDestination(humidity, humidityToLocation);
    return location;
  }

  function* numberSequence(start, length) {
    for (let i = 0; i < length; i++) {
      yield start + i;
    }
  }
  let minLocationSoFar = Infinity;
  for (let i = 0; i < seeds.length; i += 2) {
    const seedStart = seeds[i];
    const seedLength = seeds[i + 1];

    for (const seed of numberSequence(seedStart, seedLength)) {
      minLocationSoFar = Math.min(minLocationSoFar, seedToLocation(seed));
    }
  }

  return minLocationSoFar;
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

seeds: 79 14 55 13

seed-to-soil map:
50 98 2                         --> 98 to 50; 99 to 51;
52 50 48    
         --> 50 to 52
         --> 51 to 53
         --> 52 to 54
         --> 53 to 55
         --> 54 to 56
         --> 55 to 57
         --> 56 to 58
         --> 57 to 59
         --> 58 to 60
         --> 59 to 61
         --> 60 to 62
         --> 61 to 63
         --> 62 to 64
         --> 63 to 65

         translation: X Y Z
         source range is      [Y to Y + Z - 1] => 98 to 98 + 2 - 1 => 98 to 99
         destination range is [X to X + Z - 1] => 50 to 50 + 2 - 1 => 50 to 51
         source to destination:
              98 - 48 = 

         translation: X Y Z
         source range is      [Y to Y + Z - 1] => 50 to 50 + 48 - 1 => 50 to 97
         destination range is [X to X + Z - 1] => 52 to 52 + 48 - 1 => 52 to 99

         adjustment = X - Y or 52 - 50 = 2
         destionation = source + adjustment => destination = 59 + adjustment = 59 + (52 - 50) = 59 + 2 = 61.
         if (source < Y or source >= Y + Z) return the source value exactly as the destination.
         if (source < 98 or source >= 98 + 2)
         if (source < 98 or source >= 100)

map:
destination_range_start source_range_start range_length
*/
