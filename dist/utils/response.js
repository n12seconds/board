"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const httpStatus = require("http-status");

var _default = (res, data, boolean, code = httpStatus.OK) => {
  let response = {
    result: false
  };

  if (boolean == undefined) {
    response.result = true;
  }

  if (code > 399) {
    response.result = false;
  }

  if (typeof data === "object") {
    response = Object.assign(data, response);
  }

  return res.status(code).json(response);
};

exports.default = _default;