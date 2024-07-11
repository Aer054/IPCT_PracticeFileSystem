const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Folder = require('./folder');

const File = sequelize.define('File', {
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
    filepath: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    folderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

File.belongsTo(Folder, { foreignKey: 'folderId' });

module.exports = File;
