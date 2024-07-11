const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./user');

const Folder = sequelize.define('Folder', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    parentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
});

Folder.belongsTo(User, { foreignKey: 'userId' });

module.exports = Folder;