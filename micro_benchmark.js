var indexFile = require('./index.js');
var _ = require('lodash');
var assert = require('assert');

var mock = {
    a: {
        b: {
            c: {
                d: {
                    e: {
                        f: {
                            g: {
                                h: 'result'
                            }
                        }
                    }
                }
            }
        }
    }
};

const timesToInvoke = 100000;

console.time('regular hasNested');

const resultRegular = _.times(timesToInvoke, ()=>indexFile.getNested(mock, 'a.b.c.d.e.f.g.h'));
assert(_.every(resultRegular, (element)=> element === 'result'));

const resultRegularNot = _.times(timesToInvoke, ()=>indexFile.getNested(mock, 'a.b.c.d.e.f.g.h.i'));
assert(_.every(resultRegularNot, (element)=>element === undefined));

console.timeEnd('regular hasNested');




console.time('regular hasNestedNice');

var resultNice = _.times(timesToInvoke, ()=>indexFile.getNestedNice(mock, 'a.b.c.d.e.f.g.h'));
assert(_.every(resultNice, (element)=>element === 'result'));

var resultNiceNot = _.times(timesToInvoke, ()=>indexFile.getNestedNice(mock, 'a.b.c.d.e.f.g.h.i'));
assert(_.every(resultRegularNot, (element)=>element === undefined));

console.timeEnd('regular hasNestedNice');