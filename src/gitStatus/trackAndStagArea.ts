/****************************************************************************
 *  @Author earthnut
 *  @Email earthnut.dev@outlook.com
 *  @ProjectName git-commit-hooks
 *  @FileName track.ts
 *  @CreateDate  周二  04/01/2025
 *  @Description git 文件列表
 *
 * - notTrack() 检测 git 已追踪的文件列表，仅关注是否
 * - trackFile() 已追踪的文件列表，不关注修改状态
 * - ignoreFileList() 忽略及未追踪的文件列表
 * - trackedButNotStaged() 已追踪且修改未添加到暂存区的文件列表
 * - trackedNotSubmitted() 已追踪且修改添加到暂存区未提交的列表
 ****************************************************************************/
import { runOtherCode } from 'a-node-tools';

/**
 *
 * 未追踪的文件
 *
 */
export async function notTrack() {
  return await runOtherCode({
    code: 'git ls-files --others --exclude-standard',
    printLog: false,
  });
}
/**
 *
 * 已追踪的文件列表（不关心修改状态）
 *
 */
export async function trackFile() {
  return await runOtherCode({
    code: 'git ls-files',
    printLog: false,
  });
}

/**
 *
 * 添加到 `.gitignore` 文件
 *
 *
 * 该文件中记录了不需要被追踪及尚未追踪的文件
 *
 * 譬如 node_modules/ 下的没一个文件、dist 下的打包文件、coverage 下的测试率文件
 */
export async function ignoreFileList() {
  return await runOtherCode({
    code: 'git ls-files --others',
    printLog: false,
  });
}

/**
 *
 * 判断当前工作区是否有未添加到暂存区的已修改（仅关注已追踪）文件
 *
 */
export async function trackedButNotStaged() {
  return await runOtherCode({ code: 'git diff --name-only', printLog: false });
}

/**
 *
 * 判断当前工作区是否有已添加到暂存区未提交的（仅关注已追踪）文件
 *
 */
export async function trackedNotSubmitted() {
  return await runOtherCode({
    code: 'git diff --cached --name-only',
    printLog: false,
  });
}
