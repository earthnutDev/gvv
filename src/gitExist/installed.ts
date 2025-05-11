import { isFalse } from 'a-type-of-js';
import { dog } from './../dog';
import { runOtherCode } from 'a-node-tools';
import { gitError } from '../utils';

/**
 *
 *  git 是否安装
 *
 */
export async function gitInstalled() {
  const result = await runOtherCode({ code: 'git -h', printLog: false });

  dog('当前 git 安装情况', result);

  /**  输出为🈳，则有 ❌   */
  if (isFalse(result.success)) {
    dog.error('git 未安装', result);

    await gitError(result.error);
  }
}
