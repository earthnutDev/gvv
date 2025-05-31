import { gitInfo } from './data-store/gitInfo';
import { cyanPen, magentaPen, strInOneLineOnTerminal } from 'color-pen';
import { command } from './command';
import { cursorAfterClear, runOtherCode } from 'a-node-tools';
import { isBusinessEmptyString, isEmptyArray } from 'a-type-of-js';
import { deleteTag } from './tag/deleteTag';
import { execStashPop } from './pull/execStashPop';
import { sleep } from 'a-js-tools';
import { waiting } from './waiting';
import { dog } from './dog';

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
export async function gitError(...error: string[]): Promise<never> {
  /**  配置输出文本样式  */
  waiting.run({
    prefix: 2,
    info: '正在退出，请稍等',
  });
  const errorMessage = error.join('\n');

  // 之前由于 `\n` 的干扰导致多行打印，现在已在上游依赖包解决该问题
  const message = cyanPen`gvv  ${magentaPen(errorMessage)}`;

  if (gitInfo.stashed) {
    await execStashPop();
    gitInfo.stashed = false;
  }
  if (gitInfo.tagged) {
    gitInfo.tagged = false;
    await deleteTag();
  }

  if (gitInfo.committed) {
    gitInfo.committed = false;
    await gitReset();
  }

  if (!isBusinessEmptyString(errorMessage)) {
    waiting.log(strInOneLineOnTerminal(message));
  }

  await sleep(1386);

  cursorAfterClear(true);
  waiting.destroyed();
  return command.error();
}

/**
 *
 * 当 commit 后出现（打 tag 或是 push 错误）错误后取消提交
 *
 */
export async function gitReset() {
  gitInfo.committed = false;
  const code = 'git reset --soft HEAD^';
  const result = await runOtherCode({
    code,
    printLog: false,
  });
  dog('重置已提交的代码', code, result);
  await gitRestore(gitInfo.untrackedFiles);
  await gitRestore(gitInfo.trackedChangedFiles);
}

/**
 *
 * 将文件移除暂存区
 *
 */
export async function gitRestore(fileList: string[]) {
  if (!isEmptyArray(fileList)) {
    const code = `git restore --staged ${fileList.join('  ')}`;
    const result = await runOtherCode({
      code,
    });

    dog('将文件移除暂存区', code, result);
  }
}
