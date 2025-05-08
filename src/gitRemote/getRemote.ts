import { runOtherCode } from 'a-node-tools';
import { dataStore } from '../data-store';
import { gitError } from '../utils';
import { parseRemoteAlias } from './parseRemoteAlias';
import { chooseAlias } from './chooseAlias';
import { setAlias } from './setAlias';

/**
 *
 * 获取远端库信息
 *
 */
export async function getRemote() {
  const { gitInfo } = dataStore;
  /**  获取远程仓库信息  */
  const result = await runOtherCode({
    code: 'git remote -v',
    printLog: false,
  });

  // 获取远程仓库信息 ❌
  if (!result.success) {
    await gitError(result.error);
  }
  /**  获取远程仓库信息 ✅  */
  const remoteAliases = parseRemoteAlias(result.data!);

  // 获取远程仓库信息 ✅  判断是否为🈳
  // 本地的远程库设置为🈳时则清🈳配置
  // 清🈳配置而 commandParameters.alias 不为🈳
  if (remoteAliases.length === 0) {
    gitInfo.alias = '';
    gitInfo.url = '';
    return;
  }

  // 主动配置了远程库别名且别名在本地的组中
  // 本地配置的 alias 与主动设置的一样，则直接返回
  if (gitInfo.alias && remoteAliases.includes(gitInfo.alias)) {
    return;
  } else {
    if (remoteAliases.length === 1) {
      // 如果只有一个远程库，则直接设置别名
      return setAlias(remoteAliases[0], true);
    } else {
      //  存在多个远端代码库的别名且都不包含主动设置的值时采用问询的方式设置值
      return await chooseAlias(remoteAliases);
    }
  }
}
