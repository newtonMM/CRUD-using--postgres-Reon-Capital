import { Model, DataTypes, Optional, Sequelize } from "sequelize";

interface PlanetAttributes {
  id: number;
  name: string;
  population: number | null;
  terrains: string[];
  climates: string[];
}

interface PlanetCreationAttributes extends Optional<PlanetAttributes, "id"> {}

class Planet
  extends Model<PlanetAttributes, PlanetCreationAttributes>
  implements PlanetAttributes
{
  public id!: number;
  public name!: string;
  public population!: number | null;
  public terrains!: string[];
  public climates!: string[];
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function initPlanetModel(sequelize: Sequelize): typeof Planet {
  Planet.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      population: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      terrains: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: [],
      },
      climates: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: [],
      },
    },
    {
      sequelize,
      tableName: "planets",
      timestamps: true,
    }
  );

  return Planet;
}

export { Planet };
