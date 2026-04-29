# Frontend-Backend Integration Guide

This document explains how to run the integrated Deepfake Detection application.

## Architecture

- **Backend**: Flask REST API running on `http://localhost:5000`
- **Frontend**: Next.js application running on `http://localhost:3000`
- **Communication**: RESTful API with CORS enabled

## Backend Setup

### 1. Install Python Dependencies

Navigate to the backend directory:
```bash
cd deepfake_detection/backend/deepfake-master
```

Install required packages:
```bash
pip install -r requirements.txt
```

Or manually install:
```bash
pip install Flask==2.3.3 flask-cors==4.0.0 numpy==1.24.3 Pillow==10.0.0 tensorflow==2.13.0 Werkzeug==2.3.7
```

### 2. Prepare Model File

Ensure the model file exists at the expected location:
- `model/final_model.keras` (or adjust the path in `app.py`)

If the model doesn't exist, you may need to:
1. Train the model using `train.py` or `train_pretrained.py`
2. Copy the trained model to the `model/` directory

### 3. Start the Backend Server

```bash
python app.py
```

The server will start at `http://localhost:5000`

You can verify it's running by visiting: `http://localhost:5000/health`

Expected response:
```json
{
  "status": "ok",
  "message": "Backend is running"
}
```

## Frontend Setup

### 1. Install Node Dependencies

Navigate to the frontend directory:
```bash
cd deepfake_detection/frontend
```

Install dependencies:
```bash
npm install
```

### 2. Configure Backend URL

The backend URL is configured in `.env.local`:
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

Update this if your backend is running on a different URL.

### 3. Start the Frontend Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## API Endpoints

### Backend API Endpoints

#### Health Check
- **URL**: `GET /health`
- **Purpose**: Check if backend is running
- **Response**:
```json
{
  "status": "ok",
  "message": "Backend is running"
}
```

#### Image Prediction
- **URL**: `POST /api/predict`
- **Content-Type**: `multipart/form-data`
- **Parameters**:
  - `image` (File): Image file to analyze
- **Response** (Success):
```json
{
  "success": true,
  "is_authentic": true,
  "confidence": 0.9234,
  "authenticity_percentage": 92.34,
  "label": "Real Image"
}
```
- **Response** (Error):
```json
{
  "success": false,
  "error": "Error message describing what went wrong"
}
```

## Usage Flow

1. **User uploads an image** via the web interface
2. **Frontend** reads the image and sends it to `POST /api/predict`
3. **Backend** processes the image:
   - Validates file type and size
   - Resizes to 224x224
   - Normalizes pixel values
   - Runs model prediction
4. **Backend** returns prediction result
5. **Frontend** displays:
   - ✅ Authentic / ⚠️ Deepfake label
   - Confidence percentage
   - Authenticity score

## Supported Image Formats

- PNG
- JPG / JPEG
- GIF
- BMP
- WEBP (via PIL)

**Max file size**: 16MB

## Troubleshooting

### Backend Connection Error
If you see "Connection error" in the frontend:
- Verify backend is running: `http://localhost:5000/health`
- Check `NEXT_PUBLIC_BACKEND_URL` in `.env.local`
- Ensure Flask CORS is enabled (it should be by default)

### Model Not Found
If you see "model/final_model.keras not found":
- Check the model file location in `app.py`
- Run training scripts to generate the model
- Update the path in `app.py` if needed

### CORS Issues
The backend has CORS enabled for all origins. If you still get CORS errors:
- Check browser console for specific error messages
- Verify the frontend and backend are on different ports
- Clear browser cache and hard reload

### Large File Upload Fails
If uploads fail for large files:
- Check the `MAX_FILE_SIZE` setting in `app.py` (currently 16MB)
- Ensure both frontend and backend have matching size limits
- Check server timeout settings

## Performance Notes

- Model prediction typically takes 2-5 seconds
- Ensure sufficient RAM for TensorFlow (recommend 4GB+)
- GPU support can significantly speed up predictions

## Deployment

For production deployment:

1. **Backend**:
   - Use a production WSGI server (e.g., Gunicorn)
   - Set `debug=False` in `app.py`
   - Use environment variables for configuration
   - Implement proper error logging

2. **Frontend**:
   - Build: `npm run build`
   - Set production backend URL in environment
   - Deploy with: `npm run start`

## Development

### Frontend File Structure
- `app/prompt/page.tsx` - Main detection page
- `lib/api.ts` - Backend API client
- `components/ui/*` - Reusable UI components

### Backend File Structure
- `app.py` - Main Flask application
- `model/final_model.keras` - Trained model file
- `static/uploads/` - Uploaded images storage

### Making API Changes
If you modify the API:
1. Update endpoint in `app.py`
2. Update corresponding function in `lib/api.ts`
3. Update frontend component that uses the API
4. Test both frontend and backend

## Additional Resources

- Flask Documentation: https://flask.palletsprojects.com/
- Next.js Documentation: https://nextjs.org/docs
- TensorFlow Documentation: https://www.tensorflow.org/
- CORS Guide: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
