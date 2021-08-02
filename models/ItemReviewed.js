module.exports = (sequelize, DataTypes) => {
    const ItemReviewed = sequelize.define('ItemReviewed', {
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

    ItemReviewed.associate = (models) => {
        ItemReviewed.belongsTo(models.User, {
            onDelete: 'cascade',
            foreignKey: 'userId',
            as: 'user',
        })
        ItemReviewed.belongsTo(models.Item, {
            onDelete: 'cascade',
            foreignKey: 'itemId',
            as: 'item',
        })
    }

    return ItemReviewed
}
