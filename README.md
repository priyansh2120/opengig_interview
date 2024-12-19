# Task Timer Application

A full-stack application created in 1.5 hours during interview that allows users to manage tasks with a timer feature. Users can add tasks, start and pause a timer for each task, and mark tasks as complete. The app uses React for the frontend, Express for the backend, and MongoDB for data storage.

## Features

- Add tasks with titles and descriptions
- Start and pause a timer for each task
- View active time for each task
- Mark tasks as completed, which disables further actions for that task
- React app deployed as a static site with Express backend serving the API and static files

## Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Express.js, Node.js
- **Database**: MongoDB
- **Others**: Axios (for API calls), CORS (for cross-origin requests)

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/priyansh2120/opengig_interview.git
cd opengig_interview
```

### 2. Install dependencies

For the client:
```bash
cd client
npm install
```

For the server:
```bash
cd server
npm install
```

### 3. Build the frontend

In the client folder:
```bash
npm run build
```

### 4. Configure Environment Variables

Create a `.env` file in the server folder and add:
```bash
MONGO_URI=your_mongo_db_connection_string
```

Replace `your_mongo_db_connection_string` with your actual MongoDB connection URI.

### 5. Start the server

In the server folder:
```bash
npm start
```

### 6. Access the application

Visit the application at `http://localhost:3002`. The backend will serve both the React app and API endpoints.

## API Routes

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/tasks` | Create a new task |
| GET | `/tasks` | Get all tasks |
| PUT | `/tasks/:id` | Update an existing task |

## License

This project is licensed under the MIT License.

## Acknowledgements

- Express for the backend framework
- MongoDB for the database
- React for the frontend framework
- Tailwind CSS for styling