import { cwd } from './../data-store/cwd';
import { dog } from './../dog';
import { isFalse } from 'a-type-of-js';
import { dataStore } from '../data-store';
import { _p, runOtherCode } from 'a-node-tools';
import { gitError } from '../utils';

/**
 *
 * 执行请求
 *
 */
export async function execFetchBranch() {
  const { gitInfo } = dataStore;

  const { localBranch, branch } = gitInfo;
  const fetchBrach = branch || localBranch;
  const code = 'git fetch --all';
  const result = await runOtherCode({
    // code: `git fetch ${alias}  ${fetchBrach}`,
    code,
    cwd,
    waiting: {
      info: '请稍等，正在同步线上数据',
      prefix: 0,
    },
  });

  dog('请求线上代码', code, result);
  if (isFalse(result)) {
    const message = '拉取 <' + fetchBrach + '> 出错';
    dog.error(message, result);
    _p(result.error);
    return await gitError(message);
  }
}
