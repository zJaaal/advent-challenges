console.clear();
console.log('----------------------------------');

/*
The Grinch has been up to his tricks in the North Pole and has planted explosive coal bombs 💣 in the elves' toy factory.
He wants all the toys to be rendered useless, and that's why he has left a grid where some cells have explosive coal (true) and others are empty (false).

The elves need your help to map the dangerous areas.
Each empty cell should display a number indicating how many explosive coal bombs there are in the adjacent positions, including diagonals.
*/
/**
 * @param {string} agenda
 * @param {string} phone
 * @returns {{ name: string, address: string } | null}
 */
function findInAgenda(agenda, phone) {
  const agendaArray = agenda.split('\n');

  const phoneMatches = agendaArray.filter((line) => line.includes(phone));

  if (phoneMatches.length !== 1) return null;

  const name = phoneMatches[0].match(/<(.*)>/)[1];

  const address = phoneMatches[0].replace(/<.*>|\+[\d-]+/g, '').trim();

  return {
    name,
    address,
  };
}

const agenda = `+34-600-123-456 Calle Gran Via 12 <Juan Perez>
Plaza Mayor 45 Madrid 28013 <Maria Gomez> +34-600-987-654
<Carlos Ruiz> +1-800-555-0199 Fifth Ave New York`;

console.log(findInAgenda(agenda, '34-600-123-456'));
// { name: "Juan Perez", address: "Calle Gran Via 12" }

console.log(findInAgenda(agenda, '600-987'));
// { name: "Maria Gomez", address: "Plaza Mayor 45 Madrid 28013" }

console.log(findInAgenda(agenda, '111'));
// null
// Explanation: No results

console.log(findInAgenda(agenda, '1'));
// null
// Explanation: Too many results
// null
// Explanation: Too many results
