const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/models')
const {Client} = require('../models/models')

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
  async registration (req, res, next) {
    const { role } = req.query
    const {email, password} = req.body
    if (!email || !password) {
        return next(ApiError.badRequest('Некорректный email или password'))
    }
    const candidate = await User.findOne({where: {email}})
    if (candidate) {
        return next(ApiError.badRequest('Пользователь с таким email уже существует'))
    }
    const hashPassword = await bcrypt.hash(password, 5)
    const user = await User.create({email, role, password: hashPassword})
    const token = generateJwt(user.id, user.email)
    return res.json({token})
  }

  async login (req, res, next) {
    const {email, password} = req.body
    const user = await User.findOne({where: {email}})
    if (!user) {
        return next(ApiError.internal('Пользователь не найден'))
    }
    let comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) {
        return next(ApiError.internal('Указан неверный пароль'))
    }
    const token = generateJwt(user.id, user.email)

    return res.json({token})
  }

  async check(req, res) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role)
    return res.json({token})
  }

  async createStaff (req, res, next) {
    const {email, password, fio, role, date, phone, addres} = req.body
    if (!email || !password) {
        return next(ApiError.badRequest('Некорректный email или password'))
    }
    const candidate = await User.findOne({where: {email}})
    if (candidate) {
        return next(ApiError.badRequest('Пользователь с таким email уже существует'))
    }
    const hashPassword = await bcrypt.hash(password, 5)
    const user = await User.create({email, role, fio, date, phone, addres, password: hashPassword})

    return res.json(user)
  }

  async updateStaff (req, res, next) {
    try {
      const {id, email, password, fio, role, date, phone, addres} = req.body
      if (!email || !password) {
          return next(ApiError.badRequest('Некорректный email или password'))
      }
      const hashPassword = await bcrypt.hash(password, 5)
      const candidate = await User.update({
        email,
        fio,
        role,
        date,
        phone,
        addres,
        password: hashPassword,
      },
      {
        where: { id: id }
      })

      const user = await User.findOne({ where: { id: id } })
    
      return res.json(user)
    } catch(e) {
      console.error(e);
      next(ApiError.badRequest(e.message))
    }
  }
  async deleteStaff (req, res, next) {
    try {
      const { id } = req.body
      console.log(req.body);
      const user = await User.destroy({ where: { id: id } })

      return res.json(user)
    } catch(e) {
      console.error(e);
      next(ApiError.badRequest(e.message))
    }
  }

  async createClient(req, res) {
    const {fio, date, phone} = req.body
    const user = await Client.create({fio, date, phone})
  
    return res.json(user)
  }
  async updateClient(req, res) {
    const { id, fio, date, phone } = req.body
    const candidate = await Client.update({
      fio,
      date,
      phone
    },
    {
      where: { id: id }
    })
    
    const user = await Client.findOne({ where: { id: id } })
    return res.json(user)
  }

  async deleteClient(req, res) {
    const { id } = req.body
    const user = await Client.destroy({ where: { id: id } })
  
    return res.json(user)
  }
  async getStaff (req, res) {
    //Параметры
    let { role } = req.query
    const staff = await User.findAll({where:{role}})

    return res.json(staff)
  }

  async getUsers (req, res) {
    const client = await Client.findAndCountAll()

    return res.json(client)
  }
} 

module.exports = new UserController()
