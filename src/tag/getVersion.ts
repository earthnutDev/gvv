import {
  getDirectoryBy,
  PackageJson,
  pathJoin,
  readFileToJsonSync,
} from 'a-node-tools';
import { isUndefined } from 'a-type-of-js';
import { dataStore } from '../data-store';
import { gitError } from '../utils';

/**
 *
 * 获取当前执行的版本的信息
 *
 */
export async function getVersion() {
  const { pkg, gitInfo, commandParameters } = dataStore;

  const packageJsonDir = getDirectoryBy('package.json', 'file');

  if (isUndefined(packageJsonDir)) {
    return await gitError('未找到 package.json 文件');
  }

  const path = (pkg.path = pathJoin(packageJsonDir, 'package.json'));

  const packageJson = readFileToJsonSync<PackageJson>(path);

  const v = packageJson?.version || '';

  pkg.version = v;

  dataStore.tag = commandParameters.tag = gitInfo.tag = `v${v}`;
}
