/****************************************************************************
 *  @Author earthnut
 *  @Email earthnut.dev@outlook.com
 *  @ProjectName gvv
 *  @FileName index.ts
 *  @CreateDate  周日  04/13/2025
 *  @Description git 的分支分析 🧐
 *
 *
 ****************************************************************************/
import { dataStore } from '../data-store';
import { getLocalBranch } from './getLocalBranch';
import { getRemoteBranch } from './getRemoteBranch';
import { hasRemote } from '../gitRemote';

/**
 *
 * git 分支 💥
 *
 */
export async function gitBranch(): Promise<void> {
  const { gitInfo } = dataStore;

  // 获取本地分支信息
  await getLocalBranch();

  // 获取远端分支信息
  await getRemoteBranch();

  //  当两者🀄️的任一个没有值，说明为设置默认推送关联分支
  // 两个值同时在  `getRemoteBranch` 🀄️ 配置，没有值意味着并没有配置默认推送的
  if ('' === gitInfo.alias || '' === gitInfo.branch) {
    await hasRemote(); // 验证远端库是否配置
  }
}
