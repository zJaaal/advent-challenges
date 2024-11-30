console.clear();

//Backtracking approach (not good at all)
// function getMaxGifts(giftsCities, maxGifts, maxCities) {
//   const backtrackSums = (giftsCities, maxGifts, maxCities, currentGifts) => {
//     for (let gift of giftsCities) {
//       if (!currentGifts.includes(gift) && currentGifts.length < maxCities)
//         currentGifts.push(gift);
//       else continue;

//       let currentSum = backtrackSums(
//         giftsCities,
//         maxGifts,
//         maxCities,
//         currentGifts
//       );
//       if (currentGifts.length == maxCities && currentSum <= maxGifts)
//         return currentSum;

//       if (currentSum <= maxGifts)
//         return currentGifts.reduce((acc, curr) => (acc += curr), 0);
//       else {
//         currentGifts.pop();
//       }
//     }
//     return currentGifts.reduce((acc, curr) => (acc += curr), 0);
//   };

//   giftsCities = giftsCities
//     .map((gift) => backtrackSums(giftsCities, maxGifts, maxCities, [gift]))
//     .filter((x) => x <= maxGifts);
//   return Math.max(...(giftsCities.length ? giftsCities : [0]));
// }

// JS Pure Approach
// 209 points
function getMaxGifts(giftsCities, maxGifts, maxCities) {
  return ((_) =>
    Math.max(
      ...giftsCities
        .sort((x, y) => y - x)
        .reduce(
          (result, _, i) => (
            i && giftsCities.unshift(giftsCities.pop()),
            (i = giftsCities
              .slice(0, maxCities)
              .reduce((acc, curr) => (acc += curr), 0)),
            i <= maxGifts && result.push(i),
            i - giftsCities[maxCities - 1] <= maxGifts &&
              result.push(i - giftsCities[maxCities - 1]),
            result
          ),
          []
        ),
      0
    ))();
}

console.log(getMaxGifts([50, 10, 40, 1000, 500, 200], 199, 4));
