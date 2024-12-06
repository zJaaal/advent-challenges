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

In this part you need to fix the invalid ones and sum the middle value of them.
 */
// Not really performant, but I'm fine with it.
// To make it performant, you can use Topological Sort, transform the input into a graph and check if it's a DAG (Graph without cycles)
// If it's a DAG, you can sort the graph and check if the order of the list are correct using the sorted graph as reference.
function findIncorrect(order, updatesList) {
  const incorrect = [];

  for (let updates of updatesList) {
    const versions = updates.split(',');
    let error = '';

    const isValid = versions.every((version) => {
      const ORDER_REGEX = new RegExp(
        `(${version}\\|\\d+)|(\\d+\\|${version})`,
        'g'
      );

      return order.match(ORDER_REGEX).every((match) => {
        const [left, right] = match.split('|');

        if (!updates.includes(left) || !updates.includes(right)) return true;

        const RULE_REGEX = new RegExp(`${left}.+(?=${right})`, 'g');

        const checkResult = RULE_REGEX.test(updates);

        if (!checkResult) {
          error = match;
        }

        return checkResult;
      });
    });

    if (!isValid) {
      incorrect.push({
        updates,
        error,
      });
    }
  }

  return incorrect;
}

function solution(input) {
  const [order, updates] = input.split('\n\n');

  const updatesList = updates.split('\n');

  const incorrects = findIncorrect(order, updatesList);

  let result = 0;

  // For every incorrect
  for (let incorrect of incorrects) {
    let currentUpdates = incorrect;

    // If is not valid, swap again according to the order
    while (true) {
      const updatesList = currentUpdates.updates.split(',') ?? [];

      const [left, right] = currentUpdates.error.split('|');

      const leftIndex = updatesList.indexOf(left);
      const rightIndex = updatesList.indexOf(right);

      // Swap the values
      [updatesList[leftIndex], updatesList[rightIndex]] = [right, left];

      // Check again
      [currentUpdates] = findIncorrect(order, [updatesList.join(',')]);

      // If is valid, break the loop
      if (!currentUpdates) {
        const half = Math.floor(updatesList.length / 2);

        result += Number(updatesList[half]);
        break;
      }
    }
  }

  return result;
}

console.log(solution(input));
// console.log(solution(testInput));
