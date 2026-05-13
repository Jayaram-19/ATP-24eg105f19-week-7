# BlogApp - Frontend

A modern, responsive web interface for the BlogApp platform, built with React and Vite. It offers a seamless experience for readers, writers, and administrators.

##  Features

- **Interactive UI:** Built with React and styled using Tailwind CSS for a premium, responsive look.
- **Role-Based Dashboards:** Unique interfaces and functionalities for Users, Authors, and Admins.
- **State Management:** Efficient global state handling using Zustand.
- **Article Writing:** Rich interface for authors to create and edit articles.
- **Real-time Feedback:** Integrated with `react-hot-toast` for user notifications and feedback.
- **Secure Routing:** Protected routes to ensure users only access authorized pages.
- **Form Handling:** Robust form validation and submission using React Hook Form.

##  Tech Stack

- **Framework:** React 19
- **Build Tool:** Vite
- **Styling:** Tailwind CSS 4
- **State Management:** Zustand
- **Routing:** React Router 7
- **HTTP Client:** Axios
- **Form Management:** React Hook Form

##  Project Structure

- `src/components/`: Reusable UI components and page layouts.
- `src/store/`: Zustand stores for global state management.
- `src/assets/`: Static assets like images and icons.
- `src/styles/`: Global CSS and Tailwind configurations.
- `App.jsx`: Main application routing and structure.

## ⚙️ Setup & Installation

1. **Navigate to the Frontend directory:**
   ```bash
   cd Frontend
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Environment Variables:**
   Create a `.env` file in the `Frontend` directory:
   ```env
   VITE_API_BASE_URL=http://localhost:5000
   ```
4. **Start the development server:**
   ```bash
   npm run dev
   ```

##  Pages

- **Home:** Overview of latest and featured articles.
- **Login/Register:** Secure entry points with validation.
- **User Profile:** Manage user details and reading history.
- **Author Dashboard:** Interface for writing and managing articles.
- **Admin Dashboard:** Control center for platform management.
