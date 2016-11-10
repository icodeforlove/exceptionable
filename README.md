# exceptionable [![Build Status](https://travis-ci.org/icodeforlove/exceptionable.png?branch=master)](https://travis-ci.org/icodeforlove/exceptionable)

### what?

Decorator that allows you to swallow exceptions. 

**This should be used with care, if you really need something like this it can be useful, but if you don't it can also be a footgun.**

## install

```
npm install --save exceptionable
```

## usage

you can define a universal decorator like this

```javascript
import exceptionable from 'exceptionable';

class Example {
    @exceptionable
    static canError () {
        throw new Error('abcd');
    }
}

console.log('before error');
Example.canError();
console.log('after error');
```

## custom handling

you can handle error logging in a custom way as well

```javascript
const debug = requre('debug')('example');

@exceptionable({handler: error => debug(error.stack)})
class Example {
    static canError () {
        throw new Error('abcd');
    }
}
```
