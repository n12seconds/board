"use strict";

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("Post", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      field: "id"
    },
    userId: {
      type: DataTypes.INTEGER,
      field: "userId"
    },
    //작성자pk
    title: {
      type: DataTypes.STRING
    },
    //제목
    contents: {
      type: DataTypes.STRING
    },
    //내용
    createdAt: {
      //등록일
      allowNull: false,
      type: DataTypes.DATE,
      field: "created_at"
    },
    updatedAt: {
      //수정일
      allowNull: false,
      type: DataTypes.DATE,
      field: "updated_at"
    },
    deletedAt: {
      //삭제일
      type: DataTypes.DATE,
      field: "deleted_at"
    }
  }, {
    sequelize,
    tableName: "post",
    modelName: "Post"
  });

  Post.associate = function (models) {
    Post.belongsTo(models.User, {
      as: "author",
      foreignKey: "userId",
      targetKey: "id"
    });
  };

  return Post;
};