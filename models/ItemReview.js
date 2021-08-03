module.exports = (sequelize, DataTypes) => {
    const ItemReview = sequelize.define('ItemReview', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        isReviewed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    })

    ItemReview.associate = (models) => {
        ItemReview.belongsTo(models.User, {
            onDelete: 'cascade',
            foreignKey: 'userId',
            as: 'user',
        })
        ItemReview.belongsTo(models.Item, {
            onDelete: 'cascade',
            foreignKey: 'itemId',
            as: 'item',
        })
    }

    return ItemReview
}
