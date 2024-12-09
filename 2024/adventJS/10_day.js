console.clear();
console.log('----------------------------------');

/*
Assembler.
*/

/**
 * @param {string[]} instructions - The instructions to execute
 * @returns {number} The value of the register A
 */
function compile(instructions) {
  let variables = {};
  let pointer = 0;
  const actions = {
    MOV: (x, y) => {
      variables[y] = isNaN(x) ? Number(variables[x]) : Number(x);
      ++pointer;
    },
    INC: (x) => {
      variables[x] = ~~variables[x] + 1;
      ++pointer;
    },
    DEC: (x) => {
      variables[x] = ~~variables[x] - 1;
      ++pointer;
    },
    JMP: (x, y) => {
      if (~~variables[x] == 0) {
        pointer = y;
      } else ++pointer;
    },
  };

  while (pointer < instructions.length) {
    let [action, arg1, arg2 = 0] = instructions[pointer].split(' ');

    actions[action](arg1, arg2);
  }

  return variables['A'];
}

const instructions = [
  'MOV -1 C', // copies -1 to register 'C',
  'INC C', // increments the value of register 'C'
  'JMP C 1', // jumps to the instruction at index 1 if 'C' is 0
  'MOV C A', // copies register 'C' to register 'A',
  'INC A', // increments the value of register 'A'
];

console.log(compile(instructions)); // -> 2

/**
 Step-by-step execution:
 0: MOV -1 C -> The register C receives the value -1
 1: INC C    -> The register C becomes 0
 2: JMP C 1  -> C is 0, jumps to the instruction at index 1
 1: INC C    -> The register C becomes 1
 2: JMP C 1  -> C is 1, the instruction is ignored
 3: MOV C A  -> Copies register C to A. Now A is 1
 4: INC A    -> The register A becomes 2
 */
