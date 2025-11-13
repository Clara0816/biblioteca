export interface LivroDTO {
    idLivro? : number,
    titulo: string;
    editora: string;
    autor: string;
    anoPublicacao: number;
    isbn: number;
    quantidadeTotal: number;
    quantidadeDisponivel: number;
    valorAquisicao: number;
    statusLivroEmprestado: string;
    situacao?: boolean
}
