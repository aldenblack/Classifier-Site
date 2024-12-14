# removes white squares from the split image folders

import os

def classify_white_spaces(dir):
    files = os.listdir(dir)
    for filename in files:
        filepath = os.path.join(dir, filename)
        if os.path.isfile(filepath) and (filename[0] != "e"):
            file_size_kb = os.stat(filepath).st_size / 1024
            if file_size_kb <= 1.46:
                new_name = f"eggs0count{filename}"
                new_path = os.path.join(dir, new_name)
                os.rename(filepath, new_path)

if __name__ == '__main__':
    classify_white_spaces("/Users/shreyanakum/Downloads/Classifier-Site/image-bank/D pops")