// Label.js
module.exports = (sequelize, DataTypes) => {
    const Label = sequelize.define('Label', {
        name: DataTypes.STRING,
        description: DataTypes.TEXT
    });

    Label.associate = (models) => {
        Label.hasMany(models.User, {
            foreignKey: 'labelId',
            as: 'artists'
        });
    };

    return Label;
};
