import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  rollDice,
  rollBodyPart,
  rollTrap,
  rollGold,
  rollItem,
} from "../controllers/diceController.js";

const router = Router();

// Todas las rutas requieren autenticación
router.use(verifyToken);

router.post("/roll", rollDice);
router.get("/body-part", rollBodyPart);
router.get("/trap", rollTrap);
router.get("/gold", rollGold);
router.get("/item", rollItem);

export default router;