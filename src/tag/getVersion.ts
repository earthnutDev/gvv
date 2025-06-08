import { dog } from './../dog';
import {
  getDirectoryBy,
  PackageJson,
  pathJoin,
  readFileToJsonSync,
} from 'a-node-tools';
import { isFalse, isUndefined } from 'a-type-of-js';
import { dataStore } from '../data-store';
import { gitError } from '../utils';

/**
 *
 * 获取当前执行的版本的信息
 *
 */
export async function getVersion(test?: boolean) {
  const { pkg, gitInfo, commandParameters } = dataStore;

  const packageJsonDir = getDirectoryBy('package.json', 'file');

  if (isUndefined(packageJsonDir)) {
    dog.error('查找 package.json 文件出错');
    return await gitError('未找到 package.json 文件');
  }

  const path = (pkg.path = pathJoin(packageJsonDir, 'package.json'));

  const packageJson = readFileToJsonSync<PackageJson>(path);

  const version = packageJson?.version || '';
  dog(`获取到的版本号为 <${version}>`);

  pkg.version = version;
  if (isFalse(test)) {
    dataStore.tag = commandParameters.tag = gitInfo.tag = `v${version}`;
  }
}
