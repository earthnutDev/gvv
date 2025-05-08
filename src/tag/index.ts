import { dog } from './../dog';
import { runOtherCode } from 'a-node-tools';
import { dataStore } from '../data-store';
import { gitError } from '../utils';
import { getMessage } from '../gitStatus/getMessage';

/**
 *
 * 打标签
 *
 */
export async function tag() {
  const { tag, pkg } = dataStore;
  // 在 main 调用时已经做了判断，这里。。。
  if (tag === false) {
    return await gitError('未指定 tag 参数');
  }
  dog('开始执行 tag: ', tag, ':');

  let code: string;
  const message = getMessage();
  if (tag === true) {
    const { version } = pkg;
    code = `git tag -a v${version} -m "${message}" `;
  } else {
    code = `git tag -a ${tag} -m "${message}" `;
  }

  const result = await runOtherCode({
    code,
    printLog: false,
  });

  if (!result.success) {
    return await gitError(result.error);
  }
}
