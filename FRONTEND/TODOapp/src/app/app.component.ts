import { Component } from '@angular/core';
import { Tarefa } from "./tarefa";
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { User } from "./user";
@Component({
 selector: 'app-root',
 templateUrl: './app.component.html',
 styleUrls: ['./app.component.css']
})
export class AppComponent {
 title = 'TODOapp';
 arrayDeTarefas: Tarefa[] = [];
 arraydeUsuario: User[] = [];
 apiURL : string;
 usuarioLogado = false;
 usuarioADM=false;
 tokenJWT = '{ "token":""}';
 constructor(private http: HttpClient) {
 this.apiURL = 'http://localhost:3000';
 this.READ_usuario();
 }
 CREATE_usuario(nomeUsuario:string,senhaUsuario:string){
    const idToken = new HttpHeaders().set("id-token", JSON.parse(this.tokenJWT).token);
 var novoUsuario = new User(nomeUsuario, senhaUsuario);
 this.http.post<User>(`${this.apiURL}/api/post`, novoUsuario,{'headers':idToken}).subscribe(
  resultado => { console.log(resultado); this.READ_usuario();this.usuarioLogado = true });
 }
 CREATE_tarefa(descricaoNovaTarefa: string) {
  const idToken = new HttpHeaders().set("id-token", JSON.parse(this.tokenJWT).token);
 var novaTarefa = new Tarefa(descricaoNovaTarefa, false);
 this.http.post<Tarefa>(`${this.apiURL}/api/postTarefa`, novaTarefa,{'headers':idToken}).subscribe(
  resultado => { console.log(resultado); this.READ_tarefas(); this.usuarioLogado = true  });
 
 }
 READ_usuario() {
  const idToken = new HttpHeaders().set("id-token", JSON.parse(this.tokenJWT).token);
  this.http.get<User[]>(`${this.apiURL}/api/getAll`, { 'headers': idToken }).subscribe(
  (resultado) => { this.arraydeUsuario = resultado; this.usuarioLogado = true   },
  (error) => { this.usuarioLogado = false }
  )
 }

 READ_tarefas() {
   const idToken = new HttpHeaders().set("id-token", JSON.parse(this.tokenJWT).token);
   this.http.get<Tarefa[]>(`${this.apiURL}/api/getAllTarefas`, { 'headers': idToken }).subscribe(
   (resultado) => { this.arrayDeTarefas = resultado; this.usuarioLogado = true },
   (error) => { this.usuarioLogado = false }
   )
     }
 removeUsuario(usuarioAserRemovido:User){
    const idToken = new HttpHeaders().set("id-token", JSON.parse(this.tokenJWT).token);
  var indice = this.arraydeUsuario.indexOf(usuarioAserRemovido);
  var id = this.arraydeUsuario[indice]._id;
  this.http.delete<User>(`${this.apiURL}/api/delete/${id}`,{ 'headers': idToken }).subscribe(
  resultado => { console.log(resultado); this.READ_usuario(); this.usuarioLogado = true});
 }
 remove(tarefaAserRemovida: Tarefa) {
  const idToken = new HttpHeaders().set("id-token", JSON.parse(this.tokenJWT).token);
  var indice = this.arrayDeTarefas.indexOf(tarefaAserRemovida);
  var id = this.arrayDeTarefas[indice]._id;
  this.http.delete<Tarefa>(`${this.apiURL}/api/deleteTarefa/${id}`,{ 'headers': idToken }).subscribe(
  resultado => { console.log(resultado); this.READ_tarefas(); this.usuarioLogado = true});
 
 }

 UPDATE_usuario(usuarioAserModificado:User){
    const idToken = new HttpHeaders().set("id-token", JSON.parse(this.tokenJWT).token);
  var indice = this.arraydeUsuario.indexOf(usuarioAserModificado);
  var id = this.arraydeUsuario[indice]._id;
  this.http.patch<User>(`${this.apiURL}/api/update/${id}`,
  usuarioAserModificado,{ 'headers': idToken }).subscribe(
  resultado => { console.log(resultado); this.READ_usuario(); this.usuarioLogado = true});
 }
 UPDATE_tarefa(tarefaAserModificada: Tarefa) {
  const idToken = new HttpHeaders().set("id-token", JSON.parse(this.tokenJWT).token);
  var indice = this.arrayDeTarefas.indexOf(tarefaAserModificada);
  var id = this.arrayDeTarefas[indice]._id;
  this.http.patch<Tarefa>(`${this.apiURL}/api/updateTarefa/${id}`,
  tarefaAserModificada,{ 'headers': idToken }).subscribe(
  resultado => { console.log(resultado); this.READ_tarefas();this.usuarioLogado = true });
 }
 /*
 verificaAdm(){
   const id='645cd4b0abd23cca15c03735';
   const idToken = new HttpHeaders().set("id-token", JSON.parse(this.tokenJWT).token);
   this.http.get<User>(`${this.apiURL}/api/get/${id}`, { 'headers': idToken }).subscribe(
      (resultado) => { if(resultado.nome=="B") },
      (error) => { this.usuarioLogado = false }
   )
 }
 */
 login(username: string, password: string) {
   
  var credenciais = { "nome": username, "senha": password }
  this.http.post(`${this.apiURL}/api/login`, credenciais).subscribe(resultado => {
   this.usuarioLogado=true;
   this.tokenJWT = JSON.stringify(resultado);
  if(credenciais.nome==="Branqss"){
   this.usuarioADM=true;
   this.READ_usuario();
  }else{

     this.READ_tarefas();
  }
 
  //console.log(JSON.stringify(resultado));
});
 }
}

