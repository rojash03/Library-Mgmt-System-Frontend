# Library Management System - Frontend

This is the frontend for the Library Management System, built with React and Tailwind CSS.

## Features
- User authentication (login/register)
- Role-based dashboards for Librarian and Borrower
- Book management: add, edit, delete, borrow, and return books
- Borrow records and statistics
- Toast notifications for user feedback (using react-toastify)
- Responsive and modern UI

## Getting Started

### Prerequisites
- Node.js and npm installed
- Backend API running (see backend repo for details)

### Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/rojash03/Library-Mgmt-System-Frontend.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Library-Mgmt-System-Frontend/my-app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the App
```bash
npm start
```
The app will run on `http://localhost:3000` by default.

## Environment Variables
- API endpoints are hardcoded for demo. Update them in `/src/Config/config.js` if needed.

## Main Libraries Used
- React
- React Router
- Axios
- Tailwind CSS
- react-toastify

## Folder Structure
- `src/Pages/` - Main pages (Login, Dashboard, Books, Profile, etc.)
- `src/Components/` - Reusable components (Sidebar, BookList, etc.)
- `src/Context/` - Context providers (auth)
- `src/Config/` - API config
- `src/Utills/` - Utility functions (logout, protectedRoute)

## Customization
- Update logo and branding in `/public/` and `/src/Components/nav.jsx`
- Adjust styles in `tailwind.config.js` and CSS files

## Feedback & Issues
Open an issue or pull request for bugs, suggestions, or improvements.

---

© 2025 Library Management System. All rights reserved.
