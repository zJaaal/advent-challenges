import fs from 'fs';

export const input = fs.readFileSync('../input.txt', 'utf8'); // The string has quotes and it just breaks the code

export const testInput = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;
