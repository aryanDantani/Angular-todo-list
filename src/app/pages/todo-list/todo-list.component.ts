import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoService, Todo } from '../../services/todo.service';
import {
  CommonModule,
  DatePipe,
  LowerCasePipe,
  NgFor,
  TitleCasePipe,
  UpperCasePipe,
} from '@angular/common';
import { PhoneNumberPipe } from '../../phone-number.pipe';

@Component({
  selector: 'app-todo-list',
  imports: [
    NgFor,
    CommonModule,
    LowerCasePipe,
    UpperCasePipe,
    TitleCasePipe,
    DatePipe,
  ],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  imageUrl: string = '';
  isImagePreviewVisible: boolean = false;

  //prectice data
  newTitle: string = 'Angular';
  newDescription: string =
    "hello my name is aryan dantani and I'm a full stack developer";
  currentDate: Date = new Date();

  constructor(private todoService: TodoService, private router: Router) {}

  ngOnInit(): void {
    this.todos = this.todoService.getTodos();
    console.log(this.todos, 'this.todos');
  }

  openImagePreview(image: string): void {
    this.imageUrl = image;
    this.isImagePreviewVisible = true;
  }

  // Method to close image preview dialog
  closeImagePreview(): void {
    this.isImagePreviewVisible = false;
  }

  navigateToAdd(): void {
    this.router.navigate(['/todos/add']);
  }

  navigateToEdit(id: number): void {
    this.router.navigate([`/todos/edit/${id}`]);
  }

  delete(id: number): void {
    this.todoService.deleteTodo(id);
    this.todos = this.todoService.getTodos();
  }
}
