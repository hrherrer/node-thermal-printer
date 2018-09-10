'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var parseNet = /^tcp:\/\/([^\/:]+)(?::(\d+))?\/?$/i;
var parsePrinter = /^printer:([^\/]+)(?:\/([\w-]*))?$/i;

function getInterface(uri) {
  if ((typeof uri === 'undefined' ? 'undefined' : _typeof(uri)) === "object") {
    return uri;
  }

  var net = parseNet.exec(uri);
  if (net) {
    var _Mod = require('./net');
    return new _Mod(net[1], net[2]);
  }

  var printer = parsePrinter.exec(uri);
  if (printer) {
    var _Mod2 = require('./printer');
    return new _Mod2(printer[1], printer[2]);
  }

  var Mod = require('./file');
  return new Mod(uri);
}

module.exports = getInterface;