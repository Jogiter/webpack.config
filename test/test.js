import test from 'ava';
const thunder = require('../');

test('title', t => {
    process.chdir('../demo');
    thunder();
    t.true();
});
