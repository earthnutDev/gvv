#!/usr/bin/env node

import { command } from './src/command';
import { dog } from './src/dog';
import { main } from './src/main';

(async () => {
  try {
    await main();
  } catch (error) {
    dog.error(error);
    command.end();
  }
})();
