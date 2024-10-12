import { getCurrentDir } from '../../utils/getCurrentDir.js';

export const changeDir = async(path) => {
    try {
        process.chdir(path);
        getCurrentDir();
    
      } catch (err) {
        console.error('Operation failed');
      }
};
