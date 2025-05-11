import { isEmptyArray, isTrue } from 'a-type-of-js';
import { dataStore } from '../data-store';
import { now } from '../utils';

/**
 *
 * 获取提交的信息
 *
 */
export function getMessage(withVersion: boolean = false) {
  const { kind, message, pkg, tag } = dataStore;
  const version = withVersion && isTrue(tag) ? `${pkg.version}` : '';
  const time = now();
  const result = isEmptyArray(message)
    ? ''
    : message.length === 1
      ? message[0]
      : message
          .map(e => '\n- '.concat(e.toString()))
          .join('')
          .replace(/"/, "'");

  return `${kind || 'submit'} : ${version} ${time} 

${result}\n`;
}
