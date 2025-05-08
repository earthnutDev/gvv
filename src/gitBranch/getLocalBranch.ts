import { runOtherCode } from 'a-node-tools';
import { dataStore } from '../data-store';
import { gitError } from '../utils';

/**
 *
 * 解析分支信息💻
 *
 */
export async function getLocalBranch() {
  /**  获取本地的分支信息  */
  const result = await runOtherCode({
    // 或者 git rev-parse --abbrev-ref HEAD
    code: 'git branch --show-current',
    printLog: false,
  });

  if (!result.success) {
    await gitError(result.error);
  }
  /**  分支列表  */
  // const branchList = result.data.split('\n').map(e => e.trim());
  /**  当前分支  */
  // const branch = branchList.find(e => e.startsWith('*'));

  dataStore.gitInfo.localBranch = result.data?.trim() || 'main';
}
