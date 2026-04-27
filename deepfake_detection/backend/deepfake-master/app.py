import os
from flask import Flask, request, render_template
import numpy as np
from PIL import Image
from tensorflow.keras.models import load_model

app = Flask(__name__)

# Load trained model
# model = load_model('model/deepfake_model.h5')
model = load_model('model/final_model.keras')

def preprocess_image(image):
    # image = image.resize((128,128))
    image = image.resize((224,224))
    image = np.array(image) / 255.0
    image = np.expand_dims(image, axis=0)
    return image

@app.route('/')
def home():
    return render_template('index.html')

import os

@app.route('/predict', methods=['POST'])
def predict_route():
    file = request.files['image']

    # Save uploaded image
    file_path = os.path.join('static', file.filename)
    file.save(file_path)

    image = Image.open(file_path)

    processed = preprocess_image(image)
    prediction = model.predict(processed)

    confidence = float(prediction[0][0])

    if confidence > 0.5:
        result = f"Real Image ({confidence*100:.2f}%)"
    else:
        result = f"Fake Image ({(1-confidence)*100:.2f}%)"

    return render_template('index.html', result=result, image_path=file_path)

if __name__ == '__main__':
    app.run(debug=True)