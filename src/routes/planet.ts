import { Router } from "express";

import {
  createPlanets,
  deletePlanet,
  getAllPlanets,
  getPlanet,
  updatePlanet,
} from "../controllers/planet";

const router = Router();

router.post("/api/planets", createPlanets);

router.get("/api/planets", getAllPlanets);

router.get("/api/planets/:id", getPlanet);

router.delete("/api/planets/:id", deletePlanet);
router.put("/api/planets/:id", updatePlanet);

export default router;
