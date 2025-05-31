import { dog } from './../dog';
import { command } from '../command';
import { gitError } from '../utils';
import { setAlias } from './setAlias';
import { isEmptyString, isUndefined } from 'a-type-of-js';

/**
 *
 * 选择一个远程库别名
 *
 */
export async function chooseAlias(tip: string[]) {
  const result = await command.question({
    text: '请选择一个远程库别名',
    resultText: '本次推送选择的远程分支为',
    tip,
    private: true,
    required: true,
  });

  if (isUndefined(result)) {
    return await gitError('您选择了退出，这就退出');
  }
  dog('选择远程库别名', result);
  if (isEmptyString(result)) {
    dog.error('获取用户选择当前用户的远程分支名出错，但是这个错误不应当发生');
    return await gitError('远程分支的别名不能为 🈳');
  } else {
    setAlias(result);
  }
}
