'use strict';
const { writeFileSync } = require('node:fs');

const nodeWriter = {
  cjsHeader() {
    return `
'use strict';
const { describe, it } = require('node:test');
const { strictEqual } = require('node:assert');
`;
  },
  suiteStart(level, id) {
    const prefix = indent(level);
    return `${prefix}describe('${id}', async () => {\n`;
  },
  suiteEnd(level) {
    const prefix = indent(level);
    return `${prefix}});\n`;
  },
  test(level, id) {
    const prefix = indent(level);
    return `
${prefix}it('${id}', async () => {
${indent(level + 1)}strictEqual('${id}', '${id}');
${prefix}});
`;
  },
};

const mochaWriter = {
  cjsHeader() {
    return `
'use strict';
const { strictEqual } = require('node:assert');
`;
  },
  suiteStart: nodeWriter.suiteStart,
  suiteEnd: nodeWriter.suiteEnd,
  test: nodeWriter.test,
};

const writers = {
  node: nodeWriter,
  mocha: mochaWriter,
};

function indent(level) {
  return ' '.repeat(2 * level); // Two space indentation.
}

function writeTestFile(filename, runner, config) {
  const writer = writers[runner.format];
  let output = '';

  output += writer.cjsHeader();

  for (let i = 0; i < config.numberOfSuites; ++i) {
    output += writer.suiteStart(0, `suite-0-${i}`);
    for (let j = 0; j < config.numberOfTestsPerSuite; ++j) {
      output += writer.test(1, `test-1-${j}`);
    }
    output += writer.suiteEnd(0);
  }

  for (let i = 0; i < config.numberOfTests; ++i) {
    output += writer.test(0, `test-0-${i}`);
  }

  writeFileSync(filename, output);
}

module.exports = { writeTestFile };
