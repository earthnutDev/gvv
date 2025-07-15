import { dog } from './../dog';
import {
  getDirectoryBy,
  PackageJson,
  pathJoin,
  readFileToJsonSync,
} from 'a-node-tools';
import { isUndefined } from 'a-type-of-js';
import { dataStore } from '../data-store';
import { gitError } from '../utils';
import { cwd } from 'src/data-store/cwd';

/**
 *
 * 获取当前执行的版本的信息
 *
 */
export async function getVersion() {
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

  dog(`当前 package 的目录和 根目录 `, packageJsonDir, cwd);

  pkg.version = version;
  dataStore.tag =
    commandParameters.tag =
    gitInfo.tag =
      packageJsonDir === cwd
        ? `v${version}`
        : (packageJson?.name ?? 'core').replace(/[-/@]/gm, '_').concat(version);
}
