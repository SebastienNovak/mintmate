// VirtualVenue.js
module.exports = (sequelize, DataTypes) => {
    const VirtualVenue = sequelize.define('VirtualVenue', {
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        capacity: DataTypes.INTEGER,
        virtualLink: DataTypes.STRING
    });

    return VirtualVenue;
};
