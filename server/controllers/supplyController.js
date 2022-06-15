const ApiError = require('../error/ApiError');
const {Product} = require('../models/models');
const {Сategory} = require('../models/models');
const {Supply} = require('../models/models');
const {User} = require('../models/models');
const {Provider} = require('../models/models');

const { Op } = require('sequelize')

class SupplyController {
  async create(req, res, next) {

    let categoryId = null;
    let userId = null;
    let providerId = null;
    let { name, category, date, count, price, user, provider, total} = req.body
    try {
      if (category) {
        categoryId = await Сategory.findOrCreate({ where: { name: category } })
      }
      if (user) {
        userId = await User.findOne({ where: { name: email } })
      }
      if (provider) {
        providerId = await Provider.findOne({ where: { name: provider } })
      }
    } catch (e) {
      console.error(e);
      next(ApiError.badRequest(e.message))
    }

    // try {
    //   const products = await Product.findOrCreate({
    //     where: { name: name },
    //     name,
    //     count,
    //     price,
    //     total,
    //     providerId,
    //     categoryId,
    //   });
    // } catch (e) {
    //     console.error(e);
    //     next(ApiError.badRequest(e.message))
    // }

    try {
      const supply = await Supply.create({
        name,
        categoryId,
        count,
        price,
        userId,
        date,
        providerId: providerId.dataValues.id,
      })
      return res.json(supply)
    } catch (e) {
      console.error(e);
      next(ApiError.badRequest(e.message))
    }
  }
  async update(req, res, next) {
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
  async getOtchet(req, res) {
    try {
      let { dateStart, dateEnd } = req.body
      const result = await Supply.findAll({
        where: {
          date: {
            [Op.gte]: dateStart,
            [Op.lte]: dateEnd,
          }
        }
      })
      return res.json(result);
    } catch(e) {
      console.error(e);
      next(ApiError.badRequest(e.message))
    }
  }
} 

module.exports = new SupplyController()
