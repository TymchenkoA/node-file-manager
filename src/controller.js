import readlinePromises from 'node:readline/promises';

const rl = readlinePromises.createInterface({
  input: process.stdin,
  output: process.stdout,
}); 

export const getUserInput = () => {
    return new Promise ((resolve) => {
        rl.on('line', (input) => {
            resolve(input);
          }); 
    });
};
