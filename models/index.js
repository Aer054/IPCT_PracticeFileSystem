const Sequelize=require('../db');
const User = require('./user');
const Folder = require('./folder');
const File = require('./file');

User.hasMany(Folder, { foreignKey: 'userId' });
Folder.belongsTo(User, { foreignKey: 'userId' });

Folder.hasMany(Folder, { foreignKey: 'parentId', as: 'subfolders' });
Folder.belongsTo(Folder, { foreignKey: 'parentId', as: 'parent' });

Folder.hasMany(File, { foreignKey: 'folderId' });
File.belongsTo(Folder, { foreignKey: 'folderId' });

const initDB = async()=>{
    try{
        await Sequelize.authenticate()
        await Sequelize.sync()
        
    }catch(e){
        console.log(e)
    }
}
module.exports = { initDB, User, Folder, File };