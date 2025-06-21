import { Dog } from '@qqi/log';
import { isFalse } from 'a-type-of-js';

export const dog = new Dog({
  name: 'gvv',
  type: 'error',
});

/**  生产环境  */
export const dun = isFalse(dog.type);
