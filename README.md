# E-Book Platform

A full-stack web application for managing and reading electronic books. This platform provides a seamless experience for users to browse, manage, and read their favorite books online.

## 🚀 Features

- User authentication and authorization
- Book management system
- File upload with Cloudinary integration
- Responsive design for all devices
- Secure API endpoints
- User profile management

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (with Mongoose)
- JWT Authentication
- Multer for file handling
- Cloudinary for image storage

### Frontend
- React
- Vite
- Context API for state management
- Modern UI/UX design

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Setting up the Backend

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory with the following variables:
```env
PORT=8000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

4. Start the backend server:
```bash
npm run dev
```

### Setting up the Frontend

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory:
```env
VITE_API_URL=http://localhost:8000/api/v1
```

4. Start the frontend development server:
```bash
npm run dev
```

## 🌐 API Endpoints

### User Routes
- `POST /api/v1/users/register` - Register new user
- `POST /api/v1/users/login` - User login
- `GET /api/v1/users/profile` - Get user profile
- `PUT /api/v1/users/profile` - Update user profile

### Book Routes
- `GET /api/v1/books` - Get all books
- `POST /api/v1/books` - Add new book
- `GET /api/v1/books/:id` - Get book by ID
- `PUT /api/v1/books/:id` - Update book
- `DELETE /api/v1/books/:id` - Delete book

## 🔒 Environment Variables

### Backend
- `PORT` - Server port number
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret

### Frontend
- `VITE_API_URL` - Backend API URL

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Your Name - *Initial work*

## 🙏 Acknowledgments

- Hat tip to anyone whose code was used
- Inspiration
- etc

## 📞 Support

For support, email your-email@example.com or create an issue in the repository.
