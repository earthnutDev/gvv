import { magentaPen } from 'color-pen';
import { command } from './command';
import { typewrite } from 'a-node-tools';

/**
 *
 * 当前的时间
 *
 */
export function now(): string {
  return new Date().toLocaleString();
}

/**
 *
 * 异常导致退出
 *
 */
export async function gitError(...error: unknown[]): Promise<never> {
  /**  配置输出文本样式  */

  const errorMessage = error.join('\n');

  // 之前由于 `\n` 的干扰导致多行打印，现在已在上游依赖包解决该问题
  const message = 'git  '.concat(magentaPen(errorMessage));

  await typewrite(message, 10);

  return command.error();
}
