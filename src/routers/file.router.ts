import { Router } from "express";
import { fileController } from "../controllers/file.controller";
const router = Router();

router.get("/:id", fileController.getFileInfo);

export default router;
