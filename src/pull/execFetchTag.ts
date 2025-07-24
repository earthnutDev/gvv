import { cwd } from './../data-store/cwd';
import { dog } from './../dog';
import { isFalse } from 'a-type-of-js';
import { dataStore } from '../data-store';
import { runOtherCode } from 'a-node-tools';
import { gitError } from '../utils';
import { brightRedPen, redPen } from 'color-pen';
import { waiting } from 'src/waiting';

/**
 *
 * 执行拉取 tag 标签
 *
 */
export async function execFetchTag() {
  const { alias } = dataStore.gitInfo;

  if (!alias) {
    return await gitError(`别名获取远端的标签不存在`);
  }

  const code = `git fetch ${alias} --tags`;
  waiting.run({
    prefix: 1,
    info: '正在拉取线上 tag 数据',
  });
  const result = await runOtherCode({
    code,
    waiting,
    cwd,
  });
  dog('执行拉起线上标签', code, result);

  if (result.isSIGINT) {
    dataStore.voluntaryWIthdrawal = true;
    return await gitError('稍等，这就退出');
  }

  if (isFalse(result.success)) {
    if (/fatal:\s*repository\s*'.*'\s*not\s*found/i.test(result.error)) {
      const url = result.error.replace(/^.*['"](.*)['"].*\n$/im, '$1');

      const message = `远端别名 ${redPen(alias)} 对应的地址 ${brightRedPen(url)} 不存在`;
      return await gitError(message);
    }
    const message = '拉取线上 <' + alias + '> 的 tag出错';
    return await gitError(message, brightRedPen(result.error));
  }
}
