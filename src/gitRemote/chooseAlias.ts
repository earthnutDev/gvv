import { command } from '../command';
import { gitError } from '../utils';
import { setAlias } from './setAlias';

/**
 *
 * 选择一个远程库别名
 *
 */
export async function chooseAlias(tip: string[]) {
  const result = await command.question({
    text: '请选择一个远程库别名',
    resultText: '设置远程分支的别名为',
    tip,
  });
  if (result === '') {
    return await gitError('远程分支的别名不能为🈳');
  } else {
    setAlias(result);
  }
}
