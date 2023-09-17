module.exports = (sequelize, DataTypes) => {
    const ArtistBlog = sequelize.define('ArtistBlog', {
        userId: DataTypes.INTEGER,  
        title: DataTypes.STRING,
        content: DataTypes.TEXT,
        imageUrl: DataTypes.STRING,
        publishedAt: DataTypes.DATE
    });

    return ArtistBlog;
};
