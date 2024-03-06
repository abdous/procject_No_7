

module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('comment', {
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        postId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    })
    return Comment
}
