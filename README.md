# LINKOVA - Social Media App

# 🚀 LINKOVA - Social Media Platform

A modern full-stack social media application built with the MERN stack.

## 🌐 Live Demo

**🔗 Try it now:** [https://linkova.netlify.app](https://69037ac26b50c8b93d22fc5b--linkova.netlify.app/)

### Deployment Status
- ✅ Frontend: Deployed on Netlify
- ✅ Backend: Deployed on Render
- ✅ Database: MongoDB Atlas

---

## ✨ Features

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

---

## 🚀 Quick Start

### Prerequisites

- Node.js (v14+)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/AADHIASARANATAMIZHINIAN/MERN_LINKOVA.git
cd MERN_LINKOVA
```

2. **Setup Backend**

```bash
cd backend
npm install
```

Create `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
CLIENT_URL=http://localhost:3000
```

Start backend:

```bash
npm start
```

3. **Setup Frontend**

```bash
cd ../frontend
npm install
```

Create `.env` file:

```env
REACT_APP_API_URL=http://localhost:5000
```

Start frontend:

```bash
npm start
```

4. **Open** http://localhost:3000

---

## 📁 Project Structure

```
MERN_LINKOVA/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Post.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── posts.js
│   │   └── users.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── Feed.js
│   │   │   ├── Login.js
│   │   │   ├── Signup.js
│   │   │   └── Profile.js
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

---

## 🌐 Deployment

### Frontend (Netlify)
- Automatic deployments from `main` branch
- Environment variable: `REACT_APP_API_URL`

### Backend (Render)
- Automatic deployments from `main` branch
- Environment variables: `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL`

### Database (MongoDB Atlas)
- Cloud-hosted MongoDB cluster

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the MIT License.

---

## 👨‍💻 Author

**Aadhiasarana Tamizhinian**
- GitHub: [@AADHIASARANATAMIZHINIAN](https://github.com/AADHIASARANATAMIZHINIAN)

---

## 🙏 Acknowledgments

- MongoDB for database hosting
- Netlify for frontend hosting
- Render for backend hosting
- GitHub for version control

---

**⭐ Star this repo if you like it!**

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


---

## ✨ Features

- 🔐 User Authentication (JWT)
- 📝 Create, Read, Update, Delete Posts
- ❤️ Like/Unlike Posts
- 💬 Comment on Posts
- 👤 User Profiles with Bio & Avatar
- 📱 Fully Mobile Responsive
- 🎨 Modern Professional UI
- 🔔 Toast Notifications
- ⚡ Loading States & Animations

---

## 🛠️ Tech Stack

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
