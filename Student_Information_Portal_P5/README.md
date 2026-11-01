# Student Information Portal using ExpressJS with Server-Side Validation
**Web Technology (2304362L) — Assignment 5 / Practical No. 5**

## Features
- Express routes and `express.Router()` for student records
- URL route parameter validation (`/students/:id`)
- Built-in middleware: `express.urlencoded`, `express.json`, `express.static`
- Third-party middleware: Helmet and Morgan
- Custom request-logging middleware
- Server-side validation with `express-validator`
- Centralized 404 and error-handling middleware
- EJS template engine and static CSS/JavaScript
- Responsive layout

## Requirements
- Node.js 18 or newer
- npm

## Run locally
1. Extract the project ZIP.
2. Open the project folder in VS Code.
3. Open Terminal → New Terminal.
4. Run:
   ```bash
   npm install
   npm run dev
   ```
5. Open `http://localhost:3000`.

For production-like local execution, use `npm start`.

## Routes
| Method | Path | Purpose |
|---|---|---|
| GET | `/` | Home page |
| GET | `/about` | About the practical |
| GET | `/students` | List all demo students |
| GET | `/students/new` | Student creation form |
| POST | `/students` | Validate and create a student |
| GET | `/students/:id` | Student detail; validates ID parameter |
| GET | any unknown path | Friendly 404 page |

## Test cases
1. Valid: add a name, unique PRN, valid email, and choose course/year. Expect a detail page.
2. Invalid name: enter `A` or a name containing digits. Expect HTTP 422 and validation messages.
3. Invalid PRN: enter punctuation outside letters/numbers/hyphens or reuse an existing PRN. Expect HTTP 422.
4. Invalid email: enter `abc` or reuse an existing email. Expect HTTP 422.
5. Missing route parameter record: visit `/students/9999`. Expect HTTP 404.
6. Invalid route parameter: visit `/students/abc`. Expect HTTP 400.
7. Unknown route: visit `/not-a-real-page`. Expect HTTP 404.

## Deployment to Render
1. Create a GitHub repository named `student-information-portal-p5`.
2. Upload/push this folder to GitHub. Do **not** upload `node_modules` or `.env`.
3. Sign in to Render at https://render.com and choose **New → Web Service**.
4. Connect the GitHub repository.
5. Set:
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance type:** Free (if offered to your account)
6. Click **Create Web Service** and wait for deployment to finish.
7. Open the `onrender.com` URL shown by Render.
8. Test `/`, `/students`, `/students/new`, `/students/abc`, `/students/9999`, and `/not-a-real-page`.
9. Include the deployed URL and GitHub repository URL in the Moodle submission.

### Git commands (run in the project folder)
```bash
git init
git add .
git commit -m "Build ExpressJS Student Information Portal"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/student-information-portal-p5.git
git push -u origin main
```
Replace `YOUR-USERNAME` with your GitHub username. If `origin` already exists, use `git remote set-url origin https://github.com/YOUR-USERNAME/student-information-portal-p5.git`.

## Important limitation
This assignment demo stores records in an in-memory array, so newly created students are lost whenever the server restarts or the hosting provider restarts the service. Do not enter real personal/student data. A persistent database is needed for real use.

## Suggested screenshots for report
- Home page
- Student list page
- Successful creation / student details
- Invalid name or email showing server-side validation errors
- `/students/abc` showing invalid ID handling
- `/students/9999` showing missing student handling
- Unknown route showing 404 page

## AI-use declaration
If you used an AI assistant to generate or adapt this code, disclose that honestly in the report. Check every output, run the test cases, and write in your own words what you verified and what you corrected or rejected. You must be able to explain each route, middleware, validation rule, and error handler during the viva.
