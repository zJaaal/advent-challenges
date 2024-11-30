// Hacky solution
// Midu invalidated this solution
// function checkPart(part) {
//   if (new Set([...part.split('')]).size == part.length) return false;
//   return [0, 2, part.length].includes(
//     part.split('').reduce((acc, curr, i, array) => {
//       if (curr !== array[array.length - i - 1]) acc.push(curr);
//       return acc;
//     }, []).length
//   );
// }

// Idea extracted from https://github.com/RicardoxDev/adventJS/blob/main/2022/challenge-08/app.js 180 points
// But optimized 260 points
function checkPart(part) {
  const reverse = (arr) => arr.reverse().join('');
  part = part.split('');
  let oldLetter = '';

  return part.some(
    (letter, i, result) => (
      (oldLetter = letter),
      (part[i] = ''),
      (result = reverse(part) === reverse(part)),
      !result && (part[i] = oldLetter),
      result
    )
  );
}
console.log(checkPart('ymolomoloy')); // > true (should be false)
