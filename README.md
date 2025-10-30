# LinkNest - Social Media App

A modern full-stack social media application built with React and Node.js.

## Features

- 🔐 User Authentication (Signup/Login)
- 📝 Create, Read, Delete Posts
- ❤️ Like/Unlike Posts
- 💬 Comment System (Add/Delete Comments)
- 👤 User Profiles (View & Edit)
- 📱 Mobile Responsive Design
- 🎨 Modern UI with Toast Notifications
- ⚡ Loading Skeletons
- 🎯 Smooth Animations & Hover Effects

## Tech Stack

### Frontend
- React.js
- React Router
- Axios
- CSS3 with custom animations

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing

## Project Structure

```
FULL STACK APP/
├── backend/
│   ├── config/
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Post.js
│   │   └── user.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── posts.js
│   │   └── users.js
│   ├── .env
│   ├── package.json
│   └── server.js
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── LoadingSkeleton.js
    │   │   ├── ProtectedRoute.js
    │   │   └── Toast.js
    │   ├── context/
    │   │   └── Authcontext.js
    │   ├── pages/
    │   │   ├── Feed.js
    │   │   ├── Login.js
    │   │   ├── Profile.js
    │   │   └── Signup.js
    │   ├── utils/
    │   │   └── api.js
    │   ├── App.js
    │   └── index.js
    └── package.json
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB
- Git

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

4. Start the server:
```bash
npm start
```

Server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

Frontend will run on `http://localhost:3000`

## Environment Variables

### Backend (.env)
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `PORT` - Server port (default: 5000)

### Frontend
The frontend connects to backend at `http://localhost:5000/api` by default.
For production, update the API URL in `src/utils/api.js`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### Posts
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create a post (auth required)
- `DELETE /api/posts/:id` - Delete a post (auth required)
- `PUT /api/posts/:id/like` - Like a post (auth required)
- `PUT /api/posts/:id/unlike` - Unlike a post (auth required)
- `POST /api/posts/:id/comments` - Add comment (auth required)
- `DELETE /api/posts/:id/comments/:commentId` - Delete comment (auth required)

### Users
- `GET /api/users/:id` - Get user profile
- `GET /api/users/me/profile` - Get current user profile (auth required)
- `PUT /api/users/profile` - Update profile (auth required)

## Features Showcase

### Authentication System
- Secure password hashing with bcryptjs
- JWT token-based authentication
- Protected routes
- Persistent login with localStorage

### User Profiles
- View any user's profile
- Edit your own profile (name, bio, avatar)
- Change password
- View user's posts

### Posts & Interactions
- Create posts with text content
- Like/unlike posts
- Add comments
- Delete your own posts and comments
- Real-time post feed

### Mobile Responsive
- Hamburger menu on mobile
- Touch-friendly interface
- Responsive layout
- Optimized for all screen sizes

### UI Enhancements
- Toast notifications for user feedback
- Loading skeletons while fetching data
- Smooth animations and transitions
- Custom scrollbar
- Hover effects on interactive elements

## Deployment

### Backend Deployment (Render/Railway/Heroku)
1. Push code to GitHub
2. Create new web service
3. Connect GitHub repository
4. Add environment variables
5. Deploy

### Frontend Deployment (Vercel/Netlify)
1. Build production version: `npm run build`
2. Deploy build folder
3. Update API URL to production backend

## Contributing

Feel free to fork this project and submit pull requests!

## License

MIT License

## Author

Built with ❤️ using React and Node.js

---

**Happy Coding!** 🚀
