const ApiError = require('../error/ApiError');
const {Product} = require('../models/models');
const {Сategory} = require('../models/models');
const {Supply} = require('../models/models');
const {User} = require('../models/models');
const {Provider} = require('../models/models');
const sequelize = require('../config/db.config')

class SupplyController {
  async create(req, res, next) {

    let categoryId = null;
    let userId = null;
    let providerId = null;
    let { name, category, date, count, price, user, provider} = req.body
    try {
      if (category) {
        categoryId = await Сategory.findOrCreate({ where: { name: category } })
      }
      if (user) {
        userId = await User.findOne({ where: { name: email } })
      }
      if (provider) {
        providerId = await Provider.findOne({ where: { name: name } })
      }
    } catch (e) {
      console.error(e);
      next(ApiError.badRequest(e.message))
    }

    try {
      const total = price * count;
      const products = await Product.findOrCreate({
         where: { name: name },
        name,
        categoryId,
        count: count,
        price: price,
        total: total,
        userId,
        providerId,
        });
    } catch (e) {
        console.error(e);
        next(ApiError.badRequest(e.message))
    }

    try {
      const supply = await Supply.create({
        name,
        categoryId,
        count,
        price,
        userId,
        date,
        providerId,
      })
      return res.json(supply)
    } catch (e) {
      console.error(e);
      next(ApiError.badRequest(e.message))
    }
  }
  async update(req, res, next) {
    try {
      let { id, name, category, count, price} = req.body

      let categoryId = null;
      if (category) {
        categoryId = await Сategory.findOrCreate({
          where: { name: category },
          name: category,
        })
      }
      const total = price * count;
      
      let products = await Supply.update(
      {
        name,
        count,
        price,
        total,
        category,
        categoryId: categoryId[0].dataValues.id
      },
      {
        where: { id: id } 
      });
      products = await Product.findOne({ where: { id: id } });
      let data = {
        products,
        category
      }
      return res.json(data)
    } catch (e) {
        console.error(e);
        next(ApiError.badRequest(e.message))
    }
  }
  async delete(req, res, next) {
    try {
      let { id } = req.body
      const result = await Supply.destroy({where: { id: id }})
      return res.json(result)
    } catch(e) {
      console.error(e);
      next(ApiError.badRequest(e.message))
    }
  }
  async getAll(req, res) {
    const supply = await Supply.findAll()
    return res.json(supply)
  }
} 

module.exports = new SupplyController()
