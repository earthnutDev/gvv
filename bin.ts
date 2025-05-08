#!/usr/bin/env node

import { dog } from './src/dog';
import { main } from './src/main';

try {
  await main();
} catch (error) {
  dog.error(error);
}
