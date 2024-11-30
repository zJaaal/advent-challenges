//My solution
// function countTime(leds) {
//   if (leds.every((x) => x)) return 0;
//   return (
//     7 +
//     countTime(
//       leds.map((x, i) => {
//         if (!i && x == 0 && leds.at(-1) == 1) return 1;
//         if (i && x == 0 && leds[i - 1] == 1) return 1;

//         return x;
//       })
//     )
//   );
// }

//Another solution (not mine)
//Basicly this counts how much it takes to turn on every 0
function countTime(leds) {
  //How much 0 are together after this, is how much it takes for every 0
  const arr = leds.join('').split('1');
  //This just puts the last and the first together
  arr[0] += arr.splice(-1);
  //Take the max length of every one, because thats the number of iterations needed
  return Math.max(...arr.map((x) => x.length)) * 7;
}

const leds = [1, 1, 0, 0, 0, 0];
console.log(countTime(leds));
