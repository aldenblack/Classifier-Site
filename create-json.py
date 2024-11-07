import os
import json

def create_image_bank_json(directory_path):
    # Initialize a list to store relative paths of images
    image_paths = []

    # Walk through all files in the directory
    for root, dirs, files in os.walk(directory_path):
        for file in files:
            # Check if the file is an image based on common extensions
            if file.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tiff')):
                # Get the relative path to the file
                relative_path = os.path.relpath(os.path.join(root, file), start=directory_path)
                image_paths.append(f'image-bank/unclassified/{relative_path}')

    # Define the path for the JSON file
    json_path = os.path.join(directory_path, 'image-list.json')
    
    # Write the list of image paths to a JSON file
    with open(json_path, 'w') as json_file:
        json.dump(image_paths, json_file, indent=4)
    
    print(f"JSON file created at: {json_path}")

# Replace 'your_image_directory' with the path to your directory containing images
create_image_bank_json('image-bank/unclassified')