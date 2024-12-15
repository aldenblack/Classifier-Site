import sys
import os
import random
from flask import Flask, jsonify, request, send_from_directory

import logging
logging.basicConfig(level=logging.DEBUG)

from preprocessing_files.pruning import classify_white_spaces
from custom_arg import ArgumentError

app = Flask(__name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

n = len(sys.argv)
if (n < 2):
    raise ArgumentError("Missing directory argument.")
backend = sys.argv[0]
IMAGE_FOLDER = sys.argv[1]
if (n > 2):
    if sys.argv[2] == "pops":
        IMAGE_FOLDER = f'{IMAGE_FOLDER} pops'
    else:
        raise ArgumentError("Too many arguments, should only have backend.py argument and image bank path.")

if not os.path.isdir(IMAGE_FOLDER):
    raise ArgumentError('Image bank path must lead to a directory.')
if ('D pops' not in IMAGE_FOLDER) and ('C pops' not in IMAGE_FOLDER):
    print(IMAGE_FOLDER)
    raise ArgumentError('Folder must have a valid population directory, such as D pops or C pops inside it')

classify_white_spaces(IMAGE_FOLDER) # this takes about 1-2 minutes to run, dw about it, it's removing all white space squares


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

@app.route('/total-images', methods=['GET'])
def total_images():
    images = [f for f in os.listdir(IMAGE_FOLDER) if f.endswith('.jpg') and not f.startswith(('e')) and f.startswith(('M'))]
    return jsonify({'totalImages': len(images)})


if __name__ == '__main__':
    app.run(debug=True)