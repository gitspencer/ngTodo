import { HttpClient } from '@angular/common/http';
import { Todo } from '../models/todo';
import { Product } from './../../../../ngHandsOn/src/app/models/product';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  // private baseUrl = 'http://localhost:8087/';
  // private url = this.baseUrl + 'api/todos';
  private url = environment.baseUrl + 'api/todos';

  newTodo: Todo = new Todo();
  editTodo: Todo | null = null;

  // todos: Todo[] = [
  //   new Todo(1, 'Go round mums', '', false),
  //   new Todo(2, 'Get Liz back', '', false),
  //   new Todo(3, 'Sort life out', '', false),
  // ];

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe,
    private auth: AuthService
  ) {}

  // public index(): Todo[] {
  public index(): Observable<Todo[]> {
    // return [...this.todos];
    return this.http.get<Todo[]>(this.url, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.error('Error GETing todo list');
        return throwError(
          () =>
            new Error('TodoService.index(): error retrieving todo list: ' + err)
        );
      })
    );
  }

  public show(todoId: number): Observable<Todo> {
    return this.http.get<Todo>(this.url + '/' + todoId, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.error('Error GETing single todo');
        return throwError(
          () =>
            new Error(
              'TodoService.index(): error retrieving single todo: ' + err
            )
        );
      })
    );
  }

  // generateId(): number {
  //   return this.todos[this.todos.length - 1].id + 1;
  // }

  // public create(newTodo : Todo): void {
  public create(newTodo: Todo): Observable<Todo> {
    // newTodo.id = this.generateId();
    newTodo.completed = false;
    newTodo.description = '';
    // this.todos.push(newTodo);
    return this.http.post<Todo>(this.url, newTodo, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.error('Error POSTing new todo');
        return throwError(
          () => new Error('TodoService.create(): error creating todo: ' + err)
        );
      })
    );
  }

  // public update(todo : Todo): void {
  public update(todo: Todo): Observable<Todo> {
    // for(let i = 0; i < this.todos.length; i++) {
    //   if(todo.id === this.todos[i].id) {
    //     this.todos[i].task = todo.task;
    //     this.todos[i].description = todo.description;
    //     this.todos[i].completed= todo.completed;
    //     break;
    //   }
    // }
    if (todo.completed) {
      todo.completeDate = this.datePipe.transform(Date.now(), 'shortDate');
    } else {
      todo.completeDate = '';
    }

    return this.http.put<Todo>(this.url + '/' + todo.id, todo, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.error('Error PUTing updated todo');
        return throwError(
          () => new Error('TodoService.update(): error updating todo: ' + err)
        );
      })
    );
  }

  // public destroy(id: number): void {
  public destroy(id: number): Observable<void> {
    // for (let i = 0; i < this.todos.length; i++) {
    //   if (id === this.todos[i].id) {
    //     this.todos.splice(i, 1);
    //   }
    // }
    return this.http.delete<void>(this.url + '/' + id, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.error('Error DELETEing todo');
        return throwError(
          () => new Error('TodoService.destroy(): error deleting todo: ' + err)
        );
      })
    );
  }

  getHttpOptions() {
    let options = {
      headers: {
        Authorization: 'Basic ' + this.auth.getCredentials(),
        'X-Requested-With': 'XMLHttpRequest',
      },
    };
    return options;
  }
}
