import { readInputFile } from "../utilities.js";

function fromSourceToDestination({
  source,
  destinationRangeStart,
  sourceRangeStart,
  rangeLength,
}) {
  if (source < sourceRangeStart || source >= sourceRangeStart + rangeLength)
    return source;
  return source + (destinationRangeStart - sourceRangeStart);
}

async function part1() {
  const text = await readInputFile("input.txt");
  const lines = text.split("\n");
  console.log(lines[0]);
  return 0;
}

(async () => {
  console.log("PART 1");
  const result1 = await part1();
  console.log(result1);

  // console.log("PART 2");
  // const result2 = await part2();
  // console.log(result2);
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

// console.log(
//   fromSourceToDestination({
//     source: 49,
//     destinationRangeStart: 52,
//     sourceRangeStart: 50,
//     rangeLength: 48,
//   })
// );
// console.log(
//   fromSourceToDestination({
//     source: 52,
//     destinationRangeStart: 52,
//     sourceRangeStart: 50,
//     rangeLength: 48,
//   })
// );
// console.log(
//   fromSourceToDestination({
//     source: 50,
//     destinationRangeStart: 52,
//     sourceRangeStart: 50,
//     rangeLength: 48,
//   })
// );
