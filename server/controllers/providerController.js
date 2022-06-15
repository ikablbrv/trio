const ApiError = require('../error/ApiError');
const {Provider} = require('../models/models');

class ProductController {
  async create(req, res, next) {
    try {
      let { name, phone, email } = req.body

      const provider = await Provider.create({
        name,
        phone,
        email,
      });

      return res.json(provider)
    } catch (e) {
        console.error(e);
        next(ApiError.badRequest(e.message))
    }
  }
  async delete(req, res, next) {
    try {
      let { id } = req.body
      const result = await Provider.destroy({where: { id: id }})
      return res.json(result)
    } catch(e) {
      console.error(e);
      next(ApiError.badRequest(e.message))
    }
  }
  async edit(req, res, next) {
    try {
      let { id, name, phone, email } = req.body
      await Provider.update({
        name,
        phone,
        email,
      },
      {
        where: { id: id }
      })
      const result = await Provider.findOne({ where: { id: id } })
      return res.json(result)
    } catch(e) {
      console.error(e);
      next(ApiError.badRequest(e.message))
    }
  }
  
  async getAll (req, res) {
    //Параметры
    let {limit, page} = req.query
    page = page || 1
    limit = limit || 10
    let offset = page * limit - limit

    const provider = await Provider.findAndCountAll()

    return res.json(provider)
  }

  async getOne (req, res, next) {
    let {brandId, typeId, limit, page} = req.query
    page = page || 1
    limit = limit || 9
    let offset = page * limit - limit
    let devices;
    if (!brandId && !typeId) {
        devices = await devices.findAndCountAll({limit, offset})
    }
    if (brandId && !typeId) {
        devices = await devices.findAndCountAll({where:{brandId}, limit, offset})
    }
    if (!brandId && typeId) {
        devices = await devices.findAndCountAll({where:{typeId}, limit, offset})
    }
    if (brandId && typeId) {
        devices = await devices.findAndCountAll({where:{typeId, brandId}, limit, offset})
    }
    return res.json(devices)
  }

} 

module.exports = new ProductController()
