module.exports = (sequelize, DataTypes) => {
    const SoundPacks = sequelize.define('SoundPacks', {
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        price: DataTypes.FLOAT,
        sampleUrls: DataTypes.ARRAY(DataTypes.STRING)
    });

    return SoundPacks;
};
