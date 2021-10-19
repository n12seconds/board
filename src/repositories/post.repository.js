import models from "../models/index.js";
import sequelize from "sequelize";
const Op = sequelize.Op;

export default {
  // CREATE
  store: async (data) => await models.Post.create(data),

  // READ
  findAndCountAll: async (e) =>
    await models.Post.findAndCountAll({
      include: [ {
        as: "author",
        model: models.User,
        attributes: ["id","name","createdAt"], 
       
      },],
      
      order: [["id", "DESC"]],
      limit: e.limit,
      offset: e.offset,
    }),

  findByPk: async (id) => await models.Post.findByPk(id), 

  findByParams: async (param) =>
  await models.Post.findOne( {
    where:{
      id:param.id,
      userId: param.userId
    }
  }),

  // UPDATE
  update: async (id, param) => {
    return await models.Post.update(param, {
      where: {
        id: id,
      },
    });
  },

  // DELETE
};
