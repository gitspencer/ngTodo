import { IncompletePipe } from './../../pipes/incomplete.pipe';
import { TodoService } from './../../services/todo.service';
import { Todo } from './../../models/todo';
import { Component, OnInit } from '@angular/core';
import { elementAt } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit{
  title = 'ngTodo';
  todos: Todo[] = [];
  selected: Todo | null = null;
  newTodo: Todo = new Todo();
  editTodo: Todo | null = null;
  showComplete: boolean = false;

  constructor(
    private todoService: TodoService,
    private incompletePipe: IncompletePipe,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    // if route param for a todoId is present, call show service method
    let idString = this.route.snapshot.paramMap.get('id');
    if (!this.selected && idString) {
      let todoId: number = Number.parseInt(idString);
      if (isNaN(todoId)) {
        this.router.navigateByUrl('invalidId')
      } else {
        this.todoService.show(todoId).subscribe({
          next: (todo) => {
            this.displayTodo(todo);
          },
          error: (singleTodoError) => {
            console.error('Error getting todo');
            console.error(singleTodoError);
            this.router.navigateByUrl('todoNotFound');
          }
        });
      }
    }
    this.reload();
  }

  reload():void {
    // this.todos = this.todoService.index();
    this.todoService.index().subscribe({
      next: (todoList) => {
        this.todos = todoList;
      },
      error: (someError) => {
        console.error('TodoListComponent.reload(): error getting todo list');
        console.error(someError);
      }
    });
  }

  getTodoCount(): number {
    return this.incompletePipe.transform(this.todos, false).length;
  }

  getIncompleteLevel(){
    let numIncompleteTodos = this.getTodoCount();
    if (numIncompleteTodos >= 10) {
      return 'danger';
    } else if (numIncompleteTodos >=5) {
      return 'warning';
    } else {
      return 'good';
    }
  }

  displayTodo(todo: Todo | null): void {
    this.selected = todo;
  }

  displayTable(): void {
    this.selected = null;
  }

  addTodo(newTodo: Todo) {
    // this.todoService.create(newTodo);
    this.todoService.create(newTodo).subscribe({
      next: (createdTodo) => {
        this.newTodo = new Todo();
        this.reload();
      },
      error: (createError) => {
        console.error('TodoComponent.addTodo(): error creating todo');
        console.error(createError);
      }
    });
  }

  setEditTodo(): void {
    this.editTodo = Object.assign({}, this.selected);
  }

  updateTodo(todo: Todo, goToDetails: boolean = true): void {
    this.todoService.update(todo).subscribe({
      next: (updatedTodo) => {
        if (goToDetails){
          this.selected = updatedTodo;
        }
        this.editTodo = null;
        this.reload();
      },
      error: (updateError) => {
        console.error('TodoListComponenet.updatedTodo(): error on update');
        console.error(updateError);

      }
    });
  }

  deleteTodo(id: number): void {
    this.todoService.destroy(id).subscribe({
      next: () => {
        this.reload();
      },
      error: (errorDelete) => {
        console.error('TodoListComponent.deleteTodo(): error deleting');
        console.error(errorDelete);
      }
    });
  }

}
