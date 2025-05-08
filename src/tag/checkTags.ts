import { dataStore } from './../data-store';
import { dog } from './../dog';
import { cyanPen, hexPen, randomPen } from 'color-pen';
import { gitError } from '../utils';
import { _p, runOtherCode } from 'a-node-tools';
import { getVersion } from './getVersion';

/**
 *
 * 获取本地的标签
 *
 */
export async function checkTags() {
  const { tag, pkg, gitInfo } = dataStore;

  if (tag === true) {
    await getVersion();
  }

  const result = await runOtherCode({
    code: 'git tag --list',
    printLog: false,
  });
  dog('git tag --list', result);

  if (!result.success) {
    return gitError(`使用 ${hexPen('0x666')`git tag --list`} 命令出现错误`);
  }
  const tagList = result.data
    .split('\n')
    .map(e => e.trim())
    .filter(e => e);

  //
  gitInfo.tags = tagList;

  dog('已有的 tag 列表', tagList);

  if (tagList.includes(tag === true ? `v${pkg.version}` : tag.toString())) {
    dog.error('已存在该 tag 值');
    _p(cyanPen`已经存在的 tag 值为：`);
    tagList.forEach(e => {
      _p(`${randomPen`-`}  ${e}`);
    });

    return gitError(`tag 值 "${tag}" 已经存在于本地`);
  }
}
