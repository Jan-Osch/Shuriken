"use strict";
let reachDeep = require('./../src/index.js');
let reach = require('reach');
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
console.info('Shorter time is better:');
console.time(`reachDeep for existing property invoked ${timesToInvoke} times`);
const reachDeepExisting = _.times(timesToInvoke, ()=>reachDeep(mock, 'a.b.c.d.e.f.g.h'));
assert(_.every(reachDeepExisting, (element)=> element === 'result'));
console.timeEnd(`reachDeep for existing property invoked ${timesToInvoke} times`);

console.time(`reachDeep for non-existing property invoked ${timesToInvoke} times`);
const reachDeepNotExisting = _.times(timesToInvoke, ()=>reachDeep(mock, 'a.b.c.d.e.f.g.h.i'));
assert(_.every(reachDeepNotExisting, (element)=>element === undefined));
console.timeEnd(`reachDeep for non-existing property invoked ${timesToInvoke} times`);

//Reach
console.time(`reach for existing property invoked ${timesToInvoke} times`);
const resultExisting = _.times(timesToInvoke, ()=>reach(mock, 'a.b.c.d.e.f.g.h'));
assert(_.every(resultExisting, (element)=> element === 'result'));
console.timeEnd(`reach for existing property invoked ${timesToInvoke} times`);

console.time(`reach for non-existing property invoked ${timesToInvoke} times`);
const resultNotExisting = _.times(timesToInvoke, ()=>reach(mock, 'a.b.c.d.e.f.g.h.i'));
assert(_.every(resultNotExisting, (element)=>element === undefined));
console.timeEnd(`reach for non-existing property invoked ${timesToInvoke} times`);

