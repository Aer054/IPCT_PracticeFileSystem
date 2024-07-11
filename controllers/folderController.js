const ApiError=require("../error/ApiError")
const Folder=require("../models/folder")
const File=require("../models/file")
const User=require("../models/user")
const sequelize = require('../db');
async function deleteFolderRecursively(folderId, userId) {
    try {
        const folder = await Folder.findOne({
            where: { id: folderId, userId }
        });

        if (!folder) {
            throw  ApiError.forbidden('Forbidden');
        }
        if (folder.parentId === null) {
            throw ApiError.forbidden('Нельзя удалить корневую папку');
        }
        const subfolders = await Folder.findAll({
            where: { parentId: folderId, userId }
        });

        const files = await File.findAll({
            where: { folderId }
        });

        for (const file of files) {
            await file.destroy();
        }

        for (const subfolder of subfolders) {
            await deleteFolderRecursively(subfolder.id, userId);
        }

        await folder.destroy();
    } catch (error) {
        throw new Error(error.message); 
    }
}
class FolderController{
    async createFolder(req, res,next) {
        const { name, parentId } = req.body;
        try{
            const folder = await Folder.create({
                name,
                userId:req.user.id,
                parentId,
              });
              res.status(201).json(folder);
        }catch(e){
            next(ApiError.internal(error.message));
        }
    }
    async getFolder(req, res,next) {
        const { id } = req.params;
        try {
            const parentFolder = await Folder.findOne({where:{id:id}})
            if (!parentFolder) {
                res.json({ message: "Папка не найдена" });
                return next();
            }
            const folders = await Folder.findAll({ where: { parentId: id } });
            const files = await File.findAll({ where: { folderId: id } });
            
            const children = [];
    
            if(folders) {
            folders.forEach(folder => {
                children.push({
                    id: folder.id,
                    name: folder.name,
                    type: "folder"
                });
            });
            }
            if(files){
            files.forEach(file => {
                children.push({
                    id: file.id,
                    file: {
                        name: file.name,
                        filepath: file.filepath
                    },
                    type: "file"
                });
            });
            }
            const data = {
                data: {
                    id: id,
                    name: parentFolder.name,
                    children: children
                }
            };
    
            res.json(data);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }
    
    async deleteFolder(req, res,next) {
        const { id } = req.params;
        const userId = req.user.id;
        const transaction = await sequelize.transaction();
        try {
            await deleteFolderRecursively(id, userId);
            await transaction.commit();
            res.json({ message: 'Папка успешно удалена' });
        } catch (error) {
            await transaction.rollback();
            next(ApiError.internal(error.message));
        }
    }
    async updateFolder(req, res, next) {
        const { id } = req.params;
        const { name, parentId } = req.body;

    try {
        const folder = await Folder.findByPk(id);
        if (!folder || folder.userId !== req.user.userId) {
            return next(ApiError.forbidden('Forbidden'));
        }
        if (folder.parentId === null) {
            throw ApiError.forbidden('Нельзя изменять корневую папку');
        }
        folder.name = name || folder.name;
        folder.parentId = parentId || folder.parentId;

        await folder.save();

        res.json(folder);
    } catch (error) {
        next(ApiError.internal(error.message));
    }
    }

}
module.exports = new FolderController()