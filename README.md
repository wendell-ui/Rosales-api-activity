1. Markdown
2. # RESTful API Activity - [Rosales, Wendell P.]
3. ## Best Practices Implementation
  -This project demonstrate best practices in REST API development using Node.js and Express, It includes proper environment configuration, standardized HTTP status codes, resource modeling, and error handling.
4. **1. Environment Variables:**
5. - Why did we put `BASE_URI` in `.env` instead of hardcoding it?
6. - Answer: I put BASE_URL in the .env file to make the application more flexible and secure. This allows to change the API version orf base path without modifying the source code. It also follows best practices by seperating configuration from application logic.
7. **2. Resource Modeling:**
8. - Why did we use plural nouns (e.g., `/room`) for our routes?
9. - Answer: I use plural nouns because each route represents a collection of resources. For example, /rooms represents multiple room records, not just one. This follows RESTful conventions and makes the API more understable and scalable.
10. **3. Status Codes:**
11. - When do we use `201 Created` vs `200 OK`?
    - 201 Created is used when a new resource is successfully created(POST request).
    - 200 OK is used when a request is successful but does not create a new resource, such as GET or PUT requests.
12. - Why is it important to return `404` instead of just an empty array or a generic error?
13. - Answer: Returning 404 Not Found clearly tells the client that the requested resource does not exist. It helps to me to understand the problem immediately and allows proper handling on the client side.
14.
15. **4. Testing:**
16. - (Paste a screenshot of a successful GET request here)

  <img width="1365" height="722" alt="Screenshot 2026-01-28 234016" src="https://github.com/user-attachments/assets/3e795f02-182c-4aab-b7e7-1970fd9ab115" />
17. ** testing screenshot:**

<img width="1363" height="725" alt="Screenshot 2026-02-06 154650" src="https://github.com/user-attachments/assets/b8bc13c8-316a-49dd-9e64-7c6de0476764" />


18. - Why did I choose to Embed the Maintenance Log?
 - I chose to embed the maintenance log because it is directly related to a specific room and is not used independently. The maintenance history is always accessed together with the room information, so embedding it inside the room document improves data consistency and retrieval efficiency.
19. - Why did I choose to Reference the Guest?
- I chose to reference the guest because a guest can exist independently and may have multiple bookings over time. Referencing avoids data duplication and allows the same guest information to be reused across different bookings.

## Test Specification Document

| Test ID | Module | Function | Scenario (Description) | Expected Output | Status |
|---------|--------|----------|-------------------------|-----------------|--------|
| UT-001 | AuthMiddleware | protect | Valid Bearer token provided | next() function is called | Pass |
| UT-002 | AuthMiddleware | protect | Request missing Authorization header | HTTP 401, "Not authorized, no token provided" | Pass |
| UT-003 | RoomController | getAllRooms | Fetch all rooms successfully | HTTP 200, Array of Room Objects | Pass |
| UT-004 | RoomController | getAllRooms | Database throws a connection error | HTTP 500, Error JSON Message | Pass |
| UT-005 | RoomController | createRoom | Create a new room with valid data | HTTP 201, New Room Object | Pass |

## Essay Questions

### 1. Mocking
**Explain in your own words why we mocked Room.find and jwt.verify. What specific problem does mocking solve in Unit Testing?**

**Answer:** We mocked Room.find and jwt.verify to isolate the code under test from external dependencies. Room.find is a database operation that would require a real database connection, and jwt.verify involves cryptographic operations and external library behavior. Mocking solves the problem of making unit tests unreliable and slow due to dependencies on external systems, databases, or network calls. By mocking these functions, we can control their behavior, simulate different scenarios (like successful database queries or JWT verification failures), and ensure our tests run quickly and consistently without needing actual database connections or valid JWT tokens.

### 2. Code Coverage
**Look at your Jest Coverage report. Explain what % Branch coverage means. If your Branch coverage is at 54.54%, what does that tell you about your tests? (Hint: Think about if/else statements).**

**Answer:** Branch coverage measures the percentage of decision points (branches) in the code that have been executed during testing. Branches typically occur in conditional statements like if/else, switch cases, and loops. A branch coverage of 54.54% means that only about half of the possible execution paths through conditional logic have been tested. This indicates that there are untested branches in the codebase, such as the else parts of if statements or alternative conditions in switch statements, which could contain bugs or unhandled edge cases that haven't been validated by the current test suite.

### 3. Testing Middleware
**In our authMiddleware.test.js, why did we use jest.fn() for the next variable, and why did we assert expect(next).not.toHaveBeenCalled() in the failure scenario?**

**Answer:** We used jest.fn() for the next variable to create a mock function (spy) that tracks whether it has been called during the test. This allows us to verify the middleware's behavior - specifically, whether it continues to the next middleware in the chain or stops execution. In the failure scenario (no token provided), we assert that next was not called because the middleware should block the request by sending a 401 error response instead of proceeding to the next middleware. This ensures that unauthorized requests are properly rejected and don't continue through the application pipeline.


### Hands-on Activity #6: The Testing Triangle - Integration Testing
### Unit vs. Integration
**Explain the difference between the Unit Test you wrote in Activity 5 and the Integration Test you wrote today. What does the Integration Test check that the Unit Test does not?**

**Answer:** Unit tests focus on testing individual functions or modules in isolation, mocking external dependencies like databases and third-party libraries. The unit tests we wrote tested the roomController and authMiddleware functions separately with mocked database calls. Integration tests, however, test the entire application flow end-to-end, including real database interactions and multiple components working together. The integration test checks that the complete API endpoint works correctly - from receiving the HTTP request, through authentication, business logic, database operations, and response generation - which unit tests cannot verify since they isolate each component.

### 5. In-Memory Databases
**Why did we install mongodb-memory-server instead of just connecting our tests to our real MongoDB Atlas URI? Mention at least two reasons.**

**Answer:** We used mongodb-memory-server to create an in-memory database for testing instead of connecting to the real MongoDB Atlas URI for several important reasons. First, it provides test isolation - each test suite gets a fresh, clean database that doesn't interfere with other tests or the production data. Second, it makes tests faster and more reliable by avoiding network latency and potential connection issues with the remote Atlas database. Third, it prevents accidental data pollution of the production database during testing. Fourth, it allows tests to run in any environment without requiring internet access or Atlas credentials.

### 6. Supertest
**What is the role of supertest in our test file? Why didn't we use Postman for this?**

**Answer:** Supertest is a library that allows us to programmatically test HTTP endpoints by simulating HTTP requests to our Express application. It acts as an HTTP client that can send GET, POST, PUT, DELETE requests and examine the responses. We didn't use Postman because Supertest integrates directly with our test suite, allowing automated testing that can be run repeatedly as part of our CI/CD pipeline. Unlike Postman which is manual and GUI-based, Supertest enables programmatic assertions, test organization, and automated execution alongside our other unit tests.
Hands-on Activity #4: Securing the API
Questions & Answers

1. Authentication vs Authorization

*Question: What is the difference between Authentication and Authorization in our code?

Answer:

*Authentication is the process of verifying the identity of a user. In our code, this happens when a user logs in with their email and password. The server checks the credentials, and if correct, returns a JWT token.

*Authorization is the process of verifying what an authenticated user is allowed to do. In our code, the authorize middleware checks the user's role (e.g., admin, manager, user) to allow or

2. Security (bcrypt)

*Question: Why did we use bcryptjs instead of saving passwords as plain text in MongoDB?

Answer:
*We use bcryptjs to hash passwords before saving them in the database. Hashing converts the plain password into a secure, irreversible string. This is important because:
*If the database is ever compromised, attackers cannot see users’ actual passwords.
*Bcrypt adds a salt to protect against dictionary attacks and rainbow tables.
*It ensures that even if two users have the same password, their hashes will be different.
*Saving passwords as plain text would be extremely insecure and puts users at risk.

3. JWT Structure

*Question: What does the protect middleware do when it receives a JWT from the client?

Answer:
*The protect middleware is responsible for authenticating requests using the JWT. When a client sends a token:
*It extracts the token from the Authorization header, body, or query.
*It verifies the token using JWT_SECRET to ensure it is valid and not expired.
*It decodes the token to get the user ID and role.
*It fetches the user from the database (excluding the password) and attaches it to req.user.
*If the token is missing, invalid, or expired, it blocks access and returns a 401 Unauthorized error.
*This allows only authenticated users to access protected routes and works together with the authorize middleware for role-based access control.

#Screenshot Result

#Register User
<img width="1365" height="722" alt="Screenshot 2026-03-10 205159" src="https://github.com/user-attachments/assets/daf2aaf2-8f40-4043-b121-af63c5de317f" />

#Login User 
<img width="1362" height="718" alt="Screenshot 2026-03-10 205315" src="https://github.com/user-attachments/assets/27f0ec91-ac01-4f86-9899-0d6c3764087a" />

#ACCESS PROTECTED ROUTE (CREATE ROOMS)
<img width="1365" height="716" alt="Screenshot 2026-03-10 212511" src="https://github.com/user-attachments/assets/dd82aa12-26a1-4adf-9994-f51ddee30d8c" />


>>>>>>> c53b4a3c9197ab1d4655ba8d51d4db119b6f8d92
