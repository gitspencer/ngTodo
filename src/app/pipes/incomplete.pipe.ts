import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../models/todo';

@Pipe({
  name: 'incomplete'
})
export class IncompletePipe implements PipeTransform {

  transform(todos: Todo[], showComplete: boolean): Todo[] {
    if (showComplete) {
      return todos;
    }
    let results: Todo[] = [];
    for (let todo of todos) {
      if (!todo.completed) {
        results.push(todo);
      }
    }
    return results;
  }

}
// This pipe will be applied to the list of todos in the *ngFor.
// (The array of values passed to it will be the collection of todos from your API.)
// If a todo's completed property is false, display it
