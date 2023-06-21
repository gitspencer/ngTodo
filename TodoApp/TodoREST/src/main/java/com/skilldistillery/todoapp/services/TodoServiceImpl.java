package com.skilldistillery.todoapp.services;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.todoapp.entities.Todo;
import com.skilldistillery.todoapp.entities.User;
import com.skilldistillery.todoapp.repositories.TodoRepository;
import com.skilldistillery.todoapp.repositories.UserRepository;

@Service
public class TodoServiceImpl implements TodoService {

	@Autowired
	private TodoRepository todoRepo;

	@Autowired
	private UserRepository userRepo;

	@Override
	public Set<Todo> index(String username) {
		Set<Todo> todos = todoRepo.findByUser_Username(username);
		return todos;
	}

	@Override
	public Todo show(String username, int tid) {
		Todo todo = todoRepo.findByUser_UsernameAndId(username, tid);
		return todo;
	}

	@Override
	public Todo create(String username, Todo todo) {
		User user = userRepo.findByUsername(username);
		if (user != null) {
			todo.setUser(user);
			Todo newTodo = todoRepo.saveAndFlush(todo);
			return newTodo;
		}
		return null;
	}

	@Override
	public Todo update(String username, int tid, Todo todo) {
		User updatingUser = userRepo.findByUsername(username);
		Todo existingTodo = todoRepo.findByUser_UsernameAndId(username, tid);
		if (existingTodo != null) {
			existingTodo.setCompleted(todo.getCompleted());				
			existingTodo.setCompleteDate(todo.getCompleteDate());
			existingTodo.setDescription(todo.getDescription());
			existingTodo.setDueDate(todo.getDueDate());
			existingTodo.setTask(todo.getTask());
			return todoRepo.saveAndFlush(existingTodo);
		}
		return null;
	}

	@Override
	public boolean destroy(String username, int tid) {
		boolean deleted = false;
		Todo toBeDeleted = todoRepo.findByUser_UsernameAndId(username, tid);
		if (toBeDeleted != null) {
			todoRepo.delete(toBeDeleted);
			deleted = true;
		}
		return deleted;
	}

}
