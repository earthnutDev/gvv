import { _p } from 'a-node-tools';
import { command } from '../command';
import { dataStore } from '../data-store';
import { gitError } from '../utils';
import { isEmptyString, isUndefined } from 'a-type-of-js';

/**
 *
 * 配置远程库的地址
 *
 */
export async function waitInputRemoteUrl() {
  const { gitInfo } = dataStore;
  _p('当前未配置 🛠️ 远程库');

  const result = await command.question({
    text: '请 🔧 配置远程分支的链接',
    resultText: '设置远程分支的链接为',
    tip: 'git@',
  });

  if (isEmptyString(result) || isUndefined(result)) {
    return await gitError('远程分支的链接不能为🈳');
  }

  gitInfo.url = result;
}
