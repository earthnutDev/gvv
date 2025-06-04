import { dog } from './../dog';
import { _p, runOtherCode } from 'a-node-tools';
import { isString, isFalse, isUndefined } from 'a-type-of-js';
import { greenPen } from 'color-pen';
import { command } from '../command';
import { gitError } from '../utils';

/**
 *
 * 查看当前工作区是否为 git 初始化状态，目前仅在 git 初始化状态下进行查询
 *
 */
export async function gitInitialized() {
  const code = 'git status';
  const status = await runOtherCode(code);

  dog('gitStatus: ', code, status);

  if (status.success) {
    return;
  }
  // git 未初始化
  if (
    isString(status.error) &&
    [status.error, status.data].some(e =>
      e.includes('fatal: not a git repository'),
    )
  ) {
    dog('git 未初始化');
    await initializeGit();
  } else {
    dog.error('查看 git 状态出错', status);
    await gitError('未知错误', status.error);
  }
}

/**
 *
 * 初始化 git 仓库，仅在上面的 gitInitialized 函数中返回错误时调用
 *
 */
export async function initializeGit() {
  const pwd = process.cwd();
  _p('git 未初始化 ！！！');
  _p(`当前工作目录为：${greenPen(pwd)}`);
  const tip = ['配置', '退出 ⏏️'];
  const result = await command.question({
    text: '是否 🔧 初始化 git 仓库',
    resultText: '配置 git 仓库',
    tip,
  });

  if (isUndefined(result)) {
    return await gitError('好的，正在退出');
  }

  // 用户选择退出
  if (result === tip[1]) {
    return command.end();
  }
  await gitInit(); // 初始化 git
}

/**
 *
 * 执行 git init
 *
 * - 在项目使用 `init` 调用时执行
 * - 在项目正常执行过程 🀄️ 初始化时执行
 *
 */
export async function gitInit() {
  const code = 'git init';
  const result = await runOtherCode(code);

  dog('执行 git init', code, result);
  if (isFalse(result.success)) {
    dog.error('初始化 git 失败', result);
    return await gitError('初始化失败', result.error);
  }
}
