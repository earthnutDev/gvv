import { runOtherCode } from 'a-node-tools';
import { command } from '../command';
import { gitError } from '../utils';

/**
 * git 的账户
 */
export async function gitUser() {
  /**  本地仓库的用户名  */
  const localUserName = await runOtherCode({
    code: 'git config user.name',
    printLog: false,
  });
  /**  全局的用户名  */
  const globalUserName = await runOtherCode({
    code: 'git config --global user.name',
    printLog: false,
  });

  if (!localUserName.success || !globalUserName.success) {
    await gitError(localUserName.error || globalUserName.error);
  }

  if ('' === localUserName.data && '' === globalUserName.data) {
    await setUserName();
  }
}

/**
 *
 *  设置 git 的用户名
 *
 */
export async function setUserName() {
  const result = await command.question({
    text: '请 🔧 配置您的 git 的用户名',
    tip: 'user.name',
    resultText: '您配置的 git 用户名是',
    private: true,
  });

  if (result) {
    await runOtherCode({
      code: `git config --global user.name "${result}"`,
      printLog: false,
    });
  } else {
    await gitError('用户名 🍀 不能为🈳');
  }
}
