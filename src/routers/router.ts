import { Router } from "express";
const router = Router();

// File router
import fileRouter from "./file.router";
router.use("/files", fileRouter);

export default router;
