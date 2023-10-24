import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Tarefa } from "../tarefa";
@Component({
  selector: 'app-item-tarefa',
  templateUrl: './item-tarefa.component.html',
  styleUrls: ['./item-tarefa.component.css']
})
export class ItemTarefaComponent {
  emEdicao = false;
  @Input() tarefa: Tarefa = new Tarefa("", false);
  @Output() remove = new EventEmitter();
  @Output() modificaTarefa = new EventEmitter();
}
