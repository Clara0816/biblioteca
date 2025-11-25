import { DatabaseModel } from "./DatabaseModel.js";
import type { EmprestimoDTO } from "../interface/EmprestimoDTO.js";
const database = new DatabaseModel().pool;



class Emprestimo {
    private idEmprestimo: number = 0;
    private idAluno: number;
    private idLivro: number;
    private dataEmprestimo: Date;
    private dataDevolucao: Date;
    private statusEmprestimo: string;


    constructor(
        _idAluno: number,
        _idLivro: number,
        _dataEmpretimo: Date,
        _dataDevolucao: Date,
        _statusEmprestimo: string

    ) {
        this.idAluno = _idAluno;
        this.idLivro = _idLivro;
        this.dataEmprestimo = _dataEmpretimo;
        this.dataDevolucao = _dataDevolucao;
        this.statusEmprestimo = _statusEmprestimo;
    }
    public getIdEmprestimo(): number {
        return this.idEmprestimo;
    }

    public setIdEmpretimo(_idEmprestimo: number): void {
        this.idEmprestimo = _idEmprestimo;
    }

    public getIdAluno(): number {
        return this.idAluno;
    }

    public setIdAluno(_idAluno: number): void {
        this.idAluno = _idAluno;
    }

    public getidLivro(): number {
        return this.idLivro;
    }

    public setIdLivro(_idLivro: number): void {
        this.idLivro = _idLivro;
    }

    public getDataEmprestimo(): Date {
        return this.dataEmprestimo;
    }

    public setDataEmprestimo(_dataEmprestimo: Date): void {
        this.dataEmprestimo = _dataEmprestimo;
    }

    public getDataDevolucao(): Date {
        return this.dataDevolucao;
    }

    public setDataDevolucao(_dataDevolucao: Date): void {
        this.dataDevolucao = _dataDevolucao;
    }

    public getStatusEmprestimo(): string {
        return this.statusEmprestimo;
    }

    public setStatusEmprestimo(_statusEmprestimo: string): void {
        this.statusEmprestimo = _statusEmprestimo;
    }

    static async listarEmprestimo(idEmprestimo: number): Promise<Emprestimo | null> {
        try {
            const querySelectEmprestimo = `SELECT * FROM emprestimos WHERE id_emprestimo=$1;`;

            const respostaBD = await database.query(querySelectEmprestimo, [idEmprestimo]);

            if (respostaBD.rowCount != 0) {
                const emprestimo: Emprestimo = new Emprestimo(
                    respostaBD.rows[0].idAluno,
                    respostaBD.rows[0].idLivro,
                    respostaBD.rows[0].dataEmprestimo,
                    respostaBD.rows[0].dataDevolucao,
                    respostaBD.rows[0].statusEmprestimo
                );
                emprestimo.setIdEmpretimo(respostaBD.rows[0].idEmprestimo);

                return emprestimo;
            }

            return null;
        } catch (error) {
            console.error(`Erro ao buscar emprestimo no banco de dados. ${error}`);
            return null;
        }
    }


    static async cadastrarEmprestimo(emprestimo: EmprestimoDTO): Promise<boolean> {
        try {
            // Define a query SQL para inserir um novo cliente na tabela 'cliente'
            // Os valores serão passados como parâmetros ($1, $2, $3)
            // O comando RETURNING retorna o id_cliente gerado automaticamente pelo banco
            const queryInsertEmprestimo = `INSERT INTO emprestimo (id_aluno, id_livro, data_emprestimo, data_devolucao, status_emprestimo)
                                    VALUES
                                    ($1, $2, $3, $4, $5)
                                    RETURNING id_emprestio;`;

            // Executa a query no banco de dados, passando os dados do cliente como parâmetros
            // Usa toUpperCase() para padronizar o nome em letras maiúsculas
            const respostaBD = await database.query(queryInsertEmprestimo, [
                emprestimo.idAluno,
                emprestimo.idLivro,
                emprestimo.dataEmprestimo,
                emprestimo.dataDevolucao,
                emprestimo.statusEmprestimo.toUpperCase()
            ]);

            // Verifica se a resposta do banco contém pelo menos uma linha
            // Isso indica que o cliente foi inserido com sucesso
            if (respostaBD.rows.length > 0) {
                // Exibe no console uma mensagem de sucesso com o ID do cliente cadastrado
                console.info(`Emprestimo cadastrado com sucesso. ID: ${respostaBD.rows[0].id_emprestimo}`);

                // Retorna true indicando que o cadastro foi realizado com sucesso
                return true;
            }

            // Se nenhuma linha foi retornada, significa que o cadastro falhou
            // Retorna false indicando falha na operação
            return false;
        } catch (error) {
            // Em caso de erro na execução da query, exibe uma mensagem de erro no console
            console.error(`Erro na consulta ao banco de dados. ${error}`);

            // Retorna false indicando que houve uma falha na operação
            return false;
        }
    }

    static async listarEmprestimos(): Promise<Array<Emprestimo> | null> {
        try {
            // Cria uma lista vazia que irá armazenar os objetos do tipo Cliente
            let listaDeEmprestimos: Array<Emprestimo> = [];

            // Define a consulta SQL que irá buscar todos os registros da tabela 'clientes'
            const querySelectEmprestimos = `SELECT * FROM emprestimo;`;

            // Executa a consulta no banco de dados e aguarda a resposta
            const respostaBD = await database.query(querySelectEmprestimos);

            // Percorre cada linha retornada pela consulta
            respostaBD.rows.forEach((emprestimoBD) => {
                // Cria um novo objeto Cliente usando os dados da linha atual (nome, cpf, telefone)
                const novoEmprestimo: Emprestimo = new Emprestimo(
                    emprestimoBD.id_aluno,
                    emprestimoBD.id_livro,
                    emprestimoBD.data_emprestimo,
                    emprestimoBD.data_devolucao,
                    emprestimoBD.status_emprestimo
                );

                // Define o ID do cliente usando o valor retornado do banco
                novoEmprestimo.setIdEmpretimo(emprestimoBD.id_emprestimo);

                // Adiciona o novo cliente à lista de clientes
                listaDeEmprestimos.push(novoEmprestimo);
            });

            // Retorna a lista completa de clientes
            return listaDeEmprestimos;
        } catch (error) {
            // Em caso de erro na execução da consulta, exibe uma mensagem no console
            console.error(`Erro na consulta ao banco de dados. ${error}`);

            // Retorna null para indicar que houve uma falha na operação
            return null;
        }
    }
}
export default Emprestimo;