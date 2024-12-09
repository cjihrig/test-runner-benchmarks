# test-runner-benchmarks

- Run `npm i`.
- Generate test files and execute them `node run-tests.js`.

Results run on an M1 with Node 23.3.0 and mocha 11.0.1.

```
79778584,1-file-10-tests,node --test
43107167,1-file-10-tests,node --test --experimental-test-isolation=none
94638750,1-file-10-tests,mocha
168972416,1-file-10-tests,mocha --parallel

113103041,1-file-100-tests,node --test
49243125,1-file-100-tests,node --test --experimental-test-isolation=none
102382625,1-file-100-tests,mocha
177219208,1-file-100-tests,mocha --parallel

185517292,1-file-1_000-tests,node --test
100436958,1-file-1_000-tests,node --test --experimental-test-isolation=none
157519750,1-file-1_000-tests,mocha
269989250,1-file-1_000-tests,mocha --parallel

177637500,10-files-100-tests-each,node --test
100242125,10-files-100-tests-each,node --test --experimental-test-isolation=none
160925000,10-files-100-tests-each,mocha
251466750,10-files-100-tests-each,mocha --parallel

483206333,10-files-1_000-tests-each,node --test
485899292,10-files-1_000-tests-each,node --test --experimental-test-isolation=none
566778667,10-files-1_000-tests-each,mocha
654491541,10-files-1_000-tests-each,mocha --parallel
```
