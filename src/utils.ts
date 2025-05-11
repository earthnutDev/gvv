import { dataStore } from './data-store';
import { magentaPen } from 'color-pen';
import { command } from './command';
import { runOtherCode, typewrite } from 'a-node-tools';
import { isEmptyArray } from 'a-type-of-js';

/**
 *
 * 当前的时间
 *
 */
export function now(): string {
  return new Date().toLocaleString();
}

/**
 *
 * 异常导致退出
 *
 */
export async function gitError(...error: unknown[]): Promise<never> {
  /**  配置输出文本样式  */

  const errorMessage = error.join('\n');

  // 之前由于 `\n` 的干扰导致多行打印，现在已在上游依赖包解决该问题
  const message = 'gvv  '.concat(magentaPen(errorMessage));

  await typewrite(message, 10);

  return command.error();
}

/**
 *
 * 当 commit 后出现（打 tag 或是 push 错误）错误后取消提交
 *
 */
export async function gitReset() {
  const { gitInfo } = dataStore;
  await runOtherCode({
    code: 'git reset --soft HEAD^',
    printLog: false,
  });
  await gitRestore(gitInfo.untrackedFiles);
  await gitRestore(gitInfo.trackedChangedFiles);
}

/**
 *
 * 将文件移除暂存区
 *
 */
export async function gitRestore(fileList: string[]) {
  if (!isEmptyArray(fileList))
    await runOtherCode({
      code: `git restore --staged ${fileList.join('  ')}`,
    });
}
