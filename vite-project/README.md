# E-Commerce Frontend with React & Express

This project is a full-stack e-commerce platform frontend built using modern web technologies. It features a dynamic product slider system, category-based navigation, and personalized recommendations.

## 🛠 Tech Stack

### Frontend
- **React.js**: Core UI library for building interactive components.
- **Bootstrap**: Utility-first CSS framework used for responsive layout and styling.
- **Plain CSS**: Custom styling and layout refinement.
- **JavaScript (ES6+)**: Logic and interactivity in the React components.
- **HTML5**: Markup structure for components.

### Backend
- **Express.js**: Lightweight Node.js web application framework for API handling.
- **Node.js**: JavaScript runtime for backend development.
- **SQLite**: Lightweight SQL database used for storing product and user data.

## 📦 Features
- Category-based navigation menu with dropdown submenus
- Promotional slider with navigation arrows
- Personalized product recommendations
- Recently viewed products tracking with Redux
- Quick Links to campaigns
- Electronic products carousel
- Responsive and mobile-friendly layout
- Modular component-based architecture

## 🚀 Getting Started

1. **Install Dependencies**  
   ```bash
   # Install backend dependencies
   cd /path/to/BACKEND
   npm install

   # Install frontend dependencies
   cd /path/to/vite-project
   npm install
   ```

2. **Start Backend Server**  
   ```bash
   # In the BACKEND directory
   npm run dev
   ```
   The backend server will run on http://localhost:3000

3. **Start Frontend Development Server**  
   ```bash
   # In the vite-project directory
   npm run dev
   ```
   The frontend development server will run on http://localhost:5173 (or another port if 5173 is in use)

4. **Open Application in Browser**  
   Navigate to http://localhost:5173 in your browser to view the application

## 🌐 Deployment to GitHub Pages

To deploy this project on GitHub Pages:

1. **Configure package.json and vite.config.js**
   - Already configured with base path and deployment scripts

2. **Deploy to GitHub Pages**
   ```bash
   # From the vite-project directory
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/your-repo-name.git
   git push -u origin main
   npm run deploy
   ```

3. **Access Deployed Site**
   Your site will be available at https://yourusername.github.io/your-repo-name