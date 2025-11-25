import { Router } from "express";// Importa o módulo Router do express
import type { Request, Response } from "express";// Importa os módulos de requição e
import AlunoController from "./controller/AlunoController.js";
import LivroController from "./controller/LivroController.js";
import EmprestimoController from "./controller/EmprestimoController.js";


const router = Router();

router.get("/api", (req: Request, res: Response) => {
   res.status(200).json({ mensagem: "Olá, seja bem-vindo" })
});

router.get("/api/aluno", AlunoController.todos);
router.get("/api/livro", LivroController.todos);
router.get("/api/emprestimo", EmprestimoController.todos);

router.post("/api/aluno", AlunoController.novo);
router.post("/api/livro", LivroController.novo);
router.post("/api/emprestimo", EmprestimoController.novo);


router.get("/api/aluno/:idAluno", AlunoController.aluno);


export { router };