package com.skilldistillery.todoapp.controllers;

import java.security.Principal;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.todoapp.entities.Todo;
import com.skilldistillery.todoapp.services.TodoService;

@RestController
@RequestMapping("api")
@CrossOrigin({"*", "http://localhost/"})
public class TodoController {

//	private String username = "shaun";
	
	@Autowired
	private TodoService todoService;
	
	@GetMapping("todos")
	public Set<Todo> index(HttpServletRequest req, HttpServletResponse res, Principal principal) {
//		Set<Todo> todos = todoService.index(username);
		Set<Todo> todos = todoService.index(principal.getName());
		if (todos == null) {
			res.setStatus(404);
		}
		return todos;
	}

	@GetMapping("todos/{tid}")
	public Todo show(HttpServletRequest req, HttpServletResponse res, @PathVariable Integer tid, Principal principal) { 
//		Todo todo = todoService.show(username, tid);
		Todo todo = todoService.show(principal.getName(), tid);
		if (todo == null) {
			res.setStatus(404);
		}
		return todo;
	}

	@PostMapping("todos")
	public Todo create(HttpServletRequest req, HttpServletResponse res, @RequestBody Todo todo, Principal principal) { 
		try {
//			todo = todoService.create(username, todo);
			todo = todoService.create(principal.getName(), todo);
			res.setStatus(201);
			StringBuffer url = req.getRequestURL();
			url.append("/").append(todo.getId());
			res.setHeader("Location", url.toString());
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
			todo = null;
		}
		return todo;	
	}

	@PutMapping("todos/{tid}")
	public Todo update(HttpServletRequest req, HttpServletResponse res, @PathVariable Integer tid, 
			@RequestBody Todo todo, Principal principal) { 
		Todo updatedTodo = null;
		try {
//			updatedTodo = todoService.update(username, tid, todo);
			updatedTodo = todoService.update(principal.getName(), tid, todo);
			if (updatedTodo == null) {
				res.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
		}
		return updatedTodo;
	}

	@DeleteMapping("todos/{tid}")
	public void destroy(HttpServletRequest req, HttpServletResponse res, @PathVariable Integer tid, Principal principal) { 
		try {
//			if (todoService.destroy(username, tid)) {
			if (todoService.destroy(principal.getName(), tid)) {
				res.setStatus(204);
			} else {
				res.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
		}
	}
	
}

