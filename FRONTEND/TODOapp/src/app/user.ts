export class User{
    _id : string | undefined ;
    nome: string;
    senha: string;
    constructor(_nome: string, _senha: string) {
    this.senha = _senha;
    this.nome = _nome;
    }
   }
   