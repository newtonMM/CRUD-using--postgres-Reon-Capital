import sequelize from "../config/sequelize";
import { Planet } from "../models/planet";
import axios from "axios";
import { Request, Response, NextFunction } from "express";

const sequelizeReady = sequelize.sync({ alter: true });

export const createPlanets = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await sequelizeReady;
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
    const response = await axios.post(
      "https://swapi-graphql.netlify.app/.netlify/functions/index",
      {
        query: GET_PLANETS_QUERY,
      }
    );
    const planets = response.data.data.allPlanets.planets;

    await sequelize.sync();

    for (const planet of planets) {
      const { name, population, terrains, climates } = planet;

      await Planet.create({
        name,
        population: population ? parseInt(population, 10) : null,
        terrains,
        climates,
      });
    }

    res.status(200).json({ message: "planets saved successfully" });
  } catch (error) {
    console.log("this is the error", error);
    res.status(500).json({ message: "internal server error" });
  }
};

export const updatePlanet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { name, population, terrains, climates } = req.body;

    const planet = await Planet.findByPk(id);

    if (!planet) {
      return res.status(404).json({ message: "Planet not found" });
    }

    planet.name = name || planet.name;
    planet.population =
      population !== undefined ? population : planet.population;
    planet.terrains = terrains || planet.terrains;
    planet.climates = climates || planet.climates;

    await planet.save();

    return res.status(200).json(planet);
  } catch (error) {
    console.log("this is the error", error);
    res.status(500).json({ message: "internal server error" });
  }
};

export const getAllPlanets = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const planets = await Planet.findAll();
    return res.status(200).json(planets);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

export const getPlanet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const planet = await Planet.findByPk(id);

    if (!planet) {
      return res.status(404).json({ message: "Planet not found" });
    }

    return res.status(200).json(planet);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

export const deletePlanet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const planet = await Planet.findByPk(id);

    if (!planet) {
      return res.status(404).json({ message: "Planet not found" });
    }

    await planet.destroy();

    return res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "could not delete" });
  }
};
