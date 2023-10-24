import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Tarefa } from "../tarefa";
import { User } from "../user";
@Component({
 selector: 'app-item',
 templateUrl: './item.component.html',
 styleUrls: ['./item.component.css'],
 
})
  
export class ItemComponent {
 emEdicao = false;
 @Input() tarefa: Tarefa = new Tarefa("", false);
 @Input() user: User = new User("","");
 @Output() remove = new EventEmitter<Tarefa>();
 @Output() modificaTarefa = new EventEmitter();
 @Output() modificaUsuario= new EventEmitter();
 @Output() removeUsuario = new EventEmitter<User>();
}