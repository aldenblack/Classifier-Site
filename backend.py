import os
import random
from flask import Flask, jsonify, request, send_from_directory
import logging
logging.basicConfig(level=logging.DEBUG)
from preprocessing_files.pruning import classify_white_spaces

app = Flask(__name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
IMAGE_FOLDER = "/Users/shreyanakum/Downloads/Classifier-Site/image-bank/D pops" #r"C:\Users\droso\Documents\Image-Splitting\2 21\C pops" #os.path.join(BASE_DIR, 'image-bank')#r"C:\Users\droso\Documents\Classifier-Site\image-bank"

classify_white_spaces(IMAGE_FOLDER)

@app.route('/')
def index():
    return send_from_directory(os.path.join(os.path.dirname(__file__), 'static'), 'index.html')

@app.route('/static/<path:filename>')
def static_files(filename):
    return send_from_directory(os.path.join(os.path.dirname(__file__), 'static'), filename)

def get_next_image():
    images = [f for f in os.listdir(IMAGE_FOLDER) if f.endswith('.jpg') and not f.startswith(('e')) and f.startswith(('M'))]
    return random.choice(images) if images else None

@app.route('/next-image', methods=['GET'])
def next_image():
    image = get_next_image()
    if image:
        return jsonify({'imagePath': f'/images/{image}'})
    return jsonify({'error': 'No more images available'}), 404

@app.route('/categorize', methods=['POST'])
def categorize():
    data = request.json
    old_name = data['imageName']
    category = data['category']
    new_name = f"{category}{old_name}"
   
    old_path = os.path.join(IMAGE_FOLDER, old_name)
    new_path = os.path.join(IMAGE_FOLDER, new_name)
   
    try:
        os.rename(old_path, new_path)
        return jsonify({'success': True})
    except Exception as e:
        logging.error(f"Error in categ:  {str(e)}")
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/images/<path:filename>')
def serve_image(filename):
    return send_from_directory(IMAGE_FOLDER, filename)

if __name__ == '__main__':
    app.run(debug=True)