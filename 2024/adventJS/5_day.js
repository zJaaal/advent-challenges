console.clear();
console.log('----------------------------------');

/*
Santa Claus's elves 🧝🧝‍♂️ have found a bunch of mismatched magic boots in the workshop.
Each boot is described by two values:

type indicates if it's a left boot (I) or a right boot (R).
size indicates the size of the boot.

Your task is to help the elves pair all the boots of the same size having a left and a right one.
To do this, you should return a list of the available sizes after pairing the boots.
*/

function organizeShoes(shoes) {
  let shoeMap = {};
  const result = [];

  const SHOE_PAIR_REGEX = /IR|RI/; // regex to check if a pair of shoes is available

  // for of one liner because why not?
  for (let shoe of shoes)
    (shoeMap[shoe.size] ??= ''), // if shoeMap[shoe.size] is undefined, set it to ''
      (shoeMap[shoe.size] += shoe.type), // append shoe type to shoeMap[shoe.size]
      SHOE_PAIR_REGEX.test(shoeMap[shoe.size]) && // if shoeMap[shoe.size] has a pair
        (result.push(shoe.size), (shoeMap[shoe.size] = '')); // push shoe size to result and reset shoeMap[shoe.size]

  return result;
}

const shoes = [
  { type: 'I', size: 38 },
  { type: 'R', size: 38 },
  { type: 'R', size: 42 },
  { type: 'I', size: 41 },
  { type: 'I', size: 42 },
];

console.log(organizeShoes(shoes));
// [38, 42]

const shoes2 = [
  { type: 'I', size: 38 },
  { type: 'R', size: 38 },
  { type: 'I', size: 38 },
  { type: 'I', size: 38 },
  { type: 'R', size: 38 },
];

console.log(organizeShoes(shoes2));
// [38, 38]

const shoes3 = [
  { type: 'I', size: 38 },
  { type: 'R', size: 36 },
  { type: 'R', size: 42 },
  { type: 'I', size: 41 },
  { type: 'I', size: 42 },
];

console.log(organizeShoes(shoes3));
// []
