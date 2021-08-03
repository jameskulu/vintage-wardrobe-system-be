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

        Item.hasMany(models.Wishlist, {
            onDelete: 'cascade',
            foreignKey: 'itemId',
            as: 'wishlist',
        })

        Item.hasMany(models.Review, {
            onDelete: 'cascade',
            foreignKey: 'itemId',
            as: 'review',
        })

        Item.hasMany(models.ItemReview, {
            onDelete: 'cascade',
            foreignKey: 'itemId',
            as: 'itemReview',
        })

        Item.hasMany(models.Comment, {
            onDelete: 'cascade',
            foreignKey: 'itemId',
            as: 'comment',
        })
    }

    return Item
}
