import { isFalse } from 'a-type-of-js';
/****************************************************************************
 *  @Author earthnut
 *  @Email earthnut.dev@outlook.com
 *  @ProjectName gvv
 *  @FileName getLocalBranch.ts
 *  @CreateDate  周五  05/09/2025
 *  @Description 获取当前的 git 分支
 *
 *
 * 原使用 `git branch` 获取当前所有的分支，并通过换行符分割提取。
 *
 * ```ts
 * //  分支列表
 *  const branchList = result.data.split('\n').map(e => e.trim());
 * //  当前分支
 * const branch = branchList.find(e => e.startsWith('*'));
 * ```
 * 现使用 `git branch --show-current` （在分离头指针状态返回为空） 或 `git rev-parse --abbrev-ref HEAD` （在分离头指针状态返回值为 "HEAD" ）
 *
 ****************************************************************************/

import { dog } from './../dog';
import { runOtherCode } from 'a-node-tools';
import { dataStore } from '../data-store';
import { gitError } from '../utils';

/**
 *
 * 解析分支信息💻
 *
 */
export async function getLocalBranch() {
  const code = 'git branch --show-current';
  /**  获取本地的分支信息  */
  const result = await runOtherCode({
    // 或者 git rev-parse --abbrev-ref HEAD
    code,
    printLog: false,
  });

  dog('获取分支信息', code, result);

  if (isFalse(result.success)) {
    dog.error('获取当前 git 分支出错', result);
    return await gitError(result.error);
  }

  dataStore.gitInfo.localBranch =
    result.data?.trim().replace(/\n/g, '') || 'main';
}
