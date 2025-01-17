import { Routes } from '@angular/router';
import { TodoListComponent } from './pages/todo-list/todo-list.component';
import { TodoAddEditComponent } from './pages/todo-add/todo-add.component';

export const routes: Routes = [
  { path: '', component: TodoListComponent },
  { path: 'todos/add', component: TodoAddEditComponent },
  { path: 'todos/edit/:id', component: TodoAddEditComponent },
];
