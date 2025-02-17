# A simple CRUD-based Note-Making API that allows users to create, read, update, and delete notes.

## 🚀 Features
- Create a new note 📝
- Retrieve all notes 📂
- Retrieve a single note by ID 🔍
- Update an existing note ✏️
- Delete a note 🗑️
- Authentication using JWT (optional)
- Containerized with Docker 🐳

## 🛠️ Tech Stack
- **Backend Framework:** Express.js (Node.js)
- **Database:** MongoDB (or an in-memory store for simplicity)
- **Authentication:** JSON Web Tokens (JWT)
- **Containerization:** Docker
- **Version Control:** Git & GitHub
- **CI/CD:** GitHub Actions (for automated testing and deployment)

## 📌 Installation

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Docker](https://www.docker.com/) (optional)


### Install Dependencies
```bash
npm install
```

### Configure Environment Variables
Create a `.env` file in the root directory and add the following:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

## 🚀 Running the Application

### Start the Server
```bash
npm start
```

### Start with Nodemon (for development)
```bash
npm run dev
```

### Run with Docker
```bash
docker-compose up --build
```

## 📡 API Endpoints

| Method | Endpoint         | Description          |
|--------|----------------|----------------------|
| POST   | `/api/notes`   | Create a new note   |
| GET    | `/api/notes`   | Get all notes       |
| GET    | `/api/notes/:id` | Get a single note by ID |
| PUT    | `/api/notes/:id` | Update a note       |
| DELETE | `/api/notes/:id` | Delete a note       |

## ✅ Running Tests
```bash
npm test
```

## 🚀 CI/CD Pipeline
- **Linting & Testing** before merging PRs
- **Automated deployment** using GitHub Actions
- **Docker-based deployment** for consistency

## 👥 Contributors
Feel free to contribute! Fork the repository, make changes, and submit a pull request.
