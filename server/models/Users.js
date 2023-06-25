module.exports = (Sequelize, DataTypes) => {
  const Users = Sequelize.define("Users", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    mobile_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },

    user_role: {
      type: DataTypes.ENUM("storekeeper", "cashier", "admin"),
      allowNull: false,
    },

    user_password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // token: {
    //   type: DataTypes.STRING,
    //   required: true,
    // },

    // verifytoken: {
    //   type: DataTypes.STRING,
    // },
  });

  return Users;
};
