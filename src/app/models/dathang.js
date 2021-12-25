const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('dathang', {
    iddathang: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    makh: {
      type: DataTypes.STRING(6),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'khachhang',
        key: 'MAKH'
      }
    },
    masach: {
      type: DataTypes.STRING(6),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'sach',
        key: 'masach'
      }
    },
    SOLUONG: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    THOIGIAN: {
      type: DataTypes.DATE,
      allowNull: true
    },
    TRANGTHAI: {
      type: DataTypes.STRING(10),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'dathang',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "makh" },
          { name: "iddathang" },
          { name: "masach" },
        ]
      },
      {
        name: "MAKH",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "makh" },
          { name: "masach" },
        ]
      },
      {
        name: "dathang_sach_masach_fk",
        using: "BTREE",
        fields: [
          { name: "masach" },
        ]
      },
    ]
  });
};
