"use strict";

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      field: "id"
    },
    name: {
      type: DataTypes.STRING
    },
    //이름
    password: {
      type: DataTypes.STRING
    },
    //비번
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
      //삭제일(탈퇴)
      type: DataTypes.DATE,
      field: "deleted_at"
    }
  }, {
    sequelize,
    tableName: "user",
    modelName: "User",
    paranoid: "true" //삭제시 deleteAt 업데이트, 자동으로 제외하고 조회

  });

  User.associate = function (models) {
    User.hasMany(models.Post, {
      as: "post",
      foreignKey: "userId",
      sourceKey: "id"
    });
  };

  return User;
};