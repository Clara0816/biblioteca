class Aluno{
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
  ){
    this.nome =_nome;
    this.ra =_ra;
    this.sobrenome =_sobrenome;
    this.dataNascimento =_dataNascimento;
    this.endereco =_endereco;
    this.email =_email;
    this.celular =_celular;
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

    public setDataNascimento(_dataNascimento: Date ){
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
 }
export default Aluno;