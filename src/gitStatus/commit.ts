import { dataStore } from '../data-store';
import { dog } from './../dog';
import { runOtherCode } from 'a-node-tools';

import { gitError } from '../utils';
import { trackedNotSubmitted } from './trackAndStagArea';
import { getMessage } from './getMessage';
import { isFalse } from 'a-type-of-js';

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

  if (isFalse(canCommit.success)) {
    return await gitError('暂存区异常');
  } else if (/^\n?\r?$/.test(canCommit.data)) {
    return await gitError('暂存区没有未提交的文件'); // 暂存区没有未提交的文件直接🖕使用
  }

  return await commit(); // 标记代码为一个提交
}

/**
 *
 * 提交代码
 *
 */
export async function commit() {
  const { gitInfo } = dataStore;
  /**  构建提交的代码  */
  const code = `git commit -m "${getMessage(true)}"`;

  const result = await runOtherCode(code);

  dog('提交代码', code, result);

  if (isFalse(result.success)) {
    dog.error('暂存区文件提交异常', result.error);
    return await gitError('提交代码失败');
  }

  gitInfo.committed = true;
}
