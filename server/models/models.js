const sequelize = require('../config/db.config')
const {DataTypes} = require('sequelize')

// Сотрудники+
const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique:true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, defaultValue: "User" },
  fio: { type: DataTypes.STRING },
  date: { type: DataTypes.DATE },
  phone: { type: DataTypes.STRING, length: 11 },
  addres: { type: DataTypes.STRING }
})

// Покупатели+
const Client = sequelize.define('Client', {
  fio: { type: DataTypes.STRING },
  date: { type: DataTypes.DATE },
  phone: { type: DataTypes.STRING, unique:true, length: 11 },
})

// Покупка
const Purchase = sequelize.define('purchase', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  // orderId: { type: DataTypes.INTEGER },
  // userId: { type: DataTypes.INTEGER },
  price: { type: DataTypes.INTEGER, allowNull: false },
})

// Заказ
const Order = sequelize.define('order', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  // productId: { type: DataTypes.INTEGER },
  productCount: { type: DataTypes.INTEGER, allowNull: false},
  price: { type: DataTypes.INTEGER, allowNull: false}
})

// Товар
const Product = sequelize.define('product', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  // categoryId: { type: DataTypes.INTEGER, unique:true },
  name: { type: DataTypes.STRING, unique:true, allowNull: false },
  count: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  price: { type: DataTypes.INTEGER, allowNull: false },
  total: { type: DataTypes.INTEGER, allowNull: false },
})

// Поставка
const Supply = sequelize.define('supply', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  count: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  price: { type: DataTypes.INTEGER, allowNull: false },
  date: { type: DataTypes.DATE, allowNull: false},
})

// Поставщик
const Provider = sequelize.define('provider', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique:true, allowNull: false },
  phone: { type: DataTypes.STRING, unique:true },
  email: { type: DataTypes.STRING, unique:true },
})

// Категория
const Сategory = sequelize.define('category', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique:true, allowNull: false },
})


Purchase.hasMany(User)
User.belongsTo(Purchase)

Purchase.hasMany(Order)
Order.belongsTo(Purchase)

Order.hasOne(Product)
Product.belongsTo(Order)

//

Supply.hasMany(Product)
Product.belongsTo(Supply)

Сategory.hasMany(Product)
Product.belongsTo(Сategory)

Provider.hasOne(Supply)
Supply.belongsTo(Provider)
Supply.hasOne(User)
User.belongsTo(Supply)

module.exports = {
  User,
  Purchase,
  Order,
  Product,
  Supply,
  Provider,
  Сategory,
  Client,
}


