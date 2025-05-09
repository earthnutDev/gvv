import { dog } from './../dog';
import { runOtherCode } from 'a-node-tools';
import { dataStore } from '../data-store';
import { gitError } from '../utils';

/**
 *
 * 校验当前远程仓库地址的正确性
 *
 */
export async function verifyRemoteUrl() {
  const { gitInfo } = dataStore;
  const result = await runOtherCode({
    code: `git ls-remote --heads ${gitInfo.url}`,
    printLog: false,
  });

  dog('校验当前远程仓库地址的正确性 ', result);

  if (!result.success) {
    dog.error('校验当前远程仓库地址的正确性', result.error);
    return await gitError(result.error);
  }
}
