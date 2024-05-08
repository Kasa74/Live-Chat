const sequelize = require("../db")
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"} 
})

const Basket = sequelize.define('basket' , {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    user_id: {type: DataTypes.INTEGER, primaryKey: true},
})

const BasketItem = sequelize.define('basket_item' , {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    item_id: {type: DataTypes.INTEGER, primaryKey: true},
    basket_id: {type: DataTypes.INTEGER, primaryKey: true},
})

const Item = sequelize.define('item' , {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
    type_id: {type: DataTypes.INTEGER, allowNull: false},
    brand_id: {type: DataTypes.INTEGER, allowNull: false},
    color_id: {type: DataTypes.INTEGER, allowNull: false}
})

const ItemInfo = sequelize.define('item_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    descrption: {type: DataTypes.STRING, allowNull: false},
    item_id:{type: DataTypes.STRING, primaryKey: true}
})

const Type = sequelize.define('type',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Brand = sequelize.define('brand',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Color = sequelize.define('color',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Messages = sequelize.define('messages',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    from_hex: {type: DataTypes.STRING, allowNull: false},
    to_hex: {type: DataTypes.STRING, allowNull: false},
    message: {type: DataTypes.STRING, allowNull: false},
})

User.hasOne(Basket)
Basket.belongsTo(User)


Basket.hasMany(BasketItem)
BasketItem.belongsTo(Basket)

Item.hasMany(ItemInfo, {as: 'info'})
ItemInfo.belongsTo(Item)

Item.hasMany(BasketItem)
BasketItem.belongsTo(Item)

Item.hasMany(ItemInfo)
ItemInfo.belongsTo(Item)

Item.hasOne(Brand)
Brand.hasMany(Item)

Item.hasOne(Type)
Type.hasMany(Item)

Item.hasOne(Color)
Color.hasMany(Item)

// Type.hasMany(Brand)
// Brand.belongsToMany(Type)

// Brand.hasMany(Color)
// Color.belongsToMany(Brand)

module.exports= {
    User, 
    Basket,
    BasketItem,
    Item,
    ItemInfo,
    Type,
    Brand,
    Color,
    Messages,
}
