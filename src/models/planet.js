"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Planet = void 0;
exports.initPlanetModel = initPlanetModel;
const sequelize_1 = require("sequelize");
class Planet extends sequelize_1.Model {
}
exports.Planet = Planet;
function initPlanetModel(sequelize) {
    Planet.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        population: {
            type: sequelize_1.DataTypes.BIGINT,
            allowNull: true,
        },
        terrains: {
            type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
            allowNull: false,
            defaultValue: [],
        },
        climates: {
            type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
            allowNull: false,
            defaultValue: [],
        },
    }, {
        sequelize,
        tableName: "planets",
        timestamps: true,
    });
    return Planet;
}
