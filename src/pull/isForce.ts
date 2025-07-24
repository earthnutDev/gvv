import { isFalse, isUndefined, isZero } from 'a-type-of-js';
import { commandParameters } from './../data-store/commandParameters';
import { command } from 'src/command';
import { gitError } from 'src/utils';
import { blinkPen, brightRedPen, greenPen } from 'color-pen';
import { dataStore } from 'src/data-store';
/**
 *
 * 是否是否强制推送而跳过当前的拉取
 *
 */
export async function isForce(): Promise<boolean> {
  const { force } = commandParameters;
  if (isFalse(force)) {
    return false;
  }

  const result = await command.selection<number>({
    info: '您启用了强制推送，为了安全劳烦再次确认',
    data: [
      {
        value: 0,
        label: '强制推送',
        tip: '可能会造成已退送的' + brightRedPen('丢失'),
      },
      {
        value: 1,
        label: '正常推送',
        tip: '拉取可能会产生冲突，需要' + greenPen('手动处理'),
      },
      {
        value: 2,
        label: '退出本次提交',
        tip: blinkPen.italic.bgCyan.black('退出本次提交'),
      },
    ],
  });

  if (isUndefined(result) || result === 2) {
    dataStore.voluntaryWIthdrawal = true;
    return await gitError('好的，您选择了退出，正在做退出前最后的处理');
  }

  return isZero(result);
}
