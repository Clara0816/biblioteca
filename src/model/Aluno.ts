import { DatabaseModel } from "./DatabaseModel.js"; // Importa a classe DatabaseModel
import type { AlunoDTO } from "../interface/AlunoDTO.js";

const database = new DatabaseModel().pool; // Inicializa o pool de conexões com o banco de dados

class Aluno {
    private idAluno: number = 0;
    private nome: string;
    private ra: number;
    private sobrenome: string;
    private dataNascimento: Date;
    private endereco: string;
    private email: string;
    private celular: number;

    constructor(
        _nome: string,
        _ra: number,
        _sobrenome: string,
        _dataNascimento: Date,
        _endereco: string,
        _email: string,
        _celular: number,
    ) {
        this.nome = _nome;
        this.ra = _ra;
        this.sobrenome = _sobrenome;
        this.dataNascimento = _dataNascimento;
        this.endereco = _endereco;
        this.email = _email;
        this.celular = _celular;
    }


    public setIdAluno(_idAluno: number): void {
        this.idAluno = _idAluno;
    }

    public getIdAluno(): number {
        return this.idAluno;
    }

    public getNome(): string {
        return this.nome;
    }

    public setNome(_nome: string): void {
        this.nome = _nome;
    }

    public getRa(): number {
        return this.ra;
    }

    public setRa(_ra: number): void {
        this.ra = _ra;
    }

    public getSobrenome(): string {
        return this.sobrenome;
    }

    public setSobrenome(_sobrenome: string): void {
        this.sobrenome = _sobrenome;
    }

    public getDataNascimento(): Date {
        return this.dataNascimento;
    }

    public setDataNascimento(_dataNascimento: Date) {
        this.dataNascimento = _dataNascimento;
    }

    public getEndereco(): string {
        return this.endereco;
    }

    public setEndereco(_endereco: string): void {
        this.endereco = _endereco;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(_email: string): void {
        this.email = _email;
    }

    public getCelular(): number {
        return this.celular;
    }

    public setCelular(_celular: number): void {
        this.celular = _celular;
    }

    static async listarAluno(idAluno: number): Promise<Aluno | null> {
        try {
            const querySelectAluno = `SELECT * FROM aluno WHERE id_aluno=$1;`;

            const respostaBD = await database.query(querySelectAluno, [idAluno]);

            if (respostaBD.rowCount != 0) {
                const aluno: Aluno = new Aluno(

                    respostaBD.rows[0].nome,
                    respostaBD.rows[0].ra,
                    respostaBD.rows[0].sobrenome,
                    respostaBD.rows[0].data_nascimento,
                    respostaBD.rows[0].endereco,
                    respostaBD.rows[0].email,
                    respostaBD.rows[0].celular
                );
                aluno.setIdAluno(respostaBD.rows[0].id_aluno);

                return aluno;
            }

            return null;
        } catch (error) {
            console.error(`Erro ao buscar cliente no banco de dados. ${error}`);
            return null;
        }
    }


    static async cadastrarAluno(aluno: AlunoDTO): Promise<boolean> {
        try {
            // Define a query SQL para inserir um novo cliente na tabela 'cliente'
            // Os valores serão passados como parâmetros ($1, $2, $3)
            // O comando RETURNING retorna o id_cliente gerado automaticamente pelo banco
            const queryInsertAluno = `INSERT INTO aluno (nome, ra, sobrenome, data_nascimento, endereco, email, celular)
                                VALUES
                                ($1, $2, $3, $4, $5, $6, $7)
                                RETURNING id_aluno;`;

            // Executa a query no banco de dados, passando os dados do cliente como parâmetros
            // Usa toUpperCase() para padronizar o nome em letras maiúsculas
            const respostaBD = await database.query(queryInsertAluno, [
                aluno.nome.toUpperCase(), // Nome do cliente em maiúsculas
                aluno.ra,                // CPF do cliente
                aluno.sobrenome.toUpperCase(),
                aluno.dataNascimento,
                aluno.endereco.toUpperCase(),
                aluno.email.toUpperCase(),
                aluno.celular
            ]);

            // Verifica se a resposta do banco contém pelo menos uma linha
            // Isso indica que o cliente foi inserido com sucesso
            if (respostaBD.rows.length > 0) {
                // Exibe no console uma mensagem de sucesso com o ID do cliente cadastrado
                console.info(`Aluno cadastrado com sucesso. ID: ${respostaBD.rows[0].id_aluno}`);

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


    static async listarAlunos(): Promise<Array<Aluno> | null> {
        try {
            // Cria uma lista vazia que irá armazenar os objetos do tipo Cliente
            let listaDeAlunos: Array<Aluno> = [];

            // Define a consulta SQL que irá buscar todos os registros da tabela 'clientes'
            const querySelectAlunos = `SELECT * FROM aluno;`;

            // Executa a consulta no banco de dados e aguarda a resposta
            const respostaBD = await database.query(querySelectAlunos);

            // Percorre cada linha retornada pela consulta
            respostaBD.rows.forEach((alunoBD) => {
                // Cria um novo objeto Cliente usando os dados da linha atual (nome, cpf, telefone)
                const novoAluno: Aluno = new Aluno(
                    alunoBD.nome,
                    alunoBD.ra,
                    alunoBD.sobrenome,
                    alunoBD.data_nascimento,
                    alunoBD.endereco,
                    alunoBD.email,
                    alunoBD.celular
                );

                // Define o ID do cliente usando o valor retornado do banco
                novoAluno.setIdAluno(alunoBD.id_aluno);

                // Adiciona o novo cliente à lista de clientes
                listaDeAlunos.push(novoAluno);
            });

            // Retorna a lista completa de clientes
            return listaDeAlunos;
        } catch (error) {
            // Em caso de erro na execução da consulta, exibe uma mensagem no console
            console.error(`Erro na consulta ao banco de dados. ${error}`);

            // Retorna null para indicar que houve uma falha na operação
            return null;
        }
    }

}

export default Aluno;