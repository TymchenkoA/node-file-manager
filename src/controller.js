import readlinePromises from 'node:readline/promises';

const rl = readlinePromises.createInterface({
  input: process.stdin,
  output: process.stdout,
}); 


//Causes MaxListenersExceededWarning

// export const getUserInput = () => {
//     return new Promise ((resolve) => {
//         rl.on('line', (input) => {
//             resolve(input);
//           }); 
//     });
// };

export const getUserInput = async() => {
  const input = await rl.question('');
  return input;
};

export const closeInterface = () => {
  rl.close();
};
