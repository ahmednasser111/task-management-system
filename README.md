# Taskfyer

Taskfyer is a modern, full-stack task management application built with Next.js (React), Node.js, and MongoDB. It allows users to register, log in, and manage their tasks with features like priorities, due dates, and completion tracking. The app supports dark mode, responsive layouts, and admin user management.

## Features

- User authentication (register, login, logout)
- Add, edit, delete, and view tasks
- Task priorities and due dates
- Mark tasks as completed or pending
- Delete all tasks at once
- Responsive design (mobile & desktop)
- Dark mode support
- Admin panel for user management

## Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB
- **State Management:** React Context API
- **Notifications:** react-hot-toast

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- MongoDB instance (local or cloud)

### Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ahmednasser111/task-management-system.git
   cd task-management-system
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables:**

   Create a `.env` file in the `client` directory:

   ```
   NEXT_PUBLIC_SERVER_URL=http://localhost:8000
   ```

   Adjust the URL if your backend runs elsewhere.

4. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The app will be available at [http://localhost:3000](http://localhost:3000).

### Backend

Make sure to also set up and run the backend server. See the `/server` directory for backend setup instructions.

## Usage

- Register a new account or log in.
- Add, edit, or delete your tasks.
- Use the sidebar to filter tasks (All, Completed, Pending, Overdue).
- Switch between light and dark mode.
- Admin users can manage all users.

## Folder Structure

- `/app` - Next.js app directory (pages, components)
- `/context` - React Context providers for user and tasks
- `/public` - Static assets (icons, images)
- `/providers` - Layout providers

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## Author

- [Ahmed Nasser](https://github.com/ahmednasser111)
