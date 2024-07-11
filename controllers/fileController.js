const ApiError=require("../error/ApiError")
const Folder=require("../models/folder")
const File=require("../models/file")

const fs = require('fs');
const path = require('path');

class FileController{
    async uploadFile(req, res, next) {
        const { name, folderId } = req.body;
        const file = req.file;
        const userId = req.user.id;
        if (!name || !folderId || !file) {
            return next(ApiError.badRequest('Необходимы все поля: name, folderId и файл'));
        }

        try {
            const folder = await Folder.findOne({ where: { id: folderId } });
            if (!folder) {
                return next(ApiError.notFound('Папка не найдена'));
            }
            if(folder.userId!=userId)
            {
                return next(ApiError.badRequest('Нет доступа к данной папке'));
            }
            const newFile = await File.create({
                name,
                filepath: file.path,
                folderId,
            });

            res.status(201).json(newFile);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async deleteFile(req, res, next) {
        const { id } = req.params;
        const userId = req.user.id;
        try {
            const file = await File.findByPk(id);
            if (!file) {
                return next(ApiError.notFound('Файл не найден'));
            }
            const folder = await Folder.findByPk(file.folderId);
            if (!folder || folder.userId !== userId) {
                return next(ApiError.forbidden('Нет доступа к данному файлу'));
            }
            const filePath = path.resolve(__dirname, '..', file.filepath);

            fs.unlinkSync(filePath);

            await file.destroy();

            res.json({ message: 'Файл успешно удален' });
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

}
module.exports = new FileController()