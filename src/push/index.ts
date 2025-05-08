import { dog } from './../dog';
import { _p, runOtherCode } from 'a-node-tools';
import { dataStore } from '../data-store';
import { gitError } from '../utils';

/**
 *
 * 推送代码到远程库
 *
 */
export async function push() {
  const { gitInfo } = dataStore;

  const { alias, branch, localBranch, force } = gitInfo;

  const code = `git push ${alias} ${localBranch}:${branch || localBranch} ${force ? '--force' : ''}`;
  dog('执行推送的代码为：', code);
  const result = await runOtherCode({
    code,
    printLog: false,
  });

  if (!result.success) {
    dog.error('执行推送出现了问题', result.error, result.data);
    return await gitError(result.error);
  }

  _p('🚀🚀  推送成功 🍰  🤔 完结 🎉🎉 撒花 🎉🎉');
}
