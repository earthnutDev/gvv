import { cwd } from './../data-store/cwd';
import { dataStore } from '../data-store';
import { dog } from './../dog';
import { _p, runOtherCode } from 'a-node-tools';
import { isFalse } from 'a-type-of-js';
import { gitError } from '../utils';
import { magentaPen } from 'color-pen';

/**
 * 合并分支
 */
export async function execMerge() {
  const { gitInfo } = dataStore;
  const { alias, localBranch, branch } = gitInfo;
  const mergeBrach = branch || localBranch;
  const code = `git merge  ${alias}/${mergeBrach}`;
  const result = await runOtherCode({
    code,
    waiting: '请等待代码合并',
    cwd,
  });
  dog('合并分支', code, result);
  if (isFalse(result.success)) {
    dog.error('合并分支出现问题', result);
    _p(magentaPen`大概率是代码冲突了，请检查`);
    if (
      [result.error, result.data].some(e =>
        e.includes(
          'Your local changes to the following files would be overwritten by merge',
        ),
      )
    ) {
      //
    } else {
      return await gitError('合并分支出现问题', result.error);
    }
  }
  dog('合并分支', result);
}
