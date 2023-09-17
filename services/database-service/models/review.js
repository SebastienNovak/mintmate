module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define('Review', {
        content: {
            type: DataTypes.TEXT,
            allowNull: true // assuming content can be null, adjust as per requirements
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM('album', 'track', 'artist'),
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: 'id'
            },
            allowNull: false
        },
        trackId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Tracks',
                key: 'id'
            },
            allowNull: true
        },
        albumId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Albums',
                key: 'id'
            },
            allowNull: true
        }
    });

    Review.associate = (models) => {
        Review.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'reviewer'
        });
        Review.belongsTo(models.Track, {
            foreignKey: 'trackId',
            as: 'track'
        });
        Review.belongsTo(models.Album, {
            foreignKey: 'albumId',
            as: 'album'
        });
    };

    return Review;
};
