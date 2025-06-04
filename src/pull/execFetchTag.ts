import { dog } from './../dog';
import { isFalse } from 'a-type-of-js';
import { dataStore } from '../data-store';
import { runOtherCode } from 'a-node-tools';
import { gitError } from '../utils';

/**
 *
 * 执行拉取 tag 标签
 *
 */
export async function execFetchTag() {
  const { alias } = dataStore.gitInfo;

  if (!alias) {
    return await gitError(`使用别名获取远端的标签`);
  }

  const code = `git fetch ${alias} --tags`;
  const result = await runOtherCode({
    code,
    waiting: {
      prefix: 1,
      info: '正在拉取线上 tag 数据',
    },
  });
  dog('执行拉起线上标签', code, result);

  if (isFalse(result.success)) {
    const message = '拉取线上 <' + alias + '> 的 tag出错';
    dog.error(message, result);

    return await gitError(message, result.error);
  }
}
