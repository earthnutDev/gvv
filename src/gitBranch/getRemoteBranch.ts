import { runOtherCode } from 'a-node-tools';
import { isString } from 'a-type-of-js';
import { dataStore } from '../data-store';
import { gitError } from '../utils';

/**
 * 获取远程分支
 *
 * 当前在使用时
 */
export async function getRemoteBranch() {
  const { gitInfo } = dataStore;
  /**
   * 获取远程当前分支名的分支信息
   */
  const result = await runOtherCode({
    code: 'git rev-parse --abbrev-ref --symbolic-full-name @{u}',
    printLog: false,
  });

  /**  获取远程分支信息 ❌  */
  if (!result.success) {
    /**  未设置远程分支  */
    if (
      isString(result.error) &&
      result.error.includes('fatal: no upstream configured for branch')
    ) {
      // 未设置远程关联的分支时直接返回🈳字符串
      return;
    } else {
      return await gitError(result.error);
    }
  }

  /**  获取远程分支信息 ✅  */
  const remoteBranch = result.data!.trim();
  /**  分割远程分支信息  */
  const tip = remoteBranch.indexOf('/');

  /**  配置远程库的别名，该值为🈳（用户未主动配置该值）时，则设置该值  */
  if (gitInfo.alias === '') {
    gitInfo.alias = remoteBranch.slice(0, tip);
  }
  /**  配置远程分支名，该值为🈳（用户未主动配置该值）时，则设置该值  */
  if (gitInfo.branch === '') {
    gitInfo.branch = remoteBranch.slice(tip + 1);
  }

  // return [remoteBranch.slice(0, tip), remoteBranch.slice(tip + 1)];

  // const remoteBranch = result.data.trim().split('/');

  // return [remoteBranch[0], remoteBranch.slice(1).join('/')];
}
