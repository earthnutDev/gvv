import { dataStore } from '../data-store';
import { dog, dun } from './../dog';
import { gitError } from '../utils';
import { _p, runOtherCode } from 'a-node-tools';
import { unTrackedFiles, trackedButNotStaged } from './trackAndStagArea';
import { command } from '../command';
import { hexPen, randomPen } from 'color-pen';
import { isEmptyString, isFalse } from 'a-type-of-js';

/**
 *
 * 判断当前工作区是否有未添加到暂存区的已修改（仅关注已追踪）文件
 *
 */
export async function add() {
  const { gitInfo } = dataStore;
  /**  查看 git 是否有未添加到暂存区的已修改文件  */
  const canAdd = await trackedButNotStaged();

  // 有文件修改或存在未追踪的文件，则添加到暂存区
  if (isEmptyString(canAdd.data)) {
    _p('工作区没有修改的已追踪的文件待添加到暂存区');
  } else {
    gitInfo.trackedChangedFiles = canAdd.data.split('\n');
    // 涉及到不必要的运算，所有这里使用 dun 拦截
    if (!dun) {
      dog(
        '将工作区已追踪的修改文件添加到暂存区',
        gitInfo.trackedChangedFiles.map(e => `- ${randomPen(e)}`).join('\n'),
      );
    }
    const code = 'git add --update';
    // 将本地未添加追踪的文件添加追踪（将直接放置到暂存区中）
    const result = await runOtherCode({ code, printLog: false });
    dog('判断当前是否存在尚未添加到暂存区的已追踪的修改文件', code, result);
  }
}

/**
 *
 * 检测 git 是否存在未追踪的文件
 *
 */
export async function manageUntrackedFile() {
  const { gitInfo } = dataStore;
  /**  查看 git 是否存在未追踪的文件  */
  const result = await unTrackedFiles();

  dog(result, result.data);
  if (result.success && isFalse(isEmptyString(result.data))) {
    _p(hexPen('#f39')('当前工作区存在未追踪的文件 : \n'));
    const untrackedFileList = (gitInfo.untrackedFiles = result.data
      .replace(/\n$/, '')
      .split('\n'));

    const notTrackFileStr = untrackedFileList.map(e =>
      randomPen('- ').concat(e),
    );
    // 打印
    _p(notTrackFileStr.join('\n'));
    _p(' '); // 换行
    await addTrack(notTrackFileStr.length);
  }

  if (isFalse(result.success)) {
    dog.error('查看当前工作区是否存在文件时出错', result);
    return await gitError('查看当前工作区是否有文件出错');
  }
}

/**
 *
 * 是否将未追踪的文件添加到追踪区
 *
 */
async function addTrack(notTrackLength: number) {
  const tip = ['继续', '退出'];
  const result = await command.question({
    text: `存在 ${notTrackLength} 个${hexPen('#990')('未追踪')}的文件，是否继续？`,
    tip,
    private: true,
  });

  /// 继续
  if (result === tip[0]) {
    const code = 'git add .';
    const _result = await runOtherCode({ code, printLog: false });
    dog('是否将未追踪的文件添加到追踪区', result, code, _result);
  } else {
    // 退出
    return await gitError('好的，正在退出');
  }
}
