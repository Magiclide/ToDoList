import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ItemComponent } from './item/item.component';
import { ItemTarefaComponent } from './item-tarefa/item-tarefa.component';

@NgModule({
 declarations: [
 AppComponent,
 ItemComponent,
 ItemTarefaComponent
 ],
 imports: [
 BrowserModule,
 HttpClientModule
 ],
 providers: [],
 bootstrap: [AppComponent]
})
export class AppModule { }
