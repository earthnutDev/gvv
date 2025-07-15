import { cwd } from './data-store/cwd';
import { gitInfo } from './data-store/gitInfo';
import { command } from './command';
import { colorLine, cursorAfterClear, runOtherCode } from 'a-node-tools';
import { isEmptyArray, isFalse } from 'a-type-of-js';
import { deleteTag } from './tag/deleteTag';
import { execStashPop } from './pull/execStashPop';
import { sleep } from 'a-js-tools';
import { waiting } from './waiting';
import { dog } from './dog';

/** 当前的时间 */
export function now(): string {
  return new Date().toLocaleString();
}

/** 异常导致退出 */
export async function gitError(...error: string[]): Promise<never> {
  const info = error.join('\n');
  /**  配置输出文本样式  */
  waiting.run({
    prefix: 2,
    info,
  });
  waiting.log(info);

  /**  都为空则显示 1s 的延迟  */
  if (
    [gitInfo.stashed, gitInfo.tagged, gitInfo.committed].every(e => isFalse(e))
  ) {
    await sleep(1259);
  }

  if (gitInfo.stashed) {
    waiting.run({ info: '正在恢复本地的更改' });
    await execStashPop();
    gitInfo.stashed = false;
    await sleep(2400);
  }
  if (gitInfo.tagged) {
    waiting.run({ info: '正在删除已添加的 tag 标签' });
    gitInfo.tagged = false;
    await deleteTag();
    await sleep(2400);
  }

  if (gitInfo.committed) {
    waiting.run({ info: '正在移除已添加的提交' });
    gitInfo.committed = false;
    await gitReset();
    await sleep(2400);
  }

  cursorAfterClear(true);
  waiting.destroyed();
  colorLine('终结分割线', true);
  return command.error();
}

/**  当 commit 后出现（打 tag 或是 push 错误）错误后取消提交 */
export async function gitReset() {
  gitInfo.committed = false;
  const code = 'git reset --soft HEAD^';
  const result = await runOtherCode({ code, cwd });
  dog('重置已提交的代码', code, result);
  await gitRestore(gitInfo.untrackedFiles);
  await gitRestore(gitInfo.trackedChangedFiles);
}

/** 将文件移除暂存区 */
export async function gitRestore(fileList: string[]) {
  if (!isEmptyArray(fileList)) {
    const code = `git restore --staged ${fileList.join('  ')}`;
    const result = await runOtherCode({ code, cwd });

    dog('将文件移除暂存区', code, result);
  }
}
