# gvv

## v0.1.6 (2025-7-28)

- 文档整理

## v0.1.5 (2025-7-24)

优化了使用 `pnpm` 作为管理包工具时，正常退出程序时显示 `ELIFECYCLE  Command failed with exit code 1.` 错误信息提示。

## v0.1.4 (2025-7-23)

### 🐛 bug 修复

- 当文件名中出现空格时，会导致文件添加错误

## v0.1.3 (2025-7-19)

- 修复已知问题

## v0.1.2 (2025-7-16)

- 修复已知问题

## v0.1.1 (2025-7-14)

### 🚀 优化

- 在实际的使用中，发现还需要使用 `-m` 这个倒霉的家伙。但使用这个家伙就会导致使用 `npm` 的 `run` 名令执行钩子时，需要使用 `--` 来声明该参数为子命令使用参数，无需解析。而不是用 `-m` 就需要使用全拼 `message` 。现在，默认未匹配的语句将被追加到 `message` 中，这样，就可以不用输入 `-m` 了。（既然，这不是解决的唯一方案。直接在命令行添加 `-m` 亦可，示例如下 ⬇️ ）

```json
{
  "scripts": {
    "push": "gvv -m"
  }
}
```

当然，实际使用时可多次使用 `-m`。而非 `-m` 的其他参数，将已接收到的第一个参数为准 》〉》〉

```bash
npm run push -- "我是一条消息" -f -m "这样你是不是就觉得使用 force 提交" \
      -f false -m="那你就错了" "实际上我依旧是一条有效的消息"      \
      -f "而我就是非法的消息，不会保存于 git commit  的 message 中"
```

但如果在使用的参数中，仅包含了一个 `-f` 这时候的值会被默认为 `true`

- 在嵌套包下执行 `npm run push:version` （前提是设置了） `push:version : gvv` 时，不再以默认的 `vXX.XX.XX` 作为本次提交的 tag ，而是以子包名 + 版本号的格式以做不同包之间的版本区分。

### ✨ 优化

在执行 `git fetch` 会先判定当前是否有冲突而不是直接合并出冲突，虽然没有什么用。但是加深了我对 git 的执行原理的理解

## v0.1.0 (2025-6-21)

- 执行命令的环境会自动寻址到 '.git' 目录（项目跟）下

## v0.0.8 (2025-6-14)

- 在为使用 tag 时，打入的消息为 `kind: false` 显然是不正确的

## v0.0.7 (2025-6-10)

- 更改了提交和合并的逻辑，防止在合并时直接产生冲突而导致 `stash` 内容遗忘。现在先提交本地的代码而后进行拉取合并，这时候仅产生一个冲突。

## v0.0.6 (2025-6-8)

- 调整为追踪的文件的添加追踪的方式
- 修正最后的推送携带 tag 的命令

## v0.0.5 (2025-6-6)

- 推送消息使用 tag 代替 version 内容（原 version 在包）。

## v0.0.4 (2025-6-4)

- 优化选择分支
- 优化结果文本展示
- 优化别名对应的网址错误的提示
- 优化强制推送时产生推拉问题（请注意，强制推送将跳过拉取最新的推送）

## v0.0.3 (2025-6-4)

- 修复已知问题，该问题导致在仅一个远端别名时获取别名为 `undefined`

## v0.0.2 (2025-6-4)

- 么事，优化了逻辑

## 0.0.1 (3 月 29 2025 年)

- 添加主要功能

## 0.0.0 (3 月 29 2025 年)

- 初始化项目
