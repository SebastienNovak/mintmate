// VirtualGoods.js
module.exports = (sequelize, DataTypes) => {
    const VirtualGoods = sequelize.define('VirtualGoods', {
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        price: DataTypes.FLOAT,
        type: DataTypes.ENUM('avatar_outfit', 'concert_prop') 
    });

    return VirtualGoods;
};
