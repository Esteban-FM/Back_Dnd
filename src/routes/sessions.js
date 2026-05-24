import { Router } from "express";
const router = Router();

router.get("/ping", (req, res) => {
  res.json({ message: "sessions ok" });
});

export default router;