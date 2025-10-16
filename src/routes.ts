import {Router} from "express";// Importa o módulo Router do express
import type {Request, Response} from "express";// Importa os módulos de requição e

const router = Router();

router.get("/api", (req: Request, res: Response) => {
   res.status(200).json({mensagem: "Olá, seja bem-vindo"})
});
export {router};