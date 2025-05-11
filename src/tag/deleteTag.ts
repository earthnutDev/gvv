import { isTrue } from 'a-type-of-js';
import { dataStore } from './../data-store';
import { runOtherCode } from 'a-node-tools';

/**
 *
 * 删除已打好的 tag
 *
 */
export async function deleteTag() {
  const { pkg, tag } = dataStore;
  await runOtherCode({
    code: `git tag -d ${isTrue(tag) ? 'v'.concat(pkg.version) : tag}`,
  });
}
