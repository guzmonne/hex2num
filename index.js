'use strict';

var { read, write } = require('ieee754');

module.exports = {
  num2hex,
  hex2num
};

// ---

var OFFSET = 0; // Buffer offset value.
var LITTLE_ENDIAN = false; // Little endian flag.
var MANTISSA_LENGTH = 52; // Length of a float64 mantissa.
var NUMBER_OF_BYTES = 8; // Number of bytes on the buffer.
/**
 * Writes am IEEE 754 compliant number into a buffer.
 * @param {number} value - Number to be written on the buffer.
 * @param {Buffer} buffer - Buffer where the `value` will be written.
 */
function writeTobuffer(value, buffer) {
  write(buffer, value, OFFSET, LITTLE_ENDIAN, MANTISSA_LENGTH, NUMBER_OF_BYTES);
}
/**
 * Reads an IEEE 754 compliant number from a buffer.
 * @param {Buffer} buffer - Buffer from which to read the first stored number.
 */
function readFromBuffer(buffer) {
  return read(buffer, OFFSET, LITTLE_ENDIAN, MANTISSA_LENGTH, NUMBER_OF_BYTES);
}
/**
 * Reads the information inside a buffer, an returns it as a string.
 * @param {Buffer} buffer - Converts the data stored in a Buffer to a hex string
 * @param {Object} options - Options configuration object.
 * @property {bool} prefix=true - Whether to add the prefix to the string or not
 * @return {string} Encoded buffer data as a string.
 */
function buf2hex(buffer, options = { prefix: true }) {
  var hex = Array.prototype.map
    .call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2))
    .join('');

  return options.prefix === true ? `0x${hex}` : hex;
}
/**
 * Creates a new buffer with information passed in as a hexadecimal string.
 * @param {string} value - String to be added into a new buffer.
 * @return {Buffer} Buffer with the data from the `value` stored inside
 */
function hex2buf(value) {
  return new Buffer(value.replace(/^0x/, ''), 'hex');
}
/**
 * Converts an IEEE 754 number into a hex representation of it.
 * @param {number} value - Number to be converted into an hexadecimal string.
 * @param {object} options - Options configuration object.
 * @return {string} IEEE 754 hex representation of the number.
 */
function num2hex(value, options) {
  if (value === undefined) throw new Error('Value is undefined');

  var buffer = Buffer.alloc(NUMBER_OF_BYTES);

  writeTobuffer(value, buffer);

  return buf2hex(buffer, options);
}
/**
 * Converts an IEEE 754 compliant hexadecimal string into a JavaScript number.
 * @param {string} value - IEEE 754 compliant hexadecimal string to be converted
 *                         into a number.
 * @return {number} Decoded number.
 */
function hex2num(value) {
  if (value === undefined) throw new Error('Value is undefined');

  var buffer = hex2buf(value);

  return readFromBuffer(buffer);
}
