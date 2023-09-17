module.exports = (sequelize, DataTypes) => {
    const ArtistEndorsements = sequelize.define('ArtistEndorsements', {
        brandName: DataTypes.STRING,
        product: DataTypes.STRING,
        description: DataTypes.TEXT,
        endorsementDate: DataTypes.DATE
    });

    return ArtistEndorsements;
};
