import { dog } from './../dog';
import { runOtherCode } from 'a-node-tools';
import { command } from '../command';
import { gitError } from '../utils';
import { isEmptyString } from 'a-type-of-js';

/**
 * git 的账户
 */
export async function gitUser() {
  let code = 'git config user.name';
  /**  本地仓库的用户名  */
  const localUserName = await runOtherCode({
    code,
    printLog: false,
  });
  dog('本地仓库的用户名', code, localUserName);

  code = 'git config --global user.name';
  /**  全局的用户名  */
  const globalUserName = await runOtherCode({
    code,
    printLog: false,
  });
  dog('全局配置的用户名', code, globalUserName);
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
    const code = `git config --global user.name "${result}"`;
    const _result = await runOtherCode({
      code,
      printLog: false,
    });
    dog('配置全局的用户名', result, code, _result);
  }
}
