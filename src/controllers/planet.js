"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePlanet = exports.getPlanet = exports.getAllPlanets = exports.updatePlanet = exports.createPlanets = void 0;
const sequelize_1 = __importDefault(require("../config/sequelize"));
const planet_1 = require("../models/planet");
const axios_1 = __importDefault(require("axios"));
const sequelizeReady = sequelize_1.default.sync({ alter: true });
const createPlanets = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelizeReady;
        const GET_PLANETS_QUERY = `
    query {
      allPlanets {
        planets {
          name
          population
          terrains
          climates
        }
      }
    }
  `;
        const response = yield axios_1.default.post("https://swapi-graphql.netlify.app/.netlify/functions/index", {
            query: GET_PLANETS_QUERY,
        });
        const planets = response.data.data.allPlanets.planets;
        yield sequelize_1.default.sync();
        for (const planet of planets) {
            const { name, population, terrains, climates } = planet;
            yield planet_1.Planet.create({
                name,
                population: population ? parseInt(population, 10) : null,
                terrains,
                climates,
            });
        }
        res.status(200).json({ message: "planets saved successfully" });
    }
    catch (error) {
        console.log("this is the error", error);
        res.status(500).json({ message: "internal server error" });
    }
});
exports.createPlanets = createPlanets;
const updatePlanet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, population, terrains, climates } = req.body;
        const planet = yield planet_1.Planet.findByPk(id);
        if (!planet) {
            return res.status(404).json({ message: "Planet not found" });
        }
        planet.name = name || planet.name;
        planet.population =
            population !== undefined ? population : planet.population;
        planet.terrains = terrains || planet.terrains;
        planet.climates = climates || planet.climates;
        yield planet.save();
        return res.status(200).json(planet);
    }
    catch (error) {
        console.log("this is the error", error);
        res.status(500).json({ message: "internal server error" });
    }
});
exports.updatePlanet = updatePlanet;
const getAllPlanets = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const planets = yield planet_1.Planet.findAll();
        return res.status(200).json(planets);
    }
    catch (error) {
        res.status(500).json({ message: "internal server error" });
    }
});
exports.getAllPlanets = getAllPlanets;
const getPlanet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const planet = yield planet_1.Planet.findByPk(id);
        if (!planet) {
            return res.status(404).json({ message: "Planet not found" });
        }
        return res.status(200).json(planet);
    }
    catch (error) {
        res.status(500).json({ message: "internal server error" });
    }
});
exports.getPlanet = getPlanet;
const deletePlanet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const planet = yield planet_1.Planet.findByPk(id);
        if (!planet) {
            return res.status(404).json({ message: "Planet not found" });
        }
        yield planet.destroy();
        return res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ message: "could not delete" });
    }
});
exports.deletePlanet = deletePlanet;
