//UNUSED but could be useful utility function
function replaceFirstMatch(str, replacements) {
  const searchPattern = new RegExp(Object.keys(replacements).join("|"));
  return str.replace(searchPattern, (match) => replacements[match]);
}
