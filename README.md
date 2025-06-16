# How to set up this project

1. Install Node.js and Git using following command in PowerShell as admin:
   ```
   winget install OpenJS.NodeJS.LTS Git.Git
   ```
2. Clone this repository
   ```
    git clone https://github.com/mahbd/simple-exam.git
   cd simple-exam
   ```
3. Run the following commands to finish setting up the project:
   ```bash
   npm install
   npx prisma db push
   npm run build
   ```

# How to use this as server

## Using mobile hotspot

1. Open the terminal in the project folder.
2. Run the following commands:
   ```bash
   $Env:ADMIN_USERNAME="admin"; $Env:ADMIN_PASSWORD="secPass"; npm start
   ```
3. Turn on Mobile Hotspot on your computer.
4. Connect other devices to the hotspot.
5. Go to "http://192.168.137.1:3000" on the other devices.

## Using existing router

1. Make sure given desired port is open on the router.
2. Open the terminal in the project folder.
3. Run the following command to get the ip address of the computer.:
   ```bash
   ipconfig
   ```
4. Run the following commands:
   ```bash
   $Env:ADMIN_USERNAME="admin"; $Env:ADMIN_PASSWORD="secPass"; npx next start -- -H ip_address
   ```
5. Go to "http://ip_address:3000" on the other devices.

## Features

- Interactive exam system allowing students to take tests online with time tracking and real-time feedback.
- Admin panel for managing tests, questions, and examinees with search, filter, pagination, and CRUD operations.
- Audio cues for correct and incorrect answers during exams using native audio playback.
- Client-side form validation powered by Zod and React Hook Form for robust input handling.
- Secure authentication for admin users via environment-backed credentials and Next.js server actions.
- Responsive UI built with Tailwind CSS and DaisyUI components.
- Server-side data fetching and mutations with Next.js app router and Prisma ORM.

## Usage Guide

1. Clone the repository and install dependencies:
   ```powershell
   git clone https://github.com/mahbd/simple-exam.git
   cd simple-exam
   npm install
   npx prisma db push
   npm run build
   ```

2. Set up environment variables for admin credentials:
   ```powershell
   $Env:ADMIN_USERNAME="admin"
   $Env:ADMIN_PASSWORD="secPass"
   ```

3. Run the application in development mode:
   ```powershell
   npm run dev
   ```

4. Access the application:
   - Student interface: http://localhost:3000
   - Admin interface: http://localhost:3000/admin (login required)

5. Admin workflows:
   - **Manage Tests:** Create, edit, and delete tests under `/admin/tests`.
   - **Manage Questions:** Add, modify, or remove questions under `/admin/questions` and assign them to tests.
   - **Manage Examinees:** View and delete examinee records under `/admin/examinees`.

6. Taking an exam:
   - On the home page, fill out your information and select a test.
   - Answer questions one by one, receive immediate feedback via audio cues, and track time elapsed.
   - View detailed results and performance summary on completion.

## Technical Details

- **Framework:** Next.js 13 (App Router) with React Server Components and Client Components.
- **ORM:** Prisma connecting to a SQLite (default) or any supported database (PostgreSQL, MySQL, etc.).
- **Validation:** Zod schemas ensure data integrity on both client and server sides.
- **Styling:** Tailwind CSS with DaisyUI plugin for component styling and utility classes.
- **API:** Next.js Server Actions (`"use server"`) for secure CRUD operations.
- **State Management:** React Hook Form for form state, localStorage for persisting student info.
- **Authentication:** Environment-backed credentials stored via HTTP-only cookies with Next.js `next/headers`.
