import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
import numpy as np
from PIL import Image
import io
from datetime import timedelta

# Initialize Flask app
app = Flask(__name__)

# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///deepfake_users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'your-secret-key-change-in-production')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=30)

UPLOAD_FOLDER = 'static/uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'bmp'}
MAX_FILE_SIZE = 16 * 1024 * 1024

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = MAX_FILE_SIZE

# Initialize extensions
db = SQLAlchemy(app)
jwt = JWTManager(app)

# Enable CORS
CORS(app, resources={r"/api/*": {"origins": "*"}, r"/auth/*": {"origins": "*"}})

# ==================== DATABASE MODELS ====================

class User(db.Model):
    """User model for authentication"""
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    
    def set_password(self, password):
        """Hash and set password"""
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        """Check if provided password matches hash"""
        return check_password_hash(self.password_hash, password)
    
    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'username': self.username,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

# ==================== HELPER FUNCTIONS ====================

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def preprocess_image(image):
    """Preprocess image for model prediction"""
    image = image.resize((224, 224))
    image = np.array(image) / 255.0
    image = np.expand_dims(image, axis=0)
    return image

def mock_predict(processed_image):
    """Mock prediction for testing"""
    np.random.seed(int(processed_image.sum() * 1000) % 2**31)
    return np.array([[np.random.uniform(0.3, 0.9)]])

# ==================== AUTHENTICATION ROUTES ====================

@app.route('/auth/signup', methods=['POST'])
def signup():
    """Register a new user"""
    try:
        data = request.get_json()
        
        if not data or not data.get('email') or not data.get('password') or not data.get('username'):
            return jsonify({
                'success': False,
                'error': 'Missing required fields: email, username, password'
            }), 400
        
        email = data.get('email').lower().strip()
        username = data.get('username').strip()
        password = data.get('password')
        
        # Validate email
        if '@' not in email or '.' not in email:
            return jsonify({
                'success': False,
                'error': 'Invalid email format'
            }), 400
        
        # Validate password length
        if len(password) < 6:
            return jsonify({
                'success': False,
                'error': 'Password must be at least 6 characters'
            }), 400
        
        # Validate username length
        if len(username) < 3:
            return jsonify({
                'success': False,
                'error': 'Username must be at least 3 characters'
            }), 400
        
        # Check if user exists
        if User.query.filter_by(email=email).first():
            return jsonify({
                'success': False,
                'error': 'Email already registered'
            }), 409
        
        if User.query.filter_by(username=username).first():
            return jsonify({
                'success': False,
                'error': 'Username already taken'
            }), 409
        
        # Create new user
        user = User(email=email, username=username)
        user.set_password(password)
        
        db.session.add(user)
        db.session.commit()
        
        # Generate token
        access_token = create_access_token(identity=user.id)
        
        return jsonify({
            'success': True,
            'message': 'User created successfully',
            'user': user.to_dict(),
            'access_token': access_token
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': f'Signup failed: {str(e)}'
        }), 500

@app.route('/auth/login', methods=['POST'])
def login():
    """Login user and return JWT token"""
    try:
        data = request.get_json()
        
        if not data or not data.get('email') or not data.get('password'):
            return jsonify({
                'success': False,
                'error': 'Missing email or password'
            }), 400
        
        email = data.get('email').lower().strip()
        password = data.get('password')
        
        # Find user
        user = User.query.filter_by(email=email).first()
        
        if not user or not user.check_password(password):
            return jsonify({
                'success': False,
                'error': 'Invalid email or password'
            }), 401
        
        # Generate token
        access_token = create_access_token(identity=user.id)
        
        return jsonify({
            'success': True,
            'message': 'Login successful',
            'user': user.to_dict(),
            'access_token': access_token
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': f'Login failed: {str(e)}'
        }), 500

@app.route('/auth/me', methods=['GET'])
@jwt_required()
def get_current_user():
    """Get current authenticated user"""
    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        if not user:
            return jsonify({
                'success': False,
                'error': 'User not found'
            }), 404
        
        return jsonify({
            'success': True,
            'user': user.to_dict()
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': f'Error: {str(e)}'
        }), 500

# ==================== HEALTH CHECK ====================

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        "status": "ok",
        "message": "Backend is running",
        "model": "mock mode (testing)"
    }), 200

# ==================== PREDICTION ROUTE (PROTECTED) ====================

@app.route('/api/predict', methods=['POST'])
@jwt_required()
def predict_route():
    """
    Predict if an image is deepfake or authentic (REQUIRES AUTHENTICATION)
    Expected: multipart/form-data with 'image' field + JWT token in Authorization header
    Returns: JSON with prediction result
    """
    try:
        # Get current user (already verified by @jwt_required())
        user_id = get_jwt_identity()
        
        # Check if image file is present
        if 'image' not in request.files:
            return jsonify({
                "success": False,
                "error": "No image file provided"
            }), 400
        
        file = request.files['image']
        
        if file.filename == '':
            return jsonify({
                "success": False,
                "error": "No file selected"
            }), 400
        
        if not allowed_file(file.filename):
            return jsonify({
                "success": False,
                "error": "File type not allowed. Supported: png, jpg, jpeg, gif, bmp"
            }), 400
        
        # Read image from file stream
        try:
            image = Image.open(io.BytesIO(file.read()))
            if image.mode != 'RGB':
                image = image.convert('RGB')
        except Exception as e:
            return jsonify({
                "success": False,
                "error": f"Failed to process image: {str(e)}"
            }), 400
        
        # Preprocess and predict
        processed = preprocess_image(image)
        prediction = mock_predict(processed)
        
        confidence = float(prediction[0][0])
        
        # Determine result
        is_authentic = confidence > 0.5
        authenticity_score = (confidence * 100) if is_authentic else ((1 - confidence) * 100)
        
        result = {
            "success": True,
            "is_authentic": is_authentic,
            "confidence": round(confidence, 4),
            "authenticity_percentage": round(authenticity_score, 2),
            "label": "Real Image" if is_authentic else "Fake Image",
            "user_id": user_id
        }
        
        return jsonify(result), 200
        
    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"Internal server error: {str(e)}"
        }), 500

# ==================== ERROR HANDLERS ====================

@jwt.expired_token_loader
def expired_token_callback(jwt_header, jwt_data):
    return jsonify({
        'success': False,
        'error': 'Token has expired'
    }), 401

@jwt.invalid_token_loader
def invalid_token_callback(error):
    return jsonify({
        'success': False,
        'error': 'Invalid token'
    }), 401

@jwt.unauthorized_loader
def missing_token_callback(error):
    return jsonify({
        'success': False,
        'error': 'Authorization token is missing'
    }), 401

# ==================== DATABASE INITIALIZATION ====================

def init_db():
    """Initialize database"""
    with app.app_context():
        db.create_all()
        print("✅ Database initialized")

# ==================== MAIN ====================

if __name__ == '__main__':
    init_db()
    print("🚀 Starting Deepfake Detection Backend with Authentication...")
    print(f"🔐 Authentication: JWT (email/password)")
    print(f"📊 Model Status: Mock mode (testing)")
    print(f"🌐 Server: http://0.0.0.0:5000")
    print(f"\n📚 API Endpoints:")
    print(f"   POST   /auth/signup          - Create new account")
    print(f"   POST   /auth/login           - Login and get token")
    print(f"   GET    /auth/me              - Get current user (requires token)")
    print(f"   POST   /api/predict          - Predict deepfake (requires token)")
    print(f"   GET    /health               - Health check")
    app.run(debug=True, host='0.0.0.0', port=5000)