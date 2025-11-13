export interface AlunoDTO {
    idAluno? : number,
    nome: string;
    ra: number;
    sobrenome: string;
    dataNascimento: Date;
    endereco: string;
    email: string;
    celular: number;
    situacao?: boolean
}