\# Mini SaaS Template Store



A full-stack web application where users can explore website templates, search and filter by category, view template details, and manage their favorite templates.



\## Features



\- User registration and login

\- JWT-based authentication

\- Password hashing using bcrypt

\- Browse and view template details

\- Search templates by keyword

\- Filter templates by category

\- Sort templates alphabetically

\- Add and remove favorite templates

\- View saved favorites

\- Persistent favorites across sessions

\- MongoDB database integration



\## Tech Stack



\*\*Frontend:\*\* React, Vite, JavaScript, CSS, Axios



\*\*Backend:\*\* Node.js, Express.js



\*\*Database:\*\* MongoDB, Mongoose



\*\*Authentication:\*\* JWT, bcrypt



\*\*Tools:\*\* Git, GitHub, npm



\## Project Structure



```text

fullstack-intern-task/

├── client/

│   ├── public/

│   ├── src/

│   ├── package.json

│   └── vite.config.js

├── server/

│   ├── src/

│   │   ├── config/

│   │   ├── controllers/

│   │   ├── middleware/

│   │   ├── models/

│   │   └── routes/

│   ├── package.json

│   └── seedTemplates.js

├── .gitignore

└── README.md

```



\## Prerequisites



\- Node.js and npm

\- MongoDB Atlas account or a local MongoDB installation

\- Git



\## Setup Instructions



\### 1. Clone the repository



```bash

git clone https://github.com/Tsanjay05/fullstack-intern-task.git

cd fullstack-intern-task

```



\### 2. Configure the backend



```bash

cd server

npm install

```



Create a `.env` file inside the `server` directory with the following variables:



```env

MONGODB\_URI=your\_mongodb\_connection\_string

JWT\_SECRET=your\_secure\_random\_secret

PORT=5000

CLIENT\_URL=http://localhost:5173

```



Replace the example values with your own configuration. Do not commit the `.env` file.



Start the backend:



```bash

npm run dev

```



If your `server/package.json` does not define a `dev` script, use the start command configured in that file.



\### 3. Start the frontend



Open a second terminal from the project root:



```bash

cd client

npm install

npm run dev

```



Open the local URL printed by Vite, usually `http://localhost:5173`.



\## API Endpoints



| Method | Endpoint | Description |

|---|---|---|

| POST | `/api/auth/register` | Register a user |

| POST | `/api/auth/login` | Log in |

| GET | `/api/templates` | List templates |

| GET | `/api/templates/:id` | Get template details |

| POST | `/api/favorites/:templateId` | Add a favorite |

| GET | `/api/favorites` | Get the current user's favorites |

| DELETE | `/api/favorites/:templateId` | Remove a favorite |



Protected endpoints require a valid JWT bearer token.



\## Sample Templates



The application includes sample website templates across categories such as landing pages, dashboards, portfolios, e-commerce, and authentication.



\## Author



\*\*Name:\*\* Sanjay T



\*\*GitHub:\*\* \[Tsanjay05](https://github.com/Tsanjay05)



\*\*Email:\*\* tsanjay2995@gmail.com

