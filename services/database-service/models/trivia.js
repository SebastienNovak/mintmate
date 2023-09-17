module.exports = (sequelize, DataTypes) => {
    const Trivia = sequelize.define('Trivia', {
        question: DataTypes.STRING,
        options: DataTypes.ARRAY(DataTypes.STRING),
        correctOption: DataTypes.INTEGER
    });

    return Trivia;
};
