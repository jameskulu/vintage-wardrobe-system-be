module.exports = (sequelize, DataTypes) => {
    const Item = sequelize.define('Item', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.DOUBLE(10, 2),
            defaultValue: 0.0,
            allowNull: false,
        },
        size: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        imageURL: {
            type: DataTypes.STRING,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        isAvailable: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    })

    Item.associate = (models) => {
        Item.belongsTo(models.User, {
            onDelete: 'cascade',
            foreignKey: 'userId',
            as: 'user',
        })

        Item.belongsTo(models.SubCategory, {
            onDelete: 'cascade',
            foreignKey: 'subCategoryId',
            as: 'subCategory',
        })

        Item.hasMany(models.Order, {
            onDelete: 'cascade',
            foreignKey: 'itemId',
            as: 'item',
        })

        Item.hasMany(models.ItemImage, {
            onDelete: 'cascade',
            foreignKey: 'itemId',
            as: 'images',
        })
    }

    return Item
}
