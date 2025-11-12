# Testing and Debugging MERN Applications

This assignment focuses on implementing comprehensive testing strategies for a MERN stack application, including unit testing, integration testing, and end-to-end testing, along with debugging techniques.

1. How to Install and Run the Project
Prerequisites: Node.js, npm/yarn, MongoDB (Connection URI).

Setup:

git clone [repo-url]

Create .env file in the server folder with your MONGO_URI.

cd server and run npm install.

cd ../client and run npm install.

Run:

Start Server: cd server then npm run dev (or equivalent).

Start Client: cd client then npm start.

2. Testing Approach and Coverage
Approach: "We utilized the Test Pyramid approach, focusing on low-level unit tests for stability and integration tests for system confidence."

Backend (Jest/Supertest): API routes were tested by mocking the Mongoose DB to isolate the controller and route logic. Validation helpers were unit-tested.

Frontend (RTL): Components were tested for correct rendering, user interaction (fireEvent), and state changes. jest-fetch-mock was used to simulate API success/failure for integration tests.

How to Run Tests:

Backend: cd server && npm test

Frontend: cd client && npm test

3. Debugging Techniques Used
Console Logging: Used extensively in both client and server for simple variable inspection and execution flow confirmation.

Chrome DevTools: Used for monitoring the client-server interaction (Network Tab) and debugging component state issues (Components Tab).

Node.js Inspector: The primary tool for complex server-side debugging, allowing for precise control over code execution via breakpoints to catch issues like unhandled promises or incorrect middleware behavior.

Error Boundary: Implemented in the client to prevent the "white screen of death" by gracefully catching rendering errors and displaying a helpful fallback UI. 
