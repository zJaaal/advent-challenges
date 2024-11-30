function fixLetter(letter) {
  return (
    (letter = letter
      .trim('')
      .replace(/\?{2,}/g, '?')
      .replace(/\!{2,}/g, '!')
      .replace(/\.{2,}/g, '.')
      .replace(/\s{2,}/g, ' ')
      .replace(/santa claus/gi, 'Santa Claus')
      .replace(/\s{1,}\,/g, ',')
      .replace(/\s{1,}\./g, '.')
      .replace(/\s{1,}\?/g, '?')
      .replace(/\s{1,}\!/g, '!')
      .replace(
        /(\?\s|\.\s|\!\s)([a-z])/g,
        (_, p1, p2) => `${p1}${p2.toUpperCase()}`
      )
      .replace(/^[a-z]/, (match) => match.toUpperCase())),
    letter.match(/(\.|\?|\!)$/) || (letter += '.'),
    letter
  );
}
console.log(
  fixLetter(
    ` hello  ,  how are you??     do you know if santa claus exists?  i really hope he does!  bye  `
  )
);
