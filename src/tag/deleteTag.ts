import { cwd } from './../data-store/cwd';
import { dog } from './../dog';
import { gitInfo } from './../data-store/gitInfo';
import { isTrue } from 'a-type-of-js';
import { dataStore } from '../data-store';
import { runOtherCode } from 'a-node-tools';

/**
 *
 * 删除已打好的 tag
 *
 */
export async function deleteTag() {
  const { pkg, tag } = dataStore;
  gitInfo.tagged = false;
  /**  标签  */
  const _tag = isTrue(tag) ? 'v'.concat(pkg.version) : tag;
  const code = `git tag -d ${_tag}`;
  const result = await runOtherCode({ code, cwd });
  dog('删除已打好的标签', code, result);
}
