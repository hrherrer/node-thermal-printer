"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var electron = typeof process !== 'undefined' && process.versions && !!process.versions.electron;

function PrinterIface(printerName, moduleName) {
  this.name = printerName;
  if (moduleName && (typeof moduleName === "undefined" ? "undefined" : _typeof(moduleName)) === "object") {
    this.driver = moduleName;
  } else {
    this.driver = require(moduleName || (electron ? "electron-printer" : "printer"));
  }
}

PrinterIface.prototype.getPrinterName = function () {
  var name = this.name;
  if (!name || name === "auto") {
    var pl = this.driver.getPrinters().filter(function (p) {
      return p.attributes.indexOf("RAW-ONLY") > -1;
    });
    if (pl.length > 0) {
      name = pl[0].name;
    }
  }
  if (!name || name === "auto") {
    throw "A RAW-ONLY Printer could not be detected. Please configure a Printer-Name";
  }
  return name;
};

PrinterIface.prototype.isPrinterConnected = function (exists) {
  if (this.driver.getPrinter(this.getPrinterName())) {
    exists(true);
  } else {
    exists(false);
  }
};

PrinterIface.prototype.execute = function (buffer, cb) {
  this.driver.printDirect({
    data: buffer,
    printer: this.getPrinterName(),
    type: "RAW",
    success: function success(jobID) {
      if (typeof cb === "function") {
        cb(null);
      }
    },
    error: function error(err) {
      if (typeof cb === "function") {
        cb(err);
      }
    }
  });
};

module.exports = PrinterIface;