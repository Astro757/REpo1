# TourEase - Full Stack Tourism Website

TourEase is a responsive full-stack tourism web application designed to help users explore tourist attractions, book hotels and travel packages, find local guides, and read reviews.

## 🚀 Features

*   **Explore Destinations**: Browse through a dynamic list of tourist places with descriptions and images.
*   **Booking System**: Book hotels, buses, and tourist packages seamlessly.
*   **Find Guides**: Search for guides based on location and gender (Women/Men specific lists).
*   **Reviews & Ratings**: Read and write reviews for different services.
*   **Authentication**: Secure Signup and Login functionality.
*   **Responsive Design**: Modern UI with glassmorphism effects, fully compatible with mobile and desktop.

## 🛠️ Tech Stack

*   **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
*   **Backend**: Node.js, Express.js
*   **Database**: MongoDB
*   **Authentication**: JSON Web Tokens (JWT)
*   **File Handling**: Multer (for image/video uploads)

## 📦 Installation & Setup

### 1. Prerequisite
Make sure you have **Node.js** and **MongoDB** installed on your machine.

### 2. Backend Setup
1.  Navigate to the backend folder:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the server:
    ```bash
    npm run dev
    ```
    *The server will start on `http://localhost:5000`*

### 3. Frontend Setup
1.  Navigate to the frontend folder:
    ```bash
    cd frontend
    ```
2.  Open `index.html` in your browser.
    *Recommended: Use VS Code "Live Server" extension for the best experience.*

## 📂 Project Structure

```
tourEase/
│
├── backend/            # Express Server
│   ├── config/         # DB Connection
│   ├── models/         # Mongoose Schemas (User, Place, Booking, etc.)
│   ├── routes/         # API Endpoints
│   └── server.js       # Entry point
│
├── frontend/           # Client Side
│   ├── css/            # Styles
│   ├── js/             # Logic & API calls
│   └── *.html          # Pages
│
└── uploads/            # Storage for images/videos
```

## 🔑 Environment Variables
The backend uses a `.env` file (already created) with the following default values:
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/tourEase
JWT_SECRET=mysecretarykey123
```
If you have a different MongoDB setup, update the `MONGO_URI`.

## 🤝 Contributing
Feel free to open issues or submit pull requests to improve the project.
