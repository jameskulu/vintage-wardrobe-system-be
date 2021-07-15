module.exports = (sequelize, DataTypes) => {
    const ItemImage = sequelize.define('ItemImage', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        imageURL: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cloudinaryId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    })

    ItemImage.associate = (models) => {
        ItemImage.belongsTo(models.Item, {
            onDelete: 'cascade',
            foreignKey: 'itemId',
            as: 'images',
        })
    }

    return ItemImage
}
