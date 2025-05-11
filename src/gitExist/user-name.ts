import { dog } from './../dog';
import { runOtherCode } from 'a-node-tools';
import { command } from '../command';
import { gitError } from '../utils';
import { isEmptyString } from 'a-type-of-js';

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
    dog.error('未获取到 git 用户名配置', localUserName, globalUserName);
    return await gitError(localUserName.error || globalUserName.error);
  }

  if ('' === localUserName.data && '' === globalUserName.data) {
    return await setUserName();
  }
  dog('获取到本地个人信息', localUserName, globalUserName);
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

  if (isEmptyString(result)) {
    await gitError('用户名 🍀 不能为🈳');
  } else {
    await runOtherCode({
      code: `git config --global user.name "${result}"`,
      printLog: false,
    });
  }
}
