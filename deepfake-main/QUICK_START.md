# Quick Start Guide

## TL;DR - Get Started in 5 Minutes

### Terminal 1: Start the Backend
```bash
cd deepfake_detection/backend/deepfake-master
pip install -r requirements.txt
python app.py
```
✅ Backend running at: `http://localhost:5000`

### Terminal 2: Start the Frontend
```bash
cd deepfake_detection/frontend
npm install
npm run dev
```
✅ Frontend running at: `http://localhost:3000`

### Then:
1. Open `http://localhost:3000` in your browser
2. Click on "Try Now" or navigate to `/prompt`
3. Upload an image to analyze
4. See the deepfake detection result!

## Detailed Setup Steps

### Prerequisites
- Python 3.8+
- Node.js 18+
- npm or yarn

### Backend Setup (Detailed)

1. **Navigate to backend folder**:
   ```bash
   cd deepfake_detection/backend/deepfake-master
   ```

2. **Create virtual environment** (recommended):
   ```bash
   python -m venv venv
   ```

3. **Activate virtual environment**:
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

5. **Verify model exists**:
   - Check if `model/final_model.keras` exists
   - If not, train it using `train.py` or `train_pretrained.py`

6. **Start the server**:
   ```bash
   python app.py
   ```
   
   Output should show:
   ```
   * Running on http://127.0.0.1:5000
   * Debug mode: on
   ```

### Frontend Setup (Detailed)

1. **Navigate to frontend folder**:
   ```bash
   cd deepfake_detection/frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Check environment configuration**:
   - Open `.env.local`
   - Verify `NEXT_PUBLIC_BACKEND_URL=http://localhost:5000`

4. **Start development server**:
   ```bash
   npm run dev
   ```
   
   Output should show:
   ```
   ▲ Next.js 16.2.0
   - Local: http://localhost:3000
   ```

## Testing the Integration

### 1. Check Backend Health
```bash
curl http://localhost:5000/health
```
Should return:
```json
{"status": "ok", "message": "Backend is running"}
```

### 2. Test Image Upload
Use Postman or curl:
```bash
curl -X POST -F "image=@test_image.jpg" http://localhost:5000/api/predict
```

Should return:
```json
{
  "success": true,
  "is_authentic": true,
  "confidence": 0.92,
  "authenticity_percentage": 92.0,
  "label": "Real Image"
}
```

### 3. Use Web Interface
1. Open http://localhost:3000
2. Go to "Try Now" → `/prompt` page
3. Upload or drag-drop an image
4. Wait for analysis
5. See result with confidence score

## File Locations

```
deepfake-main/
├── deepfake_detection/
│   ├── backend/
│   │   └── deepfake-master/
│   │       ├── app.py                 ← Main Flask app
│   │       ├── requirements.txt       ← Python dependencies
│   │       ├── model/
│   │       │   └── final_model.keras  ← Trained model
│   │       └── static/uploads/        ← Uploaded images
│   └── frontend/
│       ├── app/prompt/page.tsx       ← Detection page
│       ├── lib/api.ts                ← API client
│       ├── .env.local                ← Environment config
│       └── package.json              ← Dependencies
└── INTEGRATION_SETUP.md              ← Full documentation
```

## Common Issues & Solutions

### Backend won't start
- ✅ Check Python version: `python --version` (should be 3.8+)
- ✅ Check if port 5000 is available
- ✅ Try: `pip install --upgrade tensorflow`

### Frontend shows "Connection Error"
- ✅ Make sure backend is running
- ✅ Check `.env.local` has correct backend URL
- ✅ Try: `npm cache clean --force` then `npm install`

### Model file not found
- ✅ Check `model/final_model.keras` exists
- ✅ If not, run: `python train_pretrained.py`
- ✅ Update model path in `app.py` if needed

### Port already in use
- ✅ Backend: Change port in `app.py` → `app.run(port=5001)`
- ✅ Frontend: Change port → `npm run dev -- -p 3001`
- ✅ Update `.env.local` to match new backend port

## Next Steps

1. ✅ Both servers running?
2. ✅ Can access http://localhost:3000?
3. ✅ Can upload and analyze images?
4. ✅ See predictions working?

**Great! Integration is complete!** 🎉

For more details, see [INTEGRATION_SETUP.md](./INTEGRATION_SETUP.md)
