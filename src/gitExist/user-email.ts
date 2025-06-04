import { dog } from './../dog';
import { runOtherCode } from 'a-node-tools';
import { command } from '../command';
import { gitError } from '../utils';
import { isEmptyString, isFalse, isUndefined } from 'a-type-of-js';

/**
 * git 的账户
 */
export async function gitUserEmail() {
  let code = 'git config user.email';
  /**  本地仓库的用户名  */
  const localUserEmail = await runOtherCode(code);
  dog('本地仓库的名', code, localUserEmail);
  code = 'git config --global user.email';
  /**  全局的用户名  */
  const globalUserEmail = await runOtherCode(code);

  dog('全局仓库的邮箱', code, globalUserEmail);
  if (isFalse(localUserEmail.success) || isFalse(globalUserEmail.success)) {
    dog.error(
      '获取用户本地的 git 的邮箱配置失败',
      localUserEmail,
      globalUserEmail,
    );
    return await gitError(localUserEmail.error || globalUserEmail.error);
  }

  if (
    isEmptyString(localUserEmail.data) &&
    isEmptyString(globalUserEmail.data)
  ) {
    return await setUserEmail();
  }

  dog('当前使用邮箱 📮 数据', localUserEmail, globalUserEmail);
}

/**
 *
 *  设置 git 的用户名
 *
 */
export async function setUserEmail() {
  const email = await command.question({
    text: '请 🔧 配置您的 git 的用户 📮 邮箱',
    required: true,
  });

  if (isUndefined(email)) {
    return await gitError('您选择了退出，请稍等，正在清理');
  }

  if (isEmptyString(email)) {
    await gitError('邮箱 📮 不能为🈳');
  } else {
    const code = `git config --global user.email "${email}"`;
    const result = await runOtherCode(code);
    dog('设置用户的名', email, code, result);
  }
}
