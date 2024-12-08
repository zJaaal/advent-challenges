console.clear();
console.log('----------------------------------');

/*
It's time to select the fastest reindeer for Santa's journeys! 🦌🎄
Santa Claus has organized exciting reindeer races to determine which ones are in the best shape.

Your task is to display each reindeer's progress on a snow track in isometric format.

The information you receive:

indices: An array of integers representing each reindeer's progress on the track:
0: The lane is empty.
Positive number: The reindeer's current position from the beginning of the track.
Negative number: The reindeer's current position from the end of the track.
length: The length of each lane.
Return a string representing the race track:

Each lane has exactly length positions filled with snow (~).
Each reindeer is represented with the letter r.
Lanes are numbered at the end with /1, /2, etc.
The view is isometric, so the lower lanes are shifted to the right.
*/
/**
 * @param {number[]} indices - The reno indices
 * @param {number} length - The length of the race
 * @returns {string} The reno race
 */
function drawRace(indices, length) {
  return indices
    .reduce((acc, index, i) => {
      const shift = ' '.repeat(indices.length - i - 1);
      const lane = ` /${i + 1}`;
      // mod arithmetics
      const realIndex = ((index % length) + length) % length;
      // 0 if index is greater than 0, 1 otherwise
      const reindeerExistence = Number(!index);
      // Returns 'r' if reindeerExistence is 0, '' otherwise
      const reindeer = 'r'.slice(reindeerExistence);

      const raceLine = `${'~'.repeat(realIndex)}${reindeer}`.padEnd(
        length,
        '~'
      );

      acc.push(shift + raceLine + lane);

      return acc;
    }, [])
    .join('\n');
}

console.log(drawRace([0, 5, -3], 10));
/*
  ~~~~~~~~~~ /1
 ~~~~~r~~~~ /2
~~~~~~~r~~ /3
*/

console.log(drawRace([2, -1, 0, 5], 8));
/*
   ~~r~~~~~ /1
  ~~~~~~~r /2
 ~~~~~~~~ /3
~~~~~r~~ /4
*/

console.log(drawRace([3, 7, -2], 12));
/*
  ~~~r~~~~~~~~ /1
 ~~~~~~~~r~~~ /2
~~~~~~~~~r~~ /3
*/
