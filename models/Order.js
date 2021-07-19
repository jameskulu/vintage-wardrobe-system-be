module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        endDate: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        totalPrice: {
            type: DataTypes.DOUBLE(10, 2),
            defaultValue: 0.0,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM(
                'pending',
                'approved',
                'refused',
                'delivered',
                'received'
            ),
            defaultValue: 'pending',
        },
    })

    Order.associate = (models) => {
        Order.belongsTo(models.User, {
            onDelete: 'cascade',
            foreignKey: 'userId',
            as: 'user',
        })
        Order.belongsTo(models.Item, {
            onDelete: 'cascade',
            foreignKey: 'itemId',
            as: 'item',
        })
    }

    return Order
}
