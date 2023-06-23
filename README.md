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

- In the TodoJPA project file, the Todo & User entities contain fields, getters/setters, no arg constructors, hashcode and equals, and a to string to match-up with the respective table in the MySQL database, build out the object and allow for troubleshooting. Todo & User JUnit test classes are used to ensure our entity mapping is accurate and can retrieve the correct data from the database based on each test case. 

- In the TodoREST project file, the TodoService & TodoServiceImpl contain CRUD logic for Todos with @Autowired annotation to access repos. Additional Read queries are defined in the TodoRepository and UserRepository which extend the JPARepository.

- Todo Controller contains the REST API mappings as well as HTTP status code assignments based on successful or unnsuccessful CRUD operations. The TodoService is @Autowired into the controller to provide access to the service's methods for accessing the database.

- The front end of this project was created using Angular and written in TypeScript, while Bootstrap and CSS were used for styling.

- Angular's Router Module is used for creating paths to specific views (home, todo, register etc) which made coding each view much simpler and more organized as opposed to a single large dynamic JavaScript HTML document. 

- The Todo model contains the fields and a constructor method to build each Todo. TodoService contains the HTTPClient and AuthService in the constructor in order to pass appropriate URLS based on the request type as well as the Authenticated User. Detailed error messages are also included to help with debugging.

- The TodoComponent contains the logic for front end CRUD. A Router passed through the constructor along with a reloading method call allows for the methods to return the appropriate objects which will be displayed on the correct view.

- I created a Pipe to house the logic for showing only incompleted todos or a list of todos including those that have been marked completed.

- A combination of the AuthService, AuthController, AuthService (and Impl), and SecurityConfig files work in a similar way as the Todo files named above in order to register and find an Authenticated User with Basic Authentication creditials.


