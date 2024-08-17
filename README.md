# test-runner-benchmarks

- Run `npm i`.
- Generate test files and execute them `node run-tests.js`.

Results run on an M1 with Node 22.9.0 and mocha 10.7.3.

```
73457750,1-file-10-tests,node --test
41804917,1-file-10-tests,node --test --experimental-test-isolation=none
102216375,1-file-10-tests,mocha
153965209,1-file-10-tests,mocha --parallel

92987625,1-file-100-tests,node --test
52665833,1-file-100-tests,node --test --experimental-test-isolation=none
97017417,1-file-100-tests,mocha
167094542,1-file-100-tests,mocha --parallel

194795208,1-file-1_000-tests,node --test
103170042,1-file-1_000-tests,node --test --experimental-test-isolation=none
150775125,1-file-1_000-tests,mocha
266302625,1-file-1_000-tests,mocha --parallel

191338708,10-files-100-tests-each,node --test
109412166,10-files-100-tests-each,node --test --experimental-test-isolation=none
165382709,10-files-100-tests-each,mocha
246135000,10-files-100-tests-each,mocha --parallel

572871917,10-files-1_000-tests-each,node --test
555053166,10-files-1_000-tests-each,node --test --experimental-test-isolation=none
602424584,10-files-1_000-tests-each,mocha
630197250,10-files-1_000-tests-each,mocha --parallel
```
