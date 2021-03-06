const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('ct_phieumua', {
        MAPM: {
            type: DataTypes.STRING(20),
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'phieumua',
                key: 'MAPM'
            }
        },
        MASACH: {
            type: DataTypes.STRING(6),
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'sach',
                key: 'masach'
            }
        },
        SL: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        sequelize,
        tableName: 'ct_phieumua',
        hasTrigger: true,
        timestamps: false,
        indexes: [{
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "MAPM" },
                    { name: "MASACH" },
                ]
            },
            {
                name: "ct_phieumua_MASACH_MAPM_unique",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "MAPM" },
                    { name: "MASACH" },
                ]
            },
            {
                name: "FK_CTPMUA_SACH",
                using: "BTREE",
                fields: [
                    { name: "MASACH" },
                ]
            },
        ]
    });
};