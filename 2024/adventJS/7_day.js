console.clear();
console.log('----------------------------------');

/*

Instructions
Results
Medium
The grinch 👹 has passed through Santa Claus's workshop! And what a mess he has made. He has changed the order of some packages, so shipments cannot be made.

Luckily, the elf Pheralb has detected the pattern the grinch followed to jumble them. He has written the rules that we must follow to reorder the packages. The instructions are as follows:

You will receive a string containing letters and parentheses.
Every time you find a pair of parentheses, you need to reverse the content within them.
If there are nested parentheses, solve the innermost ones first.
Return the resulting string with parentheses removed, but with the content correctly reversed.
He left us some examples:
*/
/** @param {string} packages with parentheses
 *  @returns {string} Fixed and sorted packages
 */
function fixPackages(packages) {
  const parenthesesRegex = /\(([^\(\)]+)\)/;
  const currentMatch = packages.match(parenthesesRegex);

  return currentMatch
    ? fixPackages(
        packages.replace(
          currentMatch[0],
          currentMatch[1].split('').reverse().join('')
        )
      )
    : packages;
}

console.log(fixPackages('a(cb)de'));
// ➞ "abcde"
// We reverse "cb" inside the parentheses

console.log(fixPackages('a(bc(def)g)h'));
// ➞ "agdefcbh"
// 1st we reverse "def" → "fed", then we reverse "bcfedg" → "gdefcb"

console.log(fixPackages('abc(def(gh)i)jk'));
// ➞ "abcighfedjk"
// 1st we reverse "gh" → "hg", then "defhgi" → "ighfed"

console.log(fixPackages('a(b(c))e'));
// ➞ "acbe"
// 1st we reverse "c" → "c", then "bc" → "cb"
