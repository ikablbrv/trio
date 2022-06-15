const ApiError = require('../error/ApiError');
const {Product} = require('../models/models');
const {Сategory} = require('../models/models')

class ProductController {
  async create(req, res, next) {
    try {
      let { name, category, count, price} = req.body
      let categoryId = null;
      if (category) {
        categoryId = await Сategory.findOrCreate({
          where: { name: category },
          name: category,
        })
      }
      const total = price * count;
      const products = await Product.create({
        name,
        count,
        price,
        total,
        category,
        categoryId: categoryId[0].dataValues.id});
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
      
      let products = await Product.update(
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
      const result = await Product.destroy({where: { id: id }})
      return res.json(result)
    } catch(e) {
      console.error(e);
      next(ApiError.badRequest(e.message))
    }
  }
  async getAll(req, res) {
    //Параметры
    let {limit, page} = req.query
    page = page || 1
    limit = limit || 10
    let offset = page * limit - limit
    //Запросы
    let products;
    let category;

    category = await Сategory.findAndCountAll({offset})
    products = await Product.findAndCountAll({offset})

    let data = {
      products,
      category
    }
    return res.json(data)
  }

  async getCategory(req, res, next) {
    try {
      const category = await Сategory.findAll()
      let data = category
      return res.json(data)
    } catch(e) {
      console.error(e);
      next(ApiError.badRequest(e.message))
    }
  }
} 

module.exports = new ProductController()
