"use strict";
let reach = require('./../src/index.js');
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

console.time(`reach invoked ${timesToInvoke} times`);

const resultExisting = _.times(timesToInvoke, ()=>reach(mock, 'a.b.c.d.e.f.g.h'));
assert(_.every(resultExisting, (element)=> element === 'result'));

const resultNotExisting = _.times(timesToInvoke, ()=>reach(mock, 'a.b.c.d.e.f.g.h.i'));
assert(_.every(resultNotExisting, (element)=>element === undefined));

console.timeEnd(`reach invoked ${timesToInvoke} times`);
