module.exports = (sequelize, DataTypes) => {
    const VirtualInstrument = sequelize.define('VirtualInstrument', {
        name: DataTypes.STRING,
        soundSampleUrl: DataTypes.STRING,
        price: DataTypes.FLOAT
    });

    return VirtualInstrument;
};
