'use strict';

var { num2hex, hex2num } = require('../index.js');

var num = 235620.1288587215;
var hex = '0x410cc32107e714d5';

describe('num2hex(value, options)', () => {
  test('should be a function', () => {
    expect(typeof num2hex).toEqual('function');
  });

  test('should throw if `value` is undefined', () => {
    expect(() => num2hex()).toThrow('Value is undefined');
  });

  test('should return a string', () => {
    expect(typeof num2hex(num)).toEqual('string');
  });

  test('should convert the number into an 8 byte hexadecimal string', () => {
    expect(num2hex(num)).toEqual(hex);
  });

  test('should convert the number into a raw 8 byte hexadecimal string if the `options.prefix` flag is set to false', () => {
    expect(num2hex(num, { prefix: false })).toEqual(hex.replace('0x', ''));
  });

  test('should return hexadecimal strings that behaves the same as their number versions, when dealing with comparator operators, if both numbers are positive', () => {
    var n1, n2, h1, h2;
    for (var i = 0; i < 1000; i++) {
      n1 = randomNumber();
      n2 = randomNumber();
      h1 = num2hex(n1);
      h2 = num2hex(n2);
      expect(n1 > n2 === h1 > h2).toBe(true);
      expect(n1 < n2 === h1 < h2).toBe(true);
      expect(n1 <= n2 === h1 <= h2).toBe(true);
      expect(n1 >= n2 === h1 >= h2).toBe(true);
      expect((n1 == n2) === (h1 == h2)).toBe(true);
      expect((n1 === n2) === (h1 === h2)).toBe(true);
    }
  });
});

describe('hex2num(value)', () => {
  test('should be a function', () => {
    expect(typeof hex2num).toEqual('function');
  });

  test('should throw an error if the `value` is undefined', () => {
    expect(() => hex2num()).toThrow('Value is undefined');
  });

  test('should convert an 8 byte hexadecimal string to a number', () => {
    expect(hex2num(hex)).toEqual(num);
  });

  test('should convert an 8 byte hexadecimal string without the prefix to a number', () => {
    expect(hex2num(hex.replace('0x', ''))).toEqual(num);
  });
});

function randomNumber() {
  return Math.pow(1, Math.floor(Math.random() * 10)) * Math.random() * 10000;
}
