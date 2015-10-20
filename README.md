# shuriken
Tiny utilities for a Node ninja

## usage

#### getNested
###### x.getNested( object, keys [, alternative ])

Returns Nested property of an object if it exists.**keys**can be either an array of strings, or a single dot '.'-separated string.
 Object properties will be accessed in the same order as in keys. If**alternative**value is provided it will be returned if the nested property does not extist.
```js
var x=require('shuriken');

var object ={
   a: {
      b: {
         c : 'data'
      }
   }
};

var result = x.getNested(object, ['a', 'b', 'c']); // 'data'

var result = x.getNested(object, 'a.b.c'); //'data'

var result = x.getNested(object, 'x.y.z'); // undefined

var result = 'previous';
result = x.getNested(object, 'x.y.z', result); // 'previous'

```

#### hasNested
###### x.getNested( object, keys)

Returns true if object has a nested property, false otherwise.**keys**can be either an array of strings, or a single dot '.'-separated string.
 Object properties will be accessed in the same order as in keys.
```js
var x=require('shuriken');

var object ={
   a: {
      b: {
         c : 'data'
      }
   }
};

x.hasNested(object, ['a', 'b', 'c']); // true

x.hasNested(object, 'a.b.c'); // true

x.hasNested(object, 'x.y.z'); // false

```

