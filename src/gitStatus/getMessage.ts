import { dataStore } from '../data-store';
import { now } from '../utils';

/**
 *
 * 获取提交的信息
 *
 */
export function getMessage(withVersion: boolean = false) {
  const { kind, message, pkg, tag } = dataStore;
  const version = withVersion && tag === true ? `${pkg.version}` : '';
  const time = now();
  const result =
    message.length === 0
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
