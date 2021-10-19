"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = _interopRequireDefault(require("../models/index.js"));

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Op = _sequelize.default.Op;
var _default = {
  // CREATE
  store: async data => await _index.default.User.create(data),
  // READ
  findAndCountAll: async e => await _index.default.User.findAndCountAll({
    order: [["id", "DESC"]],
    limit: e.limit,
    offset: e.offset
  }),
  all: async () => await _index.default.User.findAll(),
  findByPk: async id => await _index.default.User.findByPk(id),
  findByName: async param => await _index.default.User.findOne({
    where: {
      name: param
    }
  }),
  // findByParams: async (params) =>
  // await models.User.findOne( {
  //   where:{
  //     name:params.name
  //   }
  // }),
  // UPDATE
  update: async (id, param) => {
    return await _index.default.User.update(param, {
      where: {
        id: id
      }
    });
  } // DELETE

};
exports.default = _default;