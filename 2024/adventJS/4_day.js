console.clear();
console.log('----------------------------------');

/*
It's time to put up the Christmas tree at home! 🎄 But this year we want it to be special. We're going to create a function that receives the height of the tree (a positive integer between 1 and 100) and a special character to decorate it.

The function should return a string that represents the Christmas tree, constructed as follows:

The tree is made up of triangles of special characters.
The spaces on the sides of the tree are represented with underscores _.
All trees have a trunk of two lines, represented by the # character.
The tree should always have the same length on each side.
You must ensure the tree has the correct shape using line breaks \n for each line.
*/

function createXmasTree(height, ornament) {
  const POLE_SPACES = '_'.repeat(height - 1);
  const POLE = `${POLE_SPACES}#${POLE_SPACES}\n${POLE_SPACES}#${POLE_SPACES}`;

  let TREE_TOP = `${POLE_SPACES}${ornament}${POLE_SPACES}\n`;

  let TREE = TREE_TOP;

  // Match adjacent underscores and replace them with the ornament
  const regex = new RegExp(`_(?=\\${ornament})|(?<=\\${ornament})_`, 'g');

  for (let i = 1; i < height; i++) {
    TREE_TOP = TREE_TOP.replace(regex, ornament);
    TREE += `${TREE_TOP}`;
  }

  return `${TREE}${POLE}`;
}

const tree = createXmasTree(5, '*');
console.log(tree);
/*
____*____
___***___
__*****__
_*******_
*********
____#____
____#____
*/

const tree2 = createXmasTree(3, '+');
console.log(tree2);
/*
__+__
_+++_
+++++
__#__
__#__
*/

const tree3 = createXmasTree(6, '@');
console.log(tree3);
/*
_____@_____
____@@@____
___@@@@@___
__@@@@@@@__
_@@@@@@@@@_
@@@@@@@@@@@
_____#_____
_____#_____
*/
