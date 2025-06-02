import { isUndefined } from 'a-type-of-js';
import { dog } from './../dog';
/**
 *
 * 解析远程库别名
 *
 */
export function parseRemoteAlias(remote: string) {
  /**  获取远程仓库信息 ✅ 转化为数组  */
  const lines = remote
    .split('\n')
    .filter(line => line.trim() && !line.startsWith('#'));

  dog(lines);

  /**  获取远程仓库信息   */
  const remotes: { [x: string]: string } = {};

  for (const line of lines) {
    const parts = line.split(/\s+/);
    if (parts.length < 2) {
      continue;
    }
    if (isUndefined(remotes[parts[0]])) {
      remotes[parts[0]] = parts[1];
    }
  }

  return remotes;
}
