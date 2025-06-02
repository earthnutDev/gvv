import { cyanPen, greenPen, magentaPen } from 'color-pen';
import { isFalse } from 'a-type-of-js';
import { dog } from './../dog';
import { _p, runOtherCode } from 'a-node-tools';
import { gitError } from '../utils';
import { pushFail } from './pushFail';
import { gitInfo } from '../data-store/gitInfo';
/**
 *
 * 推送代码到远程库
 *
 */
export async function push() {
  const { alias, branch, localBranch, force } = gitInfo;
  /**  推送的实际分支  */
  const pushBrach = branch || localBranch;
  /**  执行的 shell 命令  */
  const code = `git push ${alias} ${localBranch}:${pushBrach} ${force ? '--force' : ''} --tag`;

  const result = await runOtherCode({
    code,
    printLog: true,
    waiting: `正在将本地 ${greenPen(localBranch)} 推送到 ${magentaPen(alias)} 的 ${cyanPen(pushBrach)} `,
  });
  dog('执行推送的代码为：', code, result);

  /// 推动出现错误
  if (isFalse(result.success)) {
    dog.error('执行推送出现了问题');

    return pushFail(result.error);
  }
  /// 当前与线上一致的情况下
  if (
    [result.error, result.data].some(e => e.startsWith('Everything up-to-date'))
  ) {
    dog.error('显示没有可推送的文件。但是，不可能会走到这一步呀，在没有');
    return await gitError('看起来所有更新都已经提交');
  }
  gitInfo.tagged = false;
  gitInfo.committed = false;

  _p('🎉🎉 完结 🎉🎉 撒花 🎉🎉');
}
