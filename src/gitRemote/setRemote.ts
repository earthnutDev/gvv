import { runOtherCode } from 'a-node-tools';
import { dataStore } from '../data-store';
import { gitError } from '../utils';
import { isFalse } from 'a-type-of-js';

/**
 *
 *  配置远程库
 *
 *  在通过 `question` 获取到远程仓库信息后，进行配置
 *
 */
export async function setRemote() {
  const { gitInfo } = dataStore;
  const result = await runOtherCode({
    code: `git remote add ${gitInfo.alias} ${gitInfo.url}`,
    printLog: false,
  });

  if (isFalse(result.success)) {
    await gitError(result.error);
  }
}
