from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
import numpy as np
from PIL import Image
import io

app = Flask(__name__)
CORS(app) 
model = load_model("cats_and_dogs_classifier.h5")

def prepare_image(img):
    img = img.resize((128, 128))
    img = np.array(img) 
    img = img / 255.0
    img = img.reshape(1, 128, 128, 3) 
    return img

@app.route('/', methods=['GET'])
def HelloWorld():
    return "Hello World"

@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    print(f"Received file: {file.filename}")

    try:
        img = Image.open(io.BytesIO(file.read()))
        if img.mode != 'RGB':
            img = img.convert('RGB')
        processed = prepare_image(img)
        preds = model.predict(processed)[0][0]
        label = "Dog" if preds > 0.5 else "Cat"
        confidence = float(preds * 100) if preds > 0.5 else float((1 - preds) * 100)
        return jsonify({"label": label, "confidence": round(confidence, 2)})
    except Exception as e:
        return jsonify({"error": f"Error processing image: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True)
