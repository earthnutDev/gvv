import { _p } from 'a-node-tools';
import { brightYellowPen } from 'color-pen';
import { command } from '../command';
import { dataStore } from '../data-store';
import { gitError } from '../utils';
import { isEmptyString, isUndefined } from 'a-type-of-js';

/**
 *
 * 设置远程分支的别名
 *
 */
export async function waitInputRemoteAlias() {
  const { gitInfo, commandParameters } = dataStore;

  // 这里以 commandParameters.alias 与 gitInfo.alias 为判断依据
  // 但实际在代码执行流程到这里 gitInfo.alias 一定为 ''
  if (!isEmptyString(commandParameters.alias) && isEmptyString(gitInfo.alias)) {
    gitInfo.alias = commandParameters.alias;
    _p(
      `已自动配置远程分支的别名为 🛠️ ${brightYellowPen(commandParameters.alias)}`,
    );

    return;
  }

  _p('当前未配置 🛠️ 远程库');

  const result = await command.question({
    text: '请 🔧 配置远程分支的别名',
    resultText: '设置远程分支的别名为',
    tip: 'origin',
    required: false,
    private: false,
  });

  if (isUndefined(result)) {
    return await gitError('您选择了退出，正在退出');
  }

  if (isEmptyString(result) || isUndefined(result)) {
    return await gitError('远程分支的别名不能为🈳');
  }

  gitInfo.alias = result;
}
