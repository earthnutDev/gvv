import { dog } from './../dog';
import { gitError } from '../utils';
import { _p, runOtherCode } from 'a-node-tools';
import { notTrack, trackedButNotStaged } from './trackAndStagArea';
import { command } from '../command';
import { hexPen, randomPen } from 'color-pen';

/**
 *
 * 判断当前工作区是否有未添加到暂存区的已修改（仅关注已追踪）文件
 *
 */
export async function add() {
  /**  查看 git 是否有未添加到暂存区的已修改文件  */
  const canAdd = await trackedButNotStaged();

  // 有文件修改或存在未追踪的文件，则添加到暂存区
  if (canAdd.data !== '') {
    await runOtherCode('git add .');
  } else {
    _p('工作区没有修改的已追踪的文件待添加到暂存区');
  }
}

/**
 *
 * 检测 git 是否存在未追踪的文件
 *
 */
export async function canTrack() {
  /**  查看 git 是否存在未追踪的文件  */
  const result = await notTrack();

  dog(result);
  if (result.success && result.data !== '') {
    _p(hexPen('#f39')('当前工作区存在未追踪的文件 : \n'));
    const notTrackFileStr = result
      .data!.replace(/\n$/, '')
      .split('\n')
      .map(e => randomPen('- ').concat(e));
    // 打印
    _p(notTrackFileStr.join('\n'));
    _p(' '); // 换行
    await addTrack(notTrackFileStr.length);
  }

  if (!result.success) {
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
  const result = await command.question(
    {
      text: `存在 ${notTrackLength} 个${hexPen('#990')('未追踪')}的文件，是否继续？`,
      tip,
      private: true,
    },
    true,
  );

  /// 继续
  if (result === tip[0]) {
    await runOtherCode({ code: 'git add .', printLog: false });
  } else {
    // 退出
    return command.end();
  }
}
