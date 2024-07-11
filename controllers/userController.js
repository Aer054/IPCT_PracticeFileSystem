const ApiError=require("../error/ApiError")
const bcrypt = require('bcrypt')
const User=require('../models/user')
const Folder=require('../models/folder')
const jwt=require('jsonwebtoken')

const generateJWT = (username,id) => {
    const accessToken = jwt.sign(
        { username,id },
        process.env.SECRET_KEY,
        { expiresIn: '60m', algorithm: 'HS256' }
    );
    
    const refreshToken = jwt.sign(
        { username,id },
        process.env.REFRESH_SECRET_KEY,
        { expiresIn: '7d', algorithm: 'HS256' }
    );

    return { accessToken, refreshToken };
}


class UserController{
  async registration(req, res, next) {
        const { username, password } = req.body;
        
        if (!username ||!password) {
          return next(ApiError.badRequest('Некорректные данные'));
        }
        try {
        const candidate = await User.findOne({ where: { username } });
        if (candidate) {
          return next(ApiError.badRequest('Пользователь с таким никнеймом уже существует'));
        }
    
        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({
          username,
          password: hashPassword
        });
        await Folder.create({ name: 'root', userId: user.id });
        const tokens = generateJWT(user.username, user.id)
    
        return res.json({ tokens });
    
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            return next(ApiError.badRequest(error.errors.map(e => e.message).join('. ')));
        }
        return next(ApiError.internal(error.message));
    }
    }

    async login(req,res,next){
        const{username,password}=req.body
        const user = await User.findOne({where:{username}})
        if(!user){
            return next(ApiError.internal('Пользователь не найден'))
        }
        const comparePaswword=bcrypt.compareSync(password,user.password)
        if(!comparePaswword){
            return next(ApiError.internal('Указан не верный пароль'))
        }
        const tokens =generateJWT(user.username,user.id)
        return res.json({ tokens });
    }

    async check(req,res){
        const tokens = generateJWT(req.user.username,req.user.id)
        return res.json({ tokens });
    }
    
    
}

module.exports = new UserController()