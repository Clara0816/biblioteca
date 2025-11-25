export interface EmprestimoDTO {
    idEmprestimo? : number,
    idAluno: number;
    idLivro: number;
    dataEmprestimo: string;
    dataDevolucao: string;
    statusEmprestimo: string;
    situacao?: boolean
}