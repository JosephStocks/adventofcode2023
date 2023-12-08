import { isPartNumber } from "./main";

const testGrid1 = ["......", ".1234.", ".....*"];
const testGrid2 = ["......", ".1234.", "......"];

console.log(isPartNumber(1, 1, 4, testGrid1)); //true
console.log(isPartNumber(1, 1, 4, testGrid2)); //false
