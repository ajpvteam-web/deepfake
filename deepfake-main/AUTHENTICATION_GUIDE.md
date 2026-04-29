# Authentication Setup Guide

This application now includes JWT-based authentication with email/password.

## Backend Authentication

### Features
- ✅ JWT token-based authentication
- ✅ Bcrypt password hashing
- ✅ SQLite database for user storage
- ✅ Protected API endpoints
- ✅ Token expiration (30 days)

### Authentication Endpoints

**POST /auth/signup**
- Register a new user
- Required fields: `email`, `username`, `password`
- Returns: `access_token` and user info

**POST /auth/login**
- Login with email and password
- Required fields: `email`, `password`
- Returns: `access_token` and user info

**GET /auth/me**
- Get current authenticated user (requires valid token)
- Header: `Authorization: Bearer <token>`
- Returns: Current user info

**POST /api/predict** (PROTECTED)
- Predict deepfake (requires authentication)
- Header: `Authorization: Bearer <token>`
- Body: multipart/form-data with image file

## Frontend Authentication

### Features
- ✅ Login page with form validation
- ✅ Signup page with email/username/password
- ✅ Auth context for global state management
- ✅ Protected routes (redirect to login if not authenticated)
- ✅ Auto token refresh on page load
- ✅ Logout functionality

### Pages
- `/auth/login` - Login page
- `/auth/signup` - Signup page
- `/prompt` - Protected detection page (requires login)

### Environment Configuration
```
# .env.local
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

## Installation & Running

### Backend Setup

1. **Install dependencies**:
   ```bash
   cd deepfake_detection/backend/deepfake-master
   pip install -r requirements.txt
   ```

2. **Start the server**:
   ```bash
   python app.py
   ```

The backend will:
- Create SQLite database: `deepfake_users.db`
- Initialize database tables
- Run on `http://localhost:5000`

### Frontend Setup

1. **Install dependencies**:
   ```bash
   cd deepfake_detection/frontend
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

The frontend will run on `http://localhost:3000`

## Testing Authentication

### Create Test Account

1. Go to **http://localhost:3000/auth/signup**
2. Fill in the form:
   - Email: `test@example.com`
   - Username: `testuser`
   - Password: `test123456`
3. Click "Create Account"
4. You'll be redirected to the detector page

### Login with Test Account

1. Go to **http://localhost:3000/auth/login**
2. Enter credentials:
   - Email: `test@example.com`
   - Password: `test123456`
3. Click "Sign In"
4. Upload an image to test the detection

### Test with cURL

**Signup:**
```bash
curl -X POST http://localhost:5000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "username": "myuser",
    "password": "password123"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

**Predict (with token):**
```bash
curl -X POST http://localhost:5000/api/predict \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -F "image=@test_image.jpg"
```

## Database

The backend uses SQLite for user storage:
- **Database file**: `deepfake_users.db` (auto-created)
- **Tables**: 
  - `user` - Stores user account information

### User Schema
```sql
CREATE TABLE user (
    id INTEGER PRIMARY KEY,
    email VARCHAR(120) UNIQUE NOT NULL,
    username VARCHAR(80) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

## Security Considerations

### Current Implementation
- ✅ Password hashing with bcrypt
- ✅ JWT token for stateless authentication
- ✅ CORS enabled for frontend communication
- ✅ Token expiration set to 30 days

### Production Recommendations
- ⚠️ Change `JWT_SECRET_KEY` environment variable
- ⚠️ Use environment variables for sensitive config
- ⚠️ Enable HTTPS in production
- ⚠️ Implement rate limiting on auth endpoints
- ⚠️ Add email verification for signup
- ⚠️ Implement refresh token rotation
- ⚠️ Add password reset functionality
- ⚠️ Use a production database (PostgreSQL, MySQL)

## Troubleshooting

### "Authentication token is missing"
- Make sure you're logged in
- Token is stored in localStorage
- Check browser console for errors

### "Token has expired"
- Logout and login again to get a new token
- Tokens expire after 30 days

### "Invalid email or password"
- Check that email and password are correct
- Email is case-insensitive

### "Email already registered"
- User with this email already exists
- Try logging in or use a different email

### "Connection error" from frontend
- Verify backend is running: `http://localhost:5000/health`
- Check `NEXT_PUBLIC_BACKEND_URL` in `.env.local`
- Ensure CORS is enabled on backend

## API Response Examples

### Successful Login
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "username": "myuser",
    "created_at": "2026-04-29T10:30:00"
  },
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

### Failed Login
```json
{
  "success": false,
  "error": "Invalid email or password"
}
```

### Successful Prediction
```json
{
  "success": true,
  "is_authentic": true,
  "confidence": 0.9234,
  "authenticity_percentage": 92.34,
  "label": "Real Image",
  "user_id": 1
}
```

### Protected Route Error
```json
{
  "success": false,
  "error": "Authorization token is missing"
}
```

## Next Steps

- [ ] Add email verification
- [ ] Implement password reset
- [ ] Add social login (Google, GitHub)
- [ ] Create user dashboard/history
- [ ] Implement rate limiting
- [ ] Add 2FA (Two-Factor Authentication)
- [ ] Create admin panel
- [ ] Add prediction history
