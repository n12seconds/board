import fs from "fs";
import path from "path";
import Sequelize from "sequelize";


const basename = path.basename(__filename);

const models = {};

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: '../database.sqlite'
});

fs.readdirSync(__dirname)
  .filter(
    (file) =>    
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-9) === ".model.js"
  )
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    models[model.name] = model;
  });

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
  models[modelName].sync();
});


models.sequelize = sequelize;
models.Sequelize = Sequelize;


export default models;
