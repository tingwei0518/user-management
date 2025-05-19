# User Management System

[https://user-management-gamma-roan.vercel.app/](https://user-management-gamma-roan.vercel.app/)

A user management system built with Next.js, integrating Prisma ORM with MySQL database, providing comprehensive user information management functionality.

## Technology Stack

- **Frontend**:
  - Next.js (React 19) with App Router
    - Server Components for data fetching and rendering
    - Client Components for interactive UI elements
  - TailwindCSS 4
  - shadcn/ui component library (based on Radix UI)
  - React Hook Form + Zod for form validation
  - Sonner for notifications

- **Backend**:
  - Next.js API Routes
  - Prisma ORM
  - MySQL database
  - Cloudinary for image storage and management

- **Development Tools**:
  - TypeScript
  - ESLint
  - Prettier
  - Prisma CLI

## Data Model

The system manages the following user data:
- Name
- Phone
- Gender (Male/Female/Other)
- Birthday
- Occupation (Student/Engineer/Teacher/Unemployed)
- Profile Image

## Features

- User listing with pagination
- View user details
- Add new users
- Edit user information
- Delete users

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:
Create a `.env` file and add your database connection information:

```
DATABASE_URL="<username>:<password>@hostname:<port>/<databasename>"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="<Your Cloud Name>"
```

3. Run database migrations:

```bash
npx prisma migrate dev
```

4. Start the development server:

```bash
npm run dev
```

Access [http://localhost:3000](http://localhost:3000) to experience the application.


