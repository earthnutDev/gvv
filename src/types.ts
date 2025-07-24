export type GitInfo = {
  tag: string;
  /**
   * 指定别名
   *
   * 原设定想直接给🔨一个值: `origin`
   *
   * 当时 🈚️ 法在后续判断该值是用于 ✅  传值还是默认值
   *
   * 所以在使用该值的时候再进行判断是否为🈳进行默认给值
   */
  alias: string;
  /**
   * 远程仓库地址
   */
  url: string;
  /**
   * 分支名
   */
  branch: string;
  /**
   *
   * 本地分支名
   *
   */
  localBranch: string;
  /**
   * 提交信息
   */
  commit: string;
  /**
   * 已经存在的 tag
   */
  tags: string[];
  /**
   * 是否强制提交
   */
  force: boolean;
  /**
   * 未追踪的文件
   */
  untrackedFiles: string[];
  /**
   * 已追踪的修改文件（未在暂存区）
   */
  trackedChangedFiles: string[];
  /**
   * 当前暂存的文件状态
   */
  stashed: boolean;
  /**
   * 是否已经打过标签
   */
  tagged: boolean;
  /**
   * 是否已经提交
   */
  committed: boolean;
  /**  是否是在 git 的跟文件执行的命令  */
  isRoot: boolean;
};

/**  使用参数  */
export type CommandParameters = {
  /**  远程库别名  */
  alias: string;
  /**  远程分支  */
  branch: string;
  /**  初始化   */
  init: boolean;
  /**  强推  */
  force: boolean;
  /**  是否携带 tag  */
  tag: string | boolean | number;
  /**  消息  */
  message: (string | number | boolean)[];
  /**
   * 类型
   *
   *
   * 推荐使用：
   * - submit   提交
   * - revert   恢复
   * - fix      修复
   * - feat     新功能
   * - docs     文档
   * - style    样式
   * - refactor 重构
   * - perf     性能优化
   * - test     测试
   * - chore    配置
   * - ci       持续集成
   * - build    构建优化
   * - wip      开发（模块不完善）
   * - release  预发布
   *
   */
  kind:
    | 'submit'
    | 'revert'
    | 'fix'
    | 'feat'
    | 'docs'
    | 'style'
    | 'refactor'
    | 'perf'
    | 'test'
    | 'chore'
    | 'ci'
    | 'build'
    | 'wip'
    | 'merge'
    | 'release'
    | 'hotfix'
    | 'hotfix-revert'
    | 'hotfix-fix'
    | 'hotfix-feat'
    | 'hotfix-docs'
    | 'hotfix-style'
    | 'hotfix-refactor'
    | 'hotfix-perf'
    | 'hotfix-test'
    | 'hotfix-chore'
    | 'hotfix-ci'
    | 'hotfix-build'
    | 'hotfix-wip'
    | 'hotfix-merge'
    | 'hotfix-release'
    | string;
};

/**  数仓  */
export type DateStore = {
  /**
   *
   *  包信息
   *
   */
  pkg: {
    /**  当前的版本  */
    version: string;
    /**  当前项目的路径  */
    path: string;
  };
  /**
   * 是否初始化 git
   *
   */
  init: boolean;
  /**  提交的类型  */
  _kind: string | 'submit';
  /**
   * 提交类型
   */
  kind: string | 'submit';
  /**
   * 提交的主要信息
   */
  message: (string | number | boolean)[];
  /**
   * 是否打标签
   *
   * 在 kind: "version" 时，默认会打一个标签
   */
  tag: boolean | string | number;
  /**
   * git 状态
   */
  gitInfo: GitInfo;
  /**
   * 命令行参数，用户使用命令时携带的子命令或参数
   */
  commandParameters: CommandParameters;
  /**
   * 执行的动作
   */
  actions?: {
    /**
     * 是否初始化
     */
    init: {
      state: boolean;
    };
    /**
     *
     */
    /**
     * 是否提交
     */
    commit: boolean;
    /**
     * 是否推送
     */
    push: boolean;
  };

  /**  是否为主动退出  */
  voluntaryWIthdrawal: boolean;
};
