console.clear();
console.log('-----------------------');

function carryGifts(gifts, maxWeight) {
  return gifts
    .reduce(
      (acc, current, lastBag, flag) => (
        (lastBag = acc.at(-1)),
        (flag =
          lastBag[0].replace(' ', '').length + current.length <= maxWeight),
        flag && (lastBag[0] = lastBag[0].trim() + ' ' + current),
        !flag && current.length <= maxWeight && acc.push([current]),
        acc
      ),
      [['']]
    )
    .map((x) => x[0].trim())
    .filter((x) => x.length);
}

console.log(carryGifts(['toy', 'toy', 'toy', 'toy'], 9));
// ['toy toy toy', 'toy']
// ['game bike', 'book toy']
// in each bag you can carry 10kg
// the first bag carries 'game' and 'bike' which weigh 4kg and 4kg
// the second bag carries 'book' and ' toy' which weigh 4kg and 3kg

console.log(carryGifts(['game', 'bike', 'book', 'toy'], 7));
// ['game', 'bike', 'book toy']
// in each bag you can carry 7kg
// the first bag can only carry 'game' which weighs 4kg
// the second bag can only carry 'bike' which weighs 4kg

console.log(carryGifts(['game', 'bike', 'book', 'toy'], 4));
// ['game', 'bike', 'book', 'toy']
// in each bag you can carry 4kg
// each bag can only carry one gift

console.log(carryGifts(['toy', 'gamme', 'toy', 'bike'], 6));
// ['toy', 'gamme', 'toy', 'bike']
// in each bag you can carry 6kg
// each bag can only carry one gift
// note that you can not carry 'toy toy' in a bag
// because it is not next to each other
