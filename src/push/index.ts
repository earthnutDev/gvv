import { isFalse } from 'a-type-of-js';
import { dog } from './../dog';
import { _p, runOtherCode } from 'a-node-tools';
import { dataStore } from '../data-store';
import { gitError, gitReset } from '../utils';
import { deleteTag } from '../tag/deleteTag';
/**
 *
 * 推送代码到远程库
 *
 */
export async function push() {
  const { gitInfo, commandParameters } = dataStore;

  const { alias, branch, localBranch, force } = gitInfo;

  const code = `git push ${alias} ${localBranch}:${branch || localBranch} ${force ? '--force' : ''}`;

  dog('执行推送的代码为：', code);
  const result = await runOtherCode({
    code,
    printLog: false,
  });

  /// 推动出现错误
  if (isFalse(result.success)) {
    dog.error('执行推送出现了问题', result.error, result.data);
    if (!isFalse(commandParameters.tag)) {
      await deleteTag();
    }
    await gitReset(); // 执行错误时取消已经提交的提交
    return await gitError(result.error);
  }
  dog('推送的结果是', result.data);

  /// 当前与线上一致的情况下
  if (result.error.startsWith('Everything up-to-date')) {
    dog.error('显示没有可推送的文件。但是，不可能会走到这一步呀，在没有');
    return await gitError('看起来所有更新都已经提交');
  }

  _p('🚀🚀  推送成功 🍰  🤔 完结 🎉🎉 撒花 🎉🎉');
}
