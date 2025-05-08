import { runOtherCode } from 'a-node-tools';
import { gitError } from '../utils';

/**
 *
 *  git 是否安装
 *
 */
export async function gitInstalled() {
  const result = await runOtherCode({ code: 'git -h', printLog: false });
  /**  输出为🈳，则有 ❌   */
  if (!result.success) {
    await gitError(result.error);
  }
}
