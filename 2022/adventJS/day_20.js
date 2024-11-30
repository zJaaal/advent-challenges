function howManyReindeers(reindeerTypes, gifts) {
  reindeerTypes = reindeerTypes.sort(
    (x, y) => y.weightCapacity - x.weightCapacity
  );
  return gifts.map(({ country, weight }) => {
    //The weight we need to carry per country
    let currentMax = weight;

    //Get all the usable reindeers
    let weights = reindeerTypes.filter((x) => x.weightCapacity < currentMax);

    //Get the max they can carry together (one of each of them)
    let currentCapacity = weights.reduce(
      (acc, curr) => (acc += curr.weightCapacity),
      0
    );
    //Get the number of reindeers by type
    let reindeers = weights.map(({ type, weightCapacity }) => {
      //Get the num of the current type in descending order
      let num = (currentMax / currentCapacity) >> 0; //The integer of this division tells us how much of the current type we need

      //We substract this type weightCapacity from the total capacity we calculated
      currentCapacity -= weightCapacity;

      //And substract how much this team of reindeers can carry
      //of the currentMax weight we need to carry
      currentMax -= num * weightCapacity;

      return { type, num };
    });

    return { country, reindeers };
  });
}
const reindeerTypes = [
  { type: 'Diesel', weightCapacity: 1 },
  { type: 'Gasoline', weightCapacity: 5 },
];

const gifts = [
  { country: 'Spain', weight: 30 },
  { country: 'Germany', weight: 7 },
];

console.log(JSON.stringify(howManyReindeers(reindeerTypes, gifts)));
// [{
//   country: 'Spain',
//   reindeers: [
//     { type: 'Electric', num: 1 },
//     { type: 'Gasoline', num: 3 },
//     { type: 'Diesel', num: 5 }
//   ]
// }, {
//   country: 'France',
//   reindeers: [
//     { type: 'Electric', num: 1 },
//     { type: 'Gasoline', num: 1 },
//     { type: 'Diesel', num: 2 }
//   ]
//  }, {
//   country: 'Italy',
//   reindeers: [
//     { type: 'Electric', num: 3 },
//     { type: 'Gasoline', num: 3 },
//     { type: 'Diesel', num: 5 }
//   ]
// }]

// [
//   {
//     country: 'Spain',
//     reideers: [
//       { type: 'Electric', num: 1 },
//       { type: 'Gasoline', num: 3 },
//       { type: 'Diesel', num: 5 },
//     ],
//   },
//   {
//     country: 'France',
//     reideers: [
//       { type: 'Electric', num: 1 },
//       { type: 'Gasoline', num: 1 },
//       { type: 'Diesel', num: 2 },
//     ],
//   },
//   {
//     country: 'Italy',
//     reideers: [
//       { type: 'Electric', num: 3 },
//       { type: 'Gasoline', num: 3 },
//       { type: 'Diesel', num: 5 },
//     ],
//   },
// ];
