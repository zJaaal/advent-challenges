console.clear();
console.log('----------------------------------');

/*
We have already wrapped hundreds of presents 🎁… but an elf forgot to check if the present, represented by an asterisk *, is inside the box.

The box has a present (*) and counts as "inside the box" if:

It is completely surrounded by # on the box's edges.
The * is not on the box's edges.
Keep in mind that the * can be inside, outside, or may not even be there. We must return true if the * is inside the box and false otherwise.
*/
function inBox(box) {
  const PATTERN = /^#.*\*.*#$/gm;

  return (
    !(PATTERN.test(box[0]) || PATTERN.test(box.at(-1))) &&
    PATTERN.test(box.join('\n'))
  );
}

console.log(inBox(['###', '#*#', '###'])); // ➞ true

console.log(inBox(['####', '#* #', '#  #', '####'])); // ➞ true

console.log(inBox(['*####', '#   #', '#  #*', '####'])); // ➞ false

console.log(inBox(['#####', '#   #', '#   #', '#   #', '#####'])); // ➞ false
