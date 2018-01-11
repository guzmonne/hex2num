# JavaScript IEEE 754 number to 8 byte hexadecimal string.

This library purpose is to provide an easy way to convert JavaScript numbers into 8 byte hexadecimal strings.

## Documentation

### `num2hex(num: number, options: object)`

Converts a number into a hexadecimal value of 8 bytes. By default the returned string with contain the prefix `0x`. To opt out of this behaviour, set the `prefix` flag to `false` on the `options` object.

```javascript
var num = 1659025581069;
var hex = num2hex(num);

console.log(hex);
// '0x4278245a1640d000'

var raw_hex = num2hex(num, { prefix: false });

console.log(raw_hex);
// '4278245a1640d000'
```

### `hex2num(hex: string)`

Converts an 8 byte hexadeximal string into a number.

```javascript
var hex = '0x4278245a1640d000';
var num = num2hex(hex);

console.log(num);
// 1659025581069
```

## Test

I am using `jest`, and `node v6.10.3` to test the library. It should work on higher version of `node`, but I haven't tried it.

Just clone, install the dependecies, and run the `test` task from `yarn` or `npm`.

```
yarn install

yarn test
```

## Licence

MIT
