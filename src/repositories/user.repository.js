import models from "../models/index.js";
import sequelize from "sequelize";
const Op = sequelize.Op;

export default {
  // CREATE
  store: async (data) => await models.User.create(data),

  // READ
  findAndCountAll: async (e) =>
    await models.User.findAndCountAll({
      order: [["id", "DESC"]],
      limit: e.limit,
      offset: e.offset  
    }),

  all: async () => await models.User.findAll(),

  findByPk: async (id) => await models.User.findByPk(id),

  findByName: async (param) =>
  await models.User.findOne( {
    where:{
      name:param
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
      return await models.User.update(param, {
        where: {
          id: id,
        },
      });
    },
    
  // DELETE
};
