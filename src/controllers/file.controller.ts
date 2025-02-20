import { Request, Response } from "express";
import { fileService } from "../services/file.service";

class FileController {
  async getFileInfo(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await fileService.getFileInfo(id);
      res.status(result.status).json(result.data);
    } catch (error) {
      console.error(error);
      res.status(501).json({ message: "Server error" });
    }
  }
}

export const fileController = new FileController();
