# Easygenerator Full Stack Test Task - User Authentication

This project implements a basic user authentication module with a **Next.js** frontend and a **Nest.js** backend. Users can sign up, log in, and access a welcome page after authentication.

## Folder Structure

```bash
.
├── frontend/            # Next.js frontend app
└── backend/             # Nest.js backend API
```

## Tech Stack

### Frontend
- **Next.js 14** (with App Directory)
- **Tailwind CSS**: Styling
- **Formik & Yup**: Form handling and validation
- **Jose**: JWT decoding
- **Context API**: Global state management
- **pnpm**: Package manager

### Backend
- **Nest.js**: Backend framework
- **MongoDB**: Database
- **Mongoose**: ORM
- **Winston**: Logging
- **pnpm**: Package manager

## Setup

### Frontend

1. Navigate to `frontend/` and install dependencies:
   ```bash
   cd frontend
   pnpm install
   ```

2. Run the development server:
   ```bash
   pnpm dev
   ```

Frontend runs at `http://localhost:3000`.

### Backend

1. Navigate to `backend/` and install dependencies:
   ```bash
   cd backend
   pnpm install
   ```

2. Set up environment variables in `.env`. First create a `.env` file in root of `backend` directory, then copy and paste content from `.env.example` file to `.env`, then add value for following variables:
   ```bash
   MONGO_DB_URI=
   MONGO_DB_DATABASE=
   ```

3. Run the backend server:
   ```bash
   pnpm start:dev
   ```

Backend runs at `http://localhost:3333`.

## Notes

- Frontend: Sign-up and sign-in forms with form validation.
- Backend: Handles authentication via JWT, with secure password hashing.
- Ensure both apps run on `localhost:3000` (frontend) and `localhost:3333` (backend) to avoid CORS issues.
- I stored auth token in cookie with `httpOnly : false` to avoid direct access of token on client side, we can only access this from server components or server compatible files like `routes` or `actions` files.

## Regarding Nice to Have points

- The project uses `TypeScript` for better type safety.
- `Winston` is configured for logging API requests and responses, including error handling.
- Security best practices are followed for password hashing and `JWT` usage. Store JWT in `Cookies`.
