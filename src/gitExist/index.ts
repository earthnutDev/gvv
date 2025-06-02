import { gitInstalled } from './installed';
import { gitUserEmail } from './user-email';
import { gitUser } from './user-name';

/**
 *
 * git 的存在
 *
 */
export async function gitExist(): Promise<void> {
  await gitInstalled(); // git 是否安装

  await gitUser(); // git 用户名

  await gitUserEmail(); // git 邮箱
}
