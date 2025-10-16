
class Livro{
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
  ){
    this.titulo =_titulo;
    this.editora =_editora;
    this.autor = _autor;
    this.anoPublicacao =_anoPublicacao;
    this.isbn =_isbn;
    this.quantidadeTotal =_quantidadeTotal;
    this.quantidadeDisponivel =_quantidadeDisponivel;
    this.valorAquisicao =_valorAquisicao;
    this.statusLivroEmprestado =_statusLivroEmprestado;
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
 
}

export default Livro;