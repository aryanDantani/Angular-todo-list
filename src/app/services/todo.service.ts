import { Injectable } from '@angular/core';

// Updated Todo interface to include 'category'
export interface Todo {
  id: number;
  title: string;
  startTime: string;
  startMeridian: 'AM' | 'PM';
  endTime: string;
  endMeridian: 'AM' | 'PM';
  date: string;
  description: string;
  imageUrl: string;
  countryCode: any;
  phone: string;
  category: 'technical' | 'non-technical' | 'UI-UX'; // Added category field
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todos: Todo[] = [];
  private idCounter = 1;

  // Get all todos
  getTodos(): Todo[] {
    return this.todos;
  }

  // Get todo by ID
  getTodoById(id: number): Todo | undefined {
    return this.todos.find((todo) => todo.id === id);
  }

  // Add a new todo with category
  addTodo(todo: Omit<Todo, 'id'>): void {
    this.todos.push({ id: this.idCounter++, ...todo });
  }

  // Update existing todo with category
  updateTodo(id: number, updatedTodo: Omit<Todo, 'id'>): void {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      this.todos[index] = { id, ...updatedTodo };
    }
  }

  // Delete a todo by ID
  deleteTodo(id: number): void {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }
}
