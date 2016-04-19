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


function benchmarkImplementation(benchmarkName, timesToInvoke, functionToCall, expectedValue) {
    console.time(`${benchmarkName} invoked ${timesToInvoke} times`);
    const results = _.times(timesToInvoke, functionToCall);
    assert(_.every(results, (element)=> element === expectedValue));
    console.timeEnd(`${benchmarkName} invoked ${timesToInvoke} times`);
}

function reachAlternative(source, path, replacement) {
    var key;

    if (!Array.isArray(path)) {
        path = path.split('.');
    }

    while (key = path.shift()) {
        if (Array.isArray(source)) {
            if (isNaN(key) || typeof source[key] === 'undefined') {
                return replacement;
            }

            source = source[key];
        } else if (source && source.hasOwnProperty(key)) {
            source = source[key];
        } else {
            return replacement;
        }
    }

    return source;
}

function reachAlternativeWithForLoop(source, path, replacement) {
    var key;

    if (!Array.isArray(path)) {
        path = path.split('.');
    }

    for (var i =0 ; i< path.length; i++){
        key = path[i];

        if (Array.isArray(source)) {
            if (isNaN(key) || typeof source[key] === 'undefined') {
                return replacement;
            }

            source = source[key];
        } else if (source && source.hasOwnProperty(key)) {
            source = source[key];
        } else {
            return replacement;
        }
    }

    return source;
}


function createResolver(keypath) {
    return new Function('root', `
    try { return root.${keypath}; }
    catch(e){ return undefined; }
 `);
}

benchmarkImplementation('reach-deep for existing property', timesToInvoke, ()=>reachDeep(mock, 'a.b.c.d.e.f.g.h'), 'result');
benchmarkImplementation('reach-deep for existing property', timesToInvoke, ()=>reachDeep(mock, 'a.b.c.d.e.f.g.h'), 'result');

benchmarkImplementation('reachAlternative for existing property', timesToInvoke, ()=>reachAlternative(mock, 'a.b.c.d.e.f.g.h'), 'result');
benchmarkImplementation('reachAlternative for non-existing property', timesToInvoke, ()=>reachAlternative(mock, 'a.b.c.d.e.f.g.h.i'), undefined);

benchmarkImplementation('reachAlternativeWithForLoop for existing property', timesToInvoke, ()=>reachAlternativeWithForLoop(mock, 'a.b.c.d.e.f.g.h'), 'result');
benchmarkImplementation('reachAlternativeWithForLoop for non-existing property', timesToInvoke, ()=>reachAlternativeWithForLoop(mock, 'a.b.c.d.e.f.g.h.i'), undefined);

benchmarkImplementation('reach for existing property', timesToInvoke, ()=>reach(mock, 'a.b.c.d.e.f.g.h'), 'result');
benchmarkImplementation('reach for non-existing property', timesToInvoke, ()=>reach(mock, 'a.b.c.d.e.f.g.h.i'), undefined);

let resolver = createResolver('a.b.c.d.e.f.g.h');
let resolverNonExisting = createResolver('a.b.c.d.e.f.g.h.i');

benchmarkImplementation('resolver for existing property', timesToInvoke, ()=>resolver(mock), 'result');
benchmarkImplementation('resolver for non-existing property', timesToInvoke, ()=>resolverNonExisting(mock), undefined);

benchmarkImplementation('resolver each time created for existing property', timesToInvoke, ()=>{
    return createResolver('a.b.c.d.e.f.g.h')(mock);
}, 'result');
benchmarkImplementation('resolver each time created for non-existing property', timesToInvoke, ()=>{
    return createResolver('a.b.c.d.e.f.g.h.i')(mock);
}, undefined);

