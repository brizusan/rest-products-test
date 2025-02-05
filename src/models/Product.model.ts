import { Model, Column, Table, DataType, Default } from "sequelize-typescript"

@Table({
  tableName: "products",
  timestamps: false,
})

class Product extends Model<Product> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
  })
  declare price: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare stock: number;

  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
  })
  declare availability: boolean;
 
}

export default Product;


