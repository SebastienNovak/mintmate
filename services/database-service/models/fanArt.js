module.exports = (sequelize, DataTypes) => {
    const FanArt = sequelize.define('FanArt', {
        title: DataTypes.STRING,
        imageUrl: DataTypes.STRING,
        description: DataTypes.TEXT
    });

    return FanArt;
};
