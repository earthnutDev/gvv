import { runOtherCode } from 'a-node-tools';
import { command } from '../command';
import { gitError } from '../utils';

/**
 * git 的账户
 */
export async function gitUserEmail() {
  /**  本地仓库的用户名  */
  const localUserEmail = await runOtherCode({
    code: 'git config user.email',
    printLog: false,
  });
  /**  全局的用户名  */
  const globalUserEmail = await runOtherCode({
    code: 'git config --global user.email',
    printLog: false,
  });

  if (!localUserEmail.success || !globalUserEmail.success) {
    await gitError(localUserEmail.error || globalUserEmail.error);
  }

  if ('' === localUserEmail.data && '' === globalUserEmail.data) {
    await setUserEmail();
  }
}

/**
 *
 *  设置 git 的用户名
 *
 */
export async function setUserEmail() {
  const result = await command.question({
    text: '请 🔧 配置您的 git 的用户 📮 邮箱',
  });

  if (result) {
    await runOtherCode({
      code: `git config --global user.email "${result}"`,
      printLog: false,
    });
  } else {
    await gitError('邮箱 📮 不能为🈳');
  }
}
