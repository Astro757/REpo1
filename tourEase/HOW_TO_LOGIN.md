# 🔐 How to Login to TourEase

Since this is a fresh installation, the database is initially empty. There are no default accounts. You must create an account first.

### 📝 Step 1: Start the Backend
Ensure your backend server is running and connected to MongoDB.
1. Open a terminal in the `backend` folder.
2. Run `npm run dev`.
3. Ensure you see `MongoDB Connected` in the terminal.

### 🆕 Step 2: Create an Account (Sign Up)
1. Open the website (open `frontend/index.html` or click **Sign In** on the nav bar).
2. Click on the **"Sign Up"** link at the bottom of the Login form (or go to `signup.html`).
3. Fill in your details:
   - **Name**: e.g., `John Doe`
   - **Email**: e.g., `john@example.com`
   - **Password**: e.g., `123456`
4. Click the **Sign Up** button.
5. If successful, you will be automatically logged in and redirected to the home page.

### ↩️ Step 3: Logging In
If you are returning to the site:
1. Click **Sign In** in the top navigation bar.
2. Enter the email and password you used during registration.
   - **Email**: `john@example.com`
   - **Password**: `123456`
3. Click **Login**.

### 👤 Admin Access (Optional)
To create an admin account (to add places/guides), you currently need to manipulate the database or use a tool like Postman to send a signup request with `"role": "admin"`, or manually update the document in MongoDB Compass.
*By default, all signups via the frontend are regular `user` accounts.*

### 🐞 Troubleshooting
- **"Login Failed"**: Check if the backend is running. Open the browser console (F12) to see if there are connection errors (e.g., `net::ERR_CONNECTION_REFUSED`).
- **"Server Error"**: Ensure MongoDB is running on your system.
