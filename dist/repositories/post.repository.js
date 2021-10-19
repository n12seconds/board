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
  store: async data => await _index.default.Post.create(data),
  // READ
  findAndCountAll: async e => await _index.default.Post.findAndCountAll({
    include: [{
      as: "author",
      model: _index.default.User,
      attributes: ["id", "name", "createdAt"]
    }],
    order: [["id", "DESC"]],
    limit: e.limit,
    offset: e.offset
  }),
  findByPk: async id => await _index.default.Post.findByPk(id),
  findByParams: async param => await _index.default.Post.findOne({
    where: {
      id: param.id,
      userId: param.userId
    }
  }),
  // UPDATE
  update: async (id, param) => {
    return await _index.default.Post.update(param, {
      where: {
        id: id
      }
    });
  } // DELETE

};
exports.default = _default;