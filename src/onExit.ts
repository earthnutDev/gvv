import { cursorAfterClear, cursorShow } from 'a-node-tools';
import { waiting } from './waiting';
import { gitError } from './utils';

/**  公共处理  */
function common() {
  cursorShow(); // 恢复光标位置
  cursorAfterClear(true); // 清理冗余
  waiting.destroyed(); // 销毁等待
  process.removeListener('exit', exit);
  process.removeListener('beforeExit', beforeExit);
  process.removeListener('SIGINT', beforeExit);
  process.removeListener('SIGTERM', beforeExit);
}

/**  退出处理  */
function exit() {
  common();
}
/**  退出前处理  */
async function beforeExit() {
  await gitError();
  common();
}

/**  注册意外退出前的操作  */
export async function onExit() {
  process.on('beforeExit', beforeExit);
  process.on('exit', exit);
  process.on('SIGINT', beforeExit);
  process.on('SIGTERM', beforeExit);
}
