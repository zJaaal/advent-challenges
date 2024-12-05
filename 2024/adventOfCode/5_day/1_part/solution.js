import { input, testInput } from '../input.js';
console.clear();
console.log('----------------------------------');

/*
Safety protocols clearly indicate that new pages for the safety manuals
must be printed in a very specific order. The notation X|Y means that
if both page number X and page number Y are to be produced as part of
an update, page number X must be printed at some point before page number Y.

The Elf has for you both the page ordering rules and the pages to produce
in each update (your puzzle input), but can't figure out whether each
update has the pages in the right order.
 */

function solution(input) {
  const [order, updates] = input.split('\n\n');

  const updatesList = updates.split('\n');
  let result = 0;

  for (let update of updatesList) {
    const versions = update.split(',');
    let currentOrder = order;

    const isValid = versions.every((version) => {
      const ORDER_REGEX = new RegExp(
        `(${version}\\|\\d+)|(\\d+\\|${version})`,
        'g'
      );

      return currentOrder.match(ORDER_REGEX).every((matches) => {
        const [left, right] = matches.split('|');
        currentOrder = currentOrder.replace(matches, '');

        if (!update.includes(left) || !update.includes(right)) return true;

        const RULE_REGEX = new RegExp(`${left}.+(?=${right})`, 'g');

        return RULE_REGEX.test(update);
      });
    });

    if (isValid) {
      const updateList = update.split(',');
      const half = Math.floor(updateList.length / 2);

      result += Number(updateList[half]);
    }
  }

  return result;
}

console.log(solution(input));
// console.log(solution(testInput));
