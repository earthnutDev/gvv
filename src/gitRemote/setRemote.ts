import { runOtherCode } from 'a-node-tools';
import { dataStore } from '../data-store';
import { gitError } from '../utils';
import { isFalse } from 'a-type-of-js';
import { dog } from '../dog';

/**
 *
 *  配置远程库
 *
 *  在通过 `question` 获取到远程仓库信息后，进行配置
 *
 */
export async function setRemote() {
  const { gitInfo } = dataStore;
  const code = `git remote add ${gitInfo.alias} ${gitInfo.url}`;
  const result = await runOtherCode(code);
  dog('配置远程库', code, result);

  if (isFalse(result.success)) {
    return await gitError(result.error);
  }
}
