# reach-deep
Tired of `cannot read property "xyz" of undefined` ? This tiny utility helps to reach nested objects.

## Install
```
$ npm install reach-deep
```

## Require
```js
var reach = require("reach-deep");
```

## Description:

Returns the value of a nested property of source object if it exists.
Even if the nested property evaluates to false it will be returned.
If the nested property does not exist, undefined will be returned.

## Benchmark
Is about 4 times faster than "reach" module.
To test the performance with micro-benchmark run:
```
$ npm run benchmark
```

#### Signature
```js
function reach(source, path, sourceName){..}
```
 * @param {Object} source       source object
 * @param {String} path         path without first dot e.g. "response.http.statusCode"
 * @param {String=} sourceName  if provided, any caught error will be logged to console
 * @returns {*}                 value under the source.path or undefined
## examples:
#### Simple reach
```js
var object ={
   a: {
      b: {
         c : 'data'
      }
   }
};

var result = reach(object, 'a.b.c'); // 'data'
var resultNotExisting = reach(object, 'a.b.c.d.e.f'); // undefined
```

#### Complex reach
```js
var mock = {
        a: function () {
            return {
                b: {
                    c: [
                        {},
                        {
                            "d": {
                                e: 'expected'
                            }
                        }
                    ]
                }
            }
        }
    };
var result = reach(mock, 'a().b.c[1]["d"].e'); // 'expected'
```

#### Reach verbose
```js
var mock = {};
reach(mock, 'a().b.c[1]["d"].e', 'mock'); // logs to console: TypeError['mock.a is not a function']
```
