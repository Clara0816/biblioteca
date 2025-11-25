import { DatabaseModel } from "./DatabaseModel.js";
import type { LivroDTO } from "../interface/LivroDTO.js";
const database = new DatabaseModel().pool;

class Livro {
    private idLivro: number = 0;
    private titulo: string;
    private editora: string;
    private autor: string;
    private anoPublicacao: number;
    private isbn: number;
    private quantidadeTotal: number;
    private quantidadeDisponivel: number;
    private valorAquisicao: number;
    private statusLivroEmprestado: string;

    constructor(
        _titulo: string,
        _editora: string,
        _autor: string,
        _anoPublicacao: number,
        _isbn: number,
        _quantidadeTotal: number,
        _quantidadeDisponivel: number,
        _valorAquisicao: number,
        _statusLivroEmprestado: string,
    ) {

        this.titulo = _titulo;
        this.editora = _editora;
        this.autor = _autor;
        this.anoPublicacao = _anoPublicacao;
        this.isbn = _isbn;
        this.quantidadeTotal = _quantidadeTotal;
        this.quantidadeDisponivel = _quantidadeDisponivel;
        this.valorAquisicao = _valorAquisicao;
        this.statusLivroEmprestado = _statusLivroEmprestado;
    }

    public getIdLivro(): number {
        return this.idLivro;
    }

    public setIdLivro(_idLivro: number): void {
        this.idLivro = _idLivro;
    }


    public getTitulo(): string {
        return this.titulo;
    }

    public setTitulo(_titulo: string): void {
        this.titulo = _titulo;
    }

    public getEditora(): string {
        return this.editora;
    }

    public setEditora(_editora: string): void {
        this.editora = _editora;
    }

    public getAutor(): string {
        return this.autor;
    }

    public setAutor(_autor: string): void {
        this.autor = _autor;
    }

    public getAnoPublicacao(): number {
        return this.anoPublicacao;
    }

    public setAnoPublicacao(_anoPublicacao: number): void {
        this.anoPublicacao = _anoPublicacao;
    }

    public getIsbn(): number {
        return this.isbn;
    }

    public setIsbn(_isbn: number): void {
        this.isbn = _isbn;
    }


    public getQuantidadeTotal(): number {
        return this.quantidadeTotal;
    }

    public setQuantidadeTotal(_quantidadeTotal: number): void {
        this.quantidadeTotal = _quantidadeTotal;
    }


    public getQuantidadeDisponivl(): number {
        return this.quantidadeTotal;
    }

    public setQuantidadeDisponivel(_quantidadeDisponivel: number): void {
        this.quantidadeDisponivel = _quantidadeDisponivel;
    }

    public getValorAquisicao(): number {
        return this.valorAquisicao;
    }

    public setValorAquisicao(_valorAquisicao: number): void {
        this.valorAquisicao = _valorAquisicao;
    }

    public getStatusLivroEmprestado(): string {
        return this.autor;
    }

    public setStatusLivroEmprestado(_statusLivroEmprestado: string): void {
        this.statusLivroEmprestado = _statusLivroEmprestado;
    }

    static async listarLivro(idLivro: number): Promise<Livro | null> {
        try {
            const querySelectLivro = `SELECT * FROM livro WHERE id_livro=$1;`;

            const respostaBD = await database.query(querySelectLivro, [idLivro]);

            if (respostaBD.rowCount != 0) {
                const livro: Livro = new Livro(
                    respostaBD.rows[0].titulo,
                    respostaBD.rows[0].editora,
                    respostaBD.rows[0].autor,
                    respostaBD.rows[0].ano_publicacao,
                    respostaBD.rows[0].isbn,
                    respostaBD.rows[0].quantidade_total,
                    respostaBD.rows[0].quantidade_disponivel,
                    respostaBD.rows[0].valor_aquisicao,
                    respostaBD.rows[0].status_livro_emprestado
                );
                livro.setIdLivro(respostaBD.rows[0].id_livro);

                return livro;
            }

            return null;
        } catch (error) {
            console.error(`Erro ao buscar livro no banco de dados. ${error}`);
            return null;
        }
    }

    static async listarLivros(): Promise<Array<Livro> | null> {
        try {
            // Cria uma lista vazia que irá armazenar os objetos do tipo Cliente
            let listaDeLivros: Array<Livro> = [];

            // Define a consulta SQL que irá buscar todos os registros da tabela 'clientes'
            const querySelectLivros = `SELECT * FROM livro;`;

            // Executa a consulta no banco de dados e aguarda a resposta
            const respostaBD = await database.query(querySelectLivros);

            // Percorre cada linha retornada pela consulta
            respostaBD.rows.forEach((livroBD) => {
                // Cria um novo objeto Cliente usando os dados da linha atual (nome, cpf, telefone)
                const novoLivro: Livro = new Livro(
                    livroBD.titulo,
                    livroBD.editora,
                    livroBD.autor,
                    livroBD.ano_publicacao,
                    livroBD.isbn,
                    livroBD.quantidade_total,
                    livroBD.quantidade_disponivel,
                    livroBD.valor_aquisicao,
                    livroBD.status_livro_emprestado

                );

                // Define o ID do cliente usando o valor retornado do banco
                novoLivro.setIdLivro(livroBD.id_livro);

                // Adiciona o novo cliente à lista de clientes
                listaDeLivros.push(novoLivro);
            });

            // Retorna a lista completa de clientes
            return listaDeLivros;
        } catch (error) {
            // Em caso de erro na execução da consulta, exibe uma mensagem no console
            console.error(`Erro na consulta ao banco de dados. ${error}`);

            // Retorna null para indicar que houve uma falha na operação
            return null;
        }
    }



    static async cadastrarLivro(livro: LivroDTO): Promise<boolean> {
        try {
            // Define a query SQL para inserir um novo cliente na tabela 'cliente'
            // Os valores serão passados como parâmetros ($1, $2, $3)
            // O comando RETURNING retorna o id_cliente gerado automaticamente pelo banco
            const queryInsertLivro = `INSERT INTO livro (titulo, editora, autor, ano_publicacao, isbn, quant_total, quant_disponivel, valor_aquisicao, status_livro_emprestado)
                                    VALUES
                                    ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                                    RETURNING id_livro;`;

            // Executa a query no banco de dados, passando os dados do cliente como parâmetros
            // Usa toUpperCase() para padronizar o nome em letras maiúsculas
            const respostaBD = await database.query(queryInsertLivro, [
                livro.titulo.toUpperCase(), // Nome do cliente em maiúsculas
                livro.editora.toUpperCase(),               // CPF do cliente
                livro.autor.toUpperCase(),
                livro.anoPublicacao,
                livro.isbn,
                livro.quantidadeTotal,
                livro.quantidadeDisponivel,
                livro.valorAquisicao,
                livro.statusLivroEmprestado.toUpperCase()
            ]);

            // Verifica se a resposta do banco contém pelo menos uma linha
            // Isso indica que o cliente foi inserido com sucesso
            if (respostaBD.rows.length > 0) {
                // Exibe no console uma mensagem de sucesso com o ID do cliente cadastrado
                console.info(`Livro cadastrado com sucesso. ID: ${respostaBD.rows[0].id_livro}`);

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

}

export default Livro;
