/**
 *
 * 解析远程库别名
 *
 */
export function parseRemoteAlias(data: string) {
  /**  获取远程仓库信息 ✅ 转化为数组  */
  const lines = data
    .split('\n')
    .filter(line => line.trim() && !line.startsWith('#'));

  /**  获取远程仓库信息 ✅ 转化为 Set ，以便转化为不重复的远程库别名组  */
  const remotes: Set<string> = new Set();

  for (const line of lines) {
    const parts = line.split(/\s+/);
    if (parts.length < 2) {
      continue;
    }
    remotes.add(parts[0]);
  }

  return Array.from(remotes);
}
