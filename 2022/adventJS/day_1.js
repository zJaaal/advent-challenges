console.clear();
function wrapping(gifts) {
  return gifts.map(
    (gift, i) => ((i = '*'.repeat(gift.length + 2)), `${i}\n*${gift}*\n${i}`)
  );
}

console.log(wrapping(['book', 'game', 'socks']));
