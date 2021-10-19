"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const basename = _path.default.basename(__filename);

const models = {};
const sequelize = new _sequelize.default({
  dialect: 'sqlite',
  storage: '../database.sqlite'
});

_fs.default.readdirSync(__dirname).filter(file => file.indexOf(".") !== 0 && file !== basename && file.slice(-9) === ".model.js").forEach(file => {
  const model = require(_path.default.join(__dirname, file))(sequelize, _sequelize.default.DataTypes);

  models[model.name] = model;
});

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }

  models[modelName].sync();
});
models.sequelize = sequelize;
models.Sequelize = _sequelize.default;
var _default = models;
exports.default = _default;