import { dog } from './../dog';
import { runOtherCode } from 'a-node-tools';
import { isFalse } from 'a-type-of-js';
import { gitError } from '../utils';
import { gitInfo } from '../data-store/gitInfo';

/**
 * 暂存当前更改
 */
export async function execStash() {
  const code = `git stash save -u 'work in progress'`;

  const result = await runOtherCode({
    code,
    printLog: false,
  });

  dog('将当前文件放置到储存区', code, result);

  if (isFalse(result.success)) {
    return await gitError(result.error);
  }

  if (result.data.startsWith('No local changes to save')) {
    gitInfo.stashed = false; // 本地没有更改需要需要暂存的文件
  } else {
    gitInfo.stashed = true; // 暂存已修改的文件已方便拉取线上分支
  }
}
