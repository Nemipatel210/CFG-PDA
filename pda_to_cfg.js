// Function to generate permutations
function generatePermutations(states, temp, permutes, k) {
  if (k === 0) {
      permutes.push([...temp]);
  } else {
      for (let i = 0; i < states.length; i++) {
          temp[k - 1] = states[i];
          generatePermutations(states, temp, permutes, k - 1);
      }
  }
}

// Function to print permutations
function printPermutations(fromState, input, topStack, toState, pushStack, states) {
  let i, j;
  const temp = new Array(pushStack.length).fill('');
  const permutes = [];

  generatePermutations(states, temp, permutes, pushStack.length);

  for (i = 0; i < permutes.length; i++) {
      let output = `[${fromState}${topStack}${permutes[i][0]}] -> ${input} [${toState}${pushStack[0]}`;
      for (j = 1; j < permutes[i].length; j++) {
          output += `][${permutes[i][j]}${pushStack[j]}`;
      }
      output += `][${permutes[i][0]}]\n`;
      console.log(output);
  }
}

// Function to convert PDA to CFG
function PDA_to_CFG(fromState, input, topStack, toState, pushStack, states) {
  let i, j;
  const n = fromState.length;

  console.log(`Start State = S -> [${states[0]}Z${states[0]}]`);
  for (i = 1; i < states.length; i++) {
      console.log(` | [${states[0]}Z${states[i]}]`);
  }

  for (i = 0; i < n; i++) {
      console.log(`\nδ(${fromState[i]},${input[i]},${topStack[i]}) = (${toState[i]},${pushStack[i]})`);
      if (pushStack[i] === "ε") {
          console.log(`[${fromState[i]}${topStack[i]}${toState[i]}] -> ${input[i]}`);
      } else {
          printPermutations(fromState[i], input[i], topStack[i], toState[i], pushStack[i], states);
      }
  }

  console.log();
  for (i = 0; i < states.length; i++) {
      for (j = 0; j < states.length; j++) {
          console.log(`[${states[i]}Z${states[j]}] -> ε`);
      }
  }
}

// Main function
function main() {
  const fromState = [];
  const toState = [];
  const topStack = [];
  const input = [];
  const pushStack = [];
  const states = [];

  const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
  });

  readline.question("Enter states of the PDA separated by spaces: ", (line) => {
      states.push(...line.trim().split(' '));

      console.log("Enter PDA transitions in the format δ(q,0,Z) = (q,XZ):");
      console.log("(Press Enter after each transition, type 'done' to finish)");

      const inputTransitions = [];

      function processTransitions() {
          if (inputTransitions.length === 0) {
              console.log("No transitions provided. Exiting.");
              readline.close();
              return;
          }

          inputTransitions.forEach((transition) => {
              const [from, inp, stackTop, toPush] = transition.split(',').map(str => str.trim());
              fromState.push(from);
              input.push(inp);
              topStack.push(stackTop);
              toState.push(toPush.split(',')[0]);
              pushStack.push(toPush.split(',')[1]);
          });

          console.log("PDA given as input:");
          console.log("States =", states.join(' '));
          for (let i = 0; i < fromState.length; i++) {
              console.log(`δ(${fromState[i]}, ${input[i]}, ${topStack[i]}) = (${toState[i]}, ${pushStack[i]})`);
          }

          console.log("Corresponding CFG:");
          PDA_to_CFG(fromState, input, topStack, toState, pushStack, states);
          readline.close();
      }

      (function readTransitions() {
          readline.question("Transition: ", (line) => {
              if (line === "done") {
                  processTransitions();
              } else {
                  inputTransitions.push(line);
                  readTransitions();
              }
          });
      })();
  });
}

// Run the main function
main();
