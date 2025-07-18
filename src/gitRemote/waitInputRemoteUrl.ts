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
  _p('当前未配置 🛠️ 远程库');

  const result = await command.question({
    text: '请 🔧 配置远程分支的链接',
    resultText: '设置远程分支的链接为',
    tip: 'git@',
    private: false,
  });

  if (isUndefined(result)) {
    return await gitError('您选择了退出，即将退出');
  }

  if ([isEmptyString, isUndefined].some(e => e(result))) {
    return await gitError('远程分支的链接不能为🈳');
  }

  dataStore.gitInfo.url = result;
}
