import { command } from './command';
import { dataStore } from './data-store';
import { dog } from './dog';
import { gitBranch } from './gitBranch';
import { gitExist } from './gitExist';
import { gitStatus } from './gitStatus';
import { gitInit } from './gitStatus/init';
import { parseArgs } from './parseArgs';
import { push } from './push';
import { tag } from './tag';
import { checkTags } from './tag/checkTags';

/**
 *
 * 主程序入口
 *
 * @author earthnut.dev
 *
 */
export async function main(): Promise<void> {
  const { commandParameters } = dataStore;
  // 在一开始的时候，使用的 `a-node-tools` 为 0.1.1 版本
  // 在该版本的 `runOtherCode` 未移除 process.on('exit') 监听，导致需要该配置，现在可移除
  process.setMaxListeners(20); // 设置最大监听事件
  parseArgs(); // 解析命令行参数
  // 查看是否是 `init` 命令进入，是的话仅进行 git 初始化

  if (dataStore.init) {
    await gitExist();
    await gitInit();
    command.end(); // 结束命令行
  }
  dog(dataStore);
  await gitExist(); // 判断当前项目是否是 git 项目
  await gitBranch(); // 获取当前的分支情况

  if (commandParameters.tag !== false) {
    await checkTags();
  }
  // await gitStatus(); // 获取 git 状态

  // 用户主动使用 `-t` 或 `tag` 标签时或未传入该值而 `kind` 为 `version` 值时，为本次提交进行打标签
  if (commandParameters.tag !== false) {
    await tag(); // 打标签
  }
  await push();
}
