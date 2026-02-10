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