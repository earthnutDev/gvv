import { dog } from './../dog';
import { runOtherCode } from 'a-node-tools';
import { dataStore } from '../data-store';
import { gitError } from '../utils';
import { parseRemoteAlias } from './parseRemoteAlias';
import { chooseAlias } from './chooseAlias';
import { setAlias } from './setAlias';
import { cyanPen } from 'color-pen';

/**
 *
 * 获取远端库信息
 *
 */
export async function getRemote() {
  const { gitInfo } = dataStore;
  const code = 'git remote -v';
  /**  获取远程仓库信息  */
  const result = await runOtherCode({
    code,
    printLog: false,
  });
  dog('获取远端的库信息', code, result);
  // 获取远程仓库信息 ❌
  if (!result.success) {
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
  if (remoteNumber === 0) {
    gitInfo.alias = '';
    gitInfo.url = '';
    return;
  }

  // 主动配置了远程库别名且别名在本地的组中
  // 本地配置的 alias 与主动设置的一样，则直接返回
  if (gitInfo.alias && remoteAliases[gitInfo.alias]) {
    return;
  } else {
    if (remoteNumber === 1) {
      // 如果只有一个远程库，则直接设置别名
      return setAlias(remoteAliases[0], true);
    } else {
      //  存在多个远端代码库的别名且都不包含主动设置的值时采用问询的方式设置值
      console.log('当前存在多个远程库配置：');
      remoteList.forEach(e => console.log(cyanPen(e), remoteAliases[e]));
      return await chooseAlias(remoteList);
    }
  }
}
