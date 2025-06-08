import { isBusinessEmptyString, isZero } from 'a-type-of-js';
import { dog } from './../dog';
import { _p, runOtherCode } from 'a-node-tools';
import { gitError } from '../utils';
import { parseRemoteAlias } from './parseRemoteAlias';
import { chooseAlias } from './chooseAlias';
import { setAlias } from './setAlias';
import { magentaPen } from 'color-pen';
import { commandParameters } from '../data-store/commandParameters';
import { gitInfo } from '../data-store/gitInfo';

/**
 *
 * 获取远端库信息
 *
 */
export async function getRemote() {
  const code = 'git remote -v';
  /**  获取远程仓库信息  */
  const result = await runOtherCode(code);
  dog('获取远端的库信息', code, result);
  // 获取远程仓库信息 ❌
  if (!result.success || !result.data) {
    dog.error('未获取远程仓库', result);
    await gitError(result.error);
  }

  /**  获取远程仓库信息 ✅  */
  const remoteAliases = parseRemoteAlias(result.data!);
  /**  设置的远程的列表  */
  const remoteList = Object.keys(remoteAliases);
  /**  远程的设定数量  */
  const remoteNumber: number = remoteList.length;

  dog('获取当前配置的远程', remoteAliases);

  // 获取远程仓库信息 ✅  判断是否为🈳
  // 本地的远程库设置为🈳时则清🈳配置
  // 清🈳配置而 commandParameters.alias 不为🈳
  if (isZero(remoteNumber)) {
    gitInfo.alias = '';
    gitInfo.url = '';
    return;
  }

  const { alias } = commandParameters;

  // 主动配置了远程库别名且别名在本地的组中
  // 本地配置的 alias 与主动设置的一样，则直接返回
  if (alias && remoteAliases[alias]) {
    gitInfo.alias = alias;
    return setAlias(alias, false);
  } else {
    if (!isBusinessEmptyString(alias))
      _p(`您提供的远端别名${magentaPen(alias)}不存在于本地`);

    if (remoteNumber === 1) {
      // 如果只有一个远程库，则直接设置别名
      return setAlias(remoteList[0], true);
    } else {
      return await chooseAlias(remoteAliases);
    }
  }
}
