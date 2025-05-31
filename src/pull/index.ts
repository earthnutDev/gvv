/****************************************************************************
 *  @Author earthnut
 *  @Email earthnut.dev@outlook.com
 *  @ProjectName gvv
 *  @FileName index.ts
 *  @CreateDate  周六  05/31/2025
 *  @Description 拉取线上 git 数据
 *
 *
 * 流程：
 *
 * - 先将文件放置于
 ****************************************************************************/
import { dog } from './../dog';
import { gitInfo } from './../data-store/gitInfo';
import { execFetchBranch } from './execFetchBranch';
import { execFetchTag } from './execFetchTag';
import { execMerge } from './execMerge';
import { execStash } from './execStash';
import { execStashPop } from './execStashPop';

/**
 *
 * 拉取线上文件
 *
 */
export async function fetch() {
  await execStash(); // 先暂存代码
  await execFetchTag(); // 拉取线上的 tag 标签
  await execFetchBranch(); // 拉取线上的分支详情
  await execMerge(); // 执行代码合并
  if (gitInfo.stashed) {
    dog('当前储存区有文件，正在执行取出');
    await execStashPop(); // 弹出临时储存的
  } else {
    dog.warn('当前储存区没有文件存留，正常应当退出程序');
  }
}
