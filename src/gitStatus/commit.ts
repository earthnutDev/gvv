import { runOtherCode } from 'a-node-tools';

import { gitError } from '../utils';
import { trackedNotSubmitted } from './trackAndStagArea';
import { getMessage } from './getMessage';

/**
 *
 *  git 暂存区文件的
 *
 *
 * 如果暂存区没有文件则直接退出
 */
export async function stagingArea() {
  /**
   *  检测 git 暂存区的状态
   */
  const canCommit = await trackedNotSubmitted();

  if (canCommit.success !== true || canCommit.error !== '') {
    await gitError('暂存区异常');
  } else if (/^\n?\r?$/.test(canCommit.data || '')) {
    await gitError('暂存区没有未提交的文件'); // 暂存区没有未提交的文件直接🖕使用
  }

  await commit(); // 提交代码到远程库
}

/**
 *
 * 提交代码
 *
 */
export async function commit() {
  /**  构建提交的代码  */
  const code = `git commit -m "${getMessage(true)}"`;

  const result = await runOtherCode({ code, printLog: false });

  if (!result.success) {
    await gitError('提交代码失败');
  }
}
