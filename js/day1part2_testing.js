function replaceStrings(str, replacements) {
  const searchPattern = new RegExp(Object.keys(replacements).join("|"), "g");
  return str.replace(searchPattern, (match) => replacements[match]);
}

// Example usage
const replacements = {
  apple: "orange",
  banana: "berry",
  cherry: "grape",
};

const originalString = "I like apple, banana, and cherry.";
const replacedString = replaceStrings(originalString, replacements);

console.log(replacedString); // Outputs: "I like orange, berry, and grape."
