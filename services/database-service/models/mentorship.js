module.exports = (sequelize, DataTypes) => {
    const Mentorship = sequelize.define('Mentorship', {
        artistId: DataTypes.INTEGER,
        menteeId: DataTypes.INTEGER,
        startDate: DataTypes.DATE,
        endDate: DataTypes.DATE,
        topics: DataTypes.ARRAY(DataTypes.STRING)
    });

    return Mentorship;
};
