import { dun } from './../dog';
import { isEmptyArray } from 'a-type-of-js';
import { dataStore } from '../data-store';
import { now } from '../utils';
import { dog } from 'src/dog';

/**
 *
 * 获取提交的信息
 *
 */
export function getMessage(withTag: boolean = false) {
  const { kind, message, tag } = dataStore;
  /**  当前的时间  */
  const time = now();
  if (!dun) {
    dog('本次解析使用参数》〉', withTag);

    dog('获取版本号为 》〉', tag);
  }
  const result = isEmptyArray(message)
    ? ''
    : message.length === 1
      ? message[0]
      : message
          .map(e => '\n - '.concat(e.toString()))
          .join('')
          .replace(/"/, "'");

  return `${kind || 'submit'} : ${withTag ? tag || '' : ''} ${time} \n ${result}`;
}
