module.exports = (sequelize, DataTypes) => {
    const VirtualStudioSessions = sequelize.define('VirtualStudioSessions', {
        artistId: DataTypes.INTEGER,
        date: DataTypes.DATE,
        duration: DataTypes.INTEGER, // in minutes
        virtualLink: DataTypes.STRING
    });

    return VirtualStudioSessions;
};
