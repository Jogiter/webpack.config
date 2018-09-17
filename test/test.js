import test from 'ava';
const thunder = require('../');

test('title', t => {
    process.chdir('../demo');
    console.log(thunder);
    thunder()
    t.true()
});
