import { getCurrentDir } from '../../utils/getCurrentDir.js';

export const goUp = async() => {
    try {
        process.chdir('..');
        getCurrentDir();
    
      } catch (err) {
        console.error('Operation failed');
      }
};
