import { isFalse } from 'a-type-of-js';
import { DateStore } from './types';

export const dataStore: DateStore = {
  init: false,
  _kind: 'submit',
  get kind() {
    return this._kind;
  },
  set kind(value: string) {
    this._kind = value;
    // 当 kind 为 version 时，默认打 tag
    if (value === 'version' && isFalse(this.tag)) {
      this.tag = this.commandParameters.tag = true;
    }
  },
  message: [],
  tag: false,
  gitInfo: {
    alias: '',
    url: '',
    branch: '',
    localBranch: '',
    commit: '',
    force: false,
    tags: [],
    tag: '',
    untrackedFiles: [],
    trackedChangedFiles: [],
  },
  commandParameters: {
    alias: '',
    branch: '',
    init: false,
    force: false,
    tag: false,
    message: [],
    kind: '',
  },
  pkg: {
    version: '',
    path: '',
  },
};
