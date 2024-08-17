'use strict';
const { strictEqual } = require('node:assert');
const { spawnSync } = require('node:child_process');
const { mkdirSync } = require('node:fs');
const { join } = require('node:path');
const { writeTestFile } = require('./gen-tests.js');
const hrtime = process.hrtime.bigint;
const defaults = {
  binDir: join(process.cwd(), 'node_modules', '.bin'),
  node: process.execPath,
  outDir: 'output',
};
const runners = [
  {
    name: 'node --test',
    format: 'node',
    args: ['--test', '--test-reporter=spec', '--experimental-test-isolation=process', '*.js'],
  },
  {
    name: 'node --test --experimental-test-isolation=none',
    format: 'node',
    args: ['--test', '--test-reporter=spec', '--experimental-test-isolation=none', '*.js'],
  },
  {
    name: 'mocha',
    format: 'mocha',
    args: ['$BIN_DIR/mocha', '*.js'],
  },
  {
    name: 'mocha --parallel',
    format: 'mocha',
    args: ['$BIN_DIR/mocha', '--parallel', '*.js'],
  },
];
const configs = [
  {
    name: '1-file-10-tests',
    numberOfFiles: 1,
    numberOfTests: 10,
    numberOfSuites: 0,
    numberOfTestsPerSuite: 0,
  },
  {
    name: '1-file-100-tests',
    numberOfFiles: 1,
    numberOfTests: 100,
    numberOfSuites: 0,
    numberOfTestsPerSuite: 0,
  },
  {
    name: '1-file-1_000-tests',
    numberOfFiles: 1,
    numberOfTests: 1_000,
    numberOfSuites: 0,
    numberOfTestsPerSuite: 0,
  },
  {
    name: '10-files-100-tests-each',
    numberOfFiles: 10,
    numberOfTests: 100,
    numberOfSuites: 0,
    numberOfTestsPerSuite: 0,
  },
  {
    name: '10-files-1_000-tests-each',
    numberOfFiles: 10,
    numberOfTests: 1_000,
    numberOfSuites: 0,
    numberOfTestsPerSuite: 0,
  },
];

for (let i = 0; i < configs.length; ++i) {
  const config = configs[i];

  for (let j = 0; j < runners.length; ++j) {
    const runner = runners[j];

    if (typeof runner.skip === 'function' && runner.skip(config)) {
      continue;
    }

    const runnerDir = join(defaults.outDir, config.name, runner.format);

    mkdirSync(runnerDir, { recursive: true });
    for (let k = 0; k < config.numberOfFiles; ++k) {
      const testFile = `test-${k}.spec.js`;

      writeTestFile(join(runnerDir, testFile), runner, config);
    }

    const args = runner.args.map((arg) => {
      return arg
        .replaceAll('$BIN_DIR', defaults.binDir)
    });

    const start = hrtime();
    const result = spawnSync(defaults.node, args, { cwd: runnerDir, maxBuffer: Number.MAX_SAFE_INTEGER });
    const elapsed = hrtime() - start;
    strictEqual(result.status, 0);
    console.log(`${elapsed},${config.name},${runner.name}`);
  }
}
