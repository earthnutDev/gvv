import {
  pathJoin,
  readFileToJsonSync,
  getDirectoryBy,
  writeJsonFile,
} from 'a-node-tools';

let packageJson = readFileToJsonSync('./package.json');

['scripts', 'devDependencies', 'lint-staged', 'private'].forEach(
  key => delete packageJson[key],
);

packageJson = {
  ...packageJson,
  author: {
    name: 'earthnut',
    email: 'earthnut.dev@outlook.com',
    url: 'https://earthnut.dev',
  },
  files: ['src', 'bin.mjs'],
  keywords: ['gvv', 'earthnut'],
  homepage: 'https://earthnut.dev/gvv',
  bugs: {
    url: 'https://github.com/earthnutDev/gvv/issues',
    email: 'earthnut.dev@outlook.com',
  },
  repository: {
    type: 'git',
    url: 'git+https://github.com/earthnutDev/gvv.git',
  },
  publishConfig: {
    access: 'public',
    registry: 'https://registry.npmjs.org/',
  },
  bin: {
    gvv: './bin.mjs',
  },
};

// 写入 dist/package.json
{
  const distPath = getDirectoryBy('dist', 'directory');
  const distPackagePath = pathJoin(distPath, './dist/package.json');
  writeJsonFile(distPackagePath, packageJson);
}
