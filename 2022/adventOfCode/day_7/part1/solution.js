import { input, testInput } from '../input.js';
console.clear();
console.log('----------------------------------');

/*
To begin, find all of the directories with a total size of at most 100000,
then calculate the sum of their total sizes.
In the example above, these directories are a and e;
the sum of their total sizes is 95437 (94853 + 584).
(As in this example, this process can count files more than once!)

Find all of the directories with a total size of at most 100000.
What is the sum of the total sizes of those directories?
 */

/*
  SOLVED!
*/
let root = ['/'];
function solution(input) {
  let inputArray = input.split(`\n`);
  let rootFolder = {
    parentId: null,
    id: '/',
    children: [],
    size: null,
  };
  let currentFolder = {};

  inputArray.forEach((cmd, i, array) => {
    if (cmd.includes('$')) {
      let cmdArgs = cmd.split(' ');

      //Decide between commands
      switch (cmdArgs[1]) {
        case 'cd': {
          //Manipulate the current path
          if (cmdArgs[2] != '..') {
            if (cmdArgs[2] != '/') root.push(cmdArgs[2]);
          } else if (root.length > 1) root.pop();
          //Search the node
          currentFolder = searchNode(rootFolder, [...root]);
          break;
        }
        case 'ls': {
          //After we found the node, let's fill it with files
          fillFolder(currentFolder, array.slice(i + 1), currentFolder.id);
          //That slice is the commands from the first file after the ls until the end.
          break;
        }
      }
    }
  });

  return getFinalResult(calculateSizes(rootFolder, 0)[1], 0);
}

//This function takes the current path and a node to search the current folder
function searchNode(node, path) {
  //Is the node the one we are searching for?
  if (node.id == path[0]) {
    //We found the first node
    path.shift();
    //No more path, return the node
    if (!path.length) return node;
    else {
      //Still having path left? Keep going through
      for (let i = 0; i < node.children.length; i++) {
        let foundNode = searchNode(node.children[i], path);
        //Found? Return it
        if (foundNode) return foundNode;
      }
    }
  }
  //If the algorithm doesn't found anything in the beginning it will return undefined
  return undefined;
}

function fillFolder(node, files, parentId) {
  for (let file of files) {
    //Format the command
    let currentFile = file.split(' ');

    //It's not a command
    if (currentFile[0] != '$') {
      //It's a directory
      if (currentFile[0] != 'dir')
        node.children.push({
          parentId,
          id: currentFile[1],
          children: null,
          size: +currentFile[0],
        });
      //it's a file
      else
        node.children.push({
          parentId,
          id: currentFile[1],
          children: [],
          size: null,
        });

      //I'ts a command, then there's no more files
    } else break;
  }
}

function calculateSizes(node) {
  let currentSize = 0;

  //Let's go through its children to calculate the size
  node.children.forEach((node) => {
    //It's a directory
    if (node.children) {
      //Calculate sizes in his children
      currentSize += calculateSizes(node)[0];
    } else currentSize += node.size; // Not a directory, just use it's base size
  });
  node.size = currentSize; // Set the size in the node
  return [currentSize, node]; // Return the currentSize and the final node with sizes
}

function getFinalResult(node, finalResult) {
  node.children.forEach((node) => {
    //We sum all the values that are in range
    if (node.size < 100000 && node.children) {
      finalResult += node.size;
    }
    //Calculate in children
    if (node.children) {
      finalResult += getFinalResult(node, 0);
    }
  });
  return finalResult;
}

console.log(JSON.stringify(solution(input)));
