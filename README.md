# NgTodo

Website: [Todo Dojo](http://18.116.157.70:8080/TodoREST)

Create account or login with Username: user, Password: 1234.

## Description

Full-stack Todo List using Spring Security and user authentication to access and modify your unique todo list.

## REST API
| HTTP Verb | URI                  | Request Body | Response Body | Purpose |
|-----------|----------------------|--------------|---------------|---------|
| GET       | `/api/authenticate`   | Authorization: Basic base64 encode username:password | Representation of _User_ `1` | **Retrieve** endpoint |
| GET       | `/api/todos`      | Basic Authorization | Collection of representations of all _Todo_ resources of _User_ | **List** all todos
| GET       | `/api/todos/1`   | Basic Authorization | Representation of _Todo_ `1` | **Retrieve** endpoint |
| POST      | `/api/todos`      | Representation of a new _Todo_ resource & Basic Authorization | Description of the result of the operation | **Create** endpoint |
| POST      | `/api/register`      | Representation of a new _User_ resource | Description of the result of the operation | **Create** endpoint |
| PUT       | `/api/todos/1`   | Representation of a new version of _Todo_ `1` & Basic Authorization | | **Replace** endpoint |
| DELETE    | `/api/todos/1`   | Basic Authorization | | **Delete** route |



## Technologies Used
- Java
- Typescript
- Angular
- HTML
- CSS
- Spring Boot
- Spring REST
- Spring Data JPA
- SpringToolSuite
- MySQL Workbench
- JUnit

## Lessons Learned


