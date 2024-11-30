function executeCommands(commands) {
  let memory = [0, 0, 0, 0, 0, 0, 0, 0];

  let pointer = 0;

  let actions = {
    MOV: (value, memoryPointer) => {
      memoryPointer = +memoryPointer.replace(/V\d/, '');
      memory[memoryPointer] = +value;
      isNaN(+value) &&
        ((value = +value.replace(/V\d/, '')),
        (memory[memoryPointer] = memory[value]));

      ++pointer;
    },
    DEC: (memoryPointer) => {
      memoryPointer = +memoryPointer.replace(/V\d/, '');
      memory[memoryPointer] = (((memory[memoryPointer] - 1) % 256) + 256) % 256;
      ++pointer;
    },
    INC: (memoryPointer) => {
      memoryPointer = +memoryPointer.replace(/V\d/, '');
      memory[memoryPointer] = (memory[memoryPointer] + 1) % 256;
      ++pointer;
    },
    ADD: (base, add) => {
      base = +base.replace(/V\d/, '');
      add = +add.replace(/V\d/, '');
      memory[base] = (memory[base] + memory[add]) % 256;
      ++pointer;
    },
    JMP: (index) => {
      ++pointer;
      memory[0] && (pointer = +index);
    },
  };

  while (pointer < commands.length) {
    let [command, ...args] = commands[pointer].split(' ');
    args = args[0].split(',');
    actions[command](...args);
  }

  return memory;
}

console.log(executeCommands(['MOV 254,V00', 'MOV 2,V01', 'ADD V00,V01']));

// Output: [0, 2, 0, 0, 0, 0, 0]

console.log(
  executeCommands([
    'MOV 255,V00', // V00 is 255
    'INC V00', // V00 is 256, overflows to 0
    'DEC V01', // V01 is -1, overflows to 255
    'DEC V01', // V01 is 254
  ])
);
// Output: [0, 254, 0, 0, 0, 0, 0]

console.log(
  executeCommands([
    'MOV 10,V00', // V00 is 10
    'DEC V00', // decrement V00 by 1  <---┐
    'INC V01', // increment V01 by 1      |
    'JMP 1', //   loop until V00 is 0 ----┘
    'INC V06', // increment V06 by 1
  ])
);

// Output: [ 0, 10, 0, 0, 0, 0, 1, 0 ]
console.log(
  executeCommands([
    'MOV 10,V00',
    'MOV V00,V01',
    'MOV V01,V02',
    'MOV V02,V03',
    'MOV V03,V04',
  ])
);

Output: [(10, 10, 10, 10, 10, 0, 0, 0)];

//This doesn't pass a random test for some reason
// function executeCommands(commands) {
//   let memory = [0, 0, 0, 0, 0, 0, 0, 0];

//   let pointer = 0;

//   let pointers = {
//     V00: 0,
//     V01: 1,
//     V02: 2,
//     V03: 3,
//     V04: 4,
//     V05: 5,
//     V06: 6,
//     V07: 7,
//   };

//   let actions = {
//     MOV: (value, memoryPointer) => {
//       memoryPointer = pointers[memoryPointer];
//       if (isNaN(+value)) {
//         value = pointers[value];
//         memory[memoryPointer] = memory[value];
//       } else {
//         memory[memoryPointer] = +value;
//       }
//       ++pointer;
//     },
//     DEC: (memoryPointer) => {
//       memoryPointer = pointers[memoryPointer];
//       memory[memoryPointer] = (((memory[memoryPointer] - 1) % 256) + 256) % 256;
//       ++pointer;
//     },
//     INC: (memoryPointer) => {
//       memoryPointer = pointers[memoryPointer];
//       memory[memoryPointer] = (memory[memoryPointer] + 1) % 256;
//       ++pointer;
//     },
//     ADD: (base, add) => {
//       base = pointers[base];
//       add = pointers[add];
//       memory[base] = (memory[base] + memory[add]) % 256;
//       ++pointer;
//     },
//     JMP: (index) => {
//       pointer = memory[0] ? +index : pointer + 1;
//     },
//   };

//   while (pointer < commands.length) {
//     let [command, ...args] = commands[pointer].split(' ');
//     args = args[0].split(',');
//     actions[command](...args);
//   }

//   return memory;
// }
