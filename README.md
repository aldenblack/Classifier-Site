# Classifying Fecundity Data UI

This UI is meant to help with classifying split images from the Winter 2017 dataset. Each image is a 75x75 "tile" of the original image. We use tile to refer to the image displayed on the site.

## UI Rules

You will be assigned two folders to look through and assign labels to. The UI contains the following buttons: One, two, three, unsure, and custom count. With this program, you will be classifying the number of eggs in the tile provided.
#### One, Two, and Three
Select these options if there are one, two, or three eggs in the image. 

#### Unsure
If you are unsure about the number of eggs in an image, click this. These will later be reviewed by Ken and classified accordingly.

#### Custom Count
If there are more than three eggs in the image, type the **INTEGER VALUE** of the number of eggs in the tile. Do NOT type the word equivalent of the count. Type an **integer** (please or else I will be very sad). After you type in the integer, click submit and the next image will be loaded.

#### Important: Partial Egg Counting
There is no partial egg button! If you see more than 70% of an egg in the image or you didn't _really_ have to think about if this is an egg or not, count is as an egg. If there's very little of the egg in the image (e.g. less than 20% of the egg), do not count it as an egg. If you are unsure, click "Unsure."

## Getting Started

### Dependencies

* Python >3.9.6
* Flask

### Installing & Executing the Program

#### 1. Downloading Python
* I used Python 3.12.5, so I recommend that but if your existing Python version is 3.9.6 and up, you don't need to update your Python.
* If you don't have Python, click [here]([url](https://www.python.org/downloads/)) and install it. Follow the directions that it states.

#### 2. Getting the Repository
1. Click the Green Code button in the right side and press "Download Zip," this should download the Classifier-Site repository onto your computer
2. Find which folder this has been downloaded, it is most likely in your Downloads folder

**macOS/Linux**
3. Right click on the Classifier-Site folder and press Get Info. There should be an option called "Where" containing information as to the folders the Classifier-Site directory is in.

<img width="263" alt="Screenshot 2024-12-14 at 5 56 31 PM" src="https://github.com/user-attachments/assets/98640e07-6f7c-4ef6-85b4-25cc0d3725cd" />

You should have something similar, this means that the Classifier-Site path is **/Users/shreyanakum/Downloads/Classifier-Site**
4. Open Terminal and cd into the Classifier-Site directory:
```
$ cd [your-path-to-the-Classifier-Site-directory]
```
EX) In my case, I would type **cd /Users/shreyanakum/Downloads/Classifier-Site**
5. Now, we will double check that you have all necessary files/sub-directories:
```
$ ls
additions.txt		custom_arg.py		static
backend.py		preprocessing_files
```
If your output is missing one of these files, please contact me and do not proceed.

**Windows**
3. Right click on the Classifier-Site folder and press Properties. There should be "Location" field containing  the Classifier-Site directory's path. Copy it.
4. Open Command Prompt and cd into the Classifier-Site directory:
```
> cd [your-path-to-the-Classifier-Site-directory]
```
5. Now, we will double check that you have all necessary files/sub-directories:
```
> dir
additions.txt
custom_arg.py
static
backend.py
preprocessing_files
```
If your output is missing one of these, please contact me and do not proceed.

#### 3. Pip
* If you downloaded Python from python.org (the link provided in the previous step), you should already have pip.
* If you have an older version if pip and are using **macOS or Linux**, please update it now by running (the $ is just to indicate shell, do not copy it when you run the command):
```
$ pip install --upgrade pip
```
If you are unfortunately a **Windows** user try:
```
> py -m pip install --upgrade pip
```
If neither of these worked, Google your error. If you are still having issues, contact me (Shreya). 

#### 4. Virtual Environment & Flask
* The backend of this program was written using [Flask](https://flask.palletsprojects.com/en/stable/installation/), a Python package that is a web framework with tools and libraries for building web applications (like this one)!
* Before you install Flask, you need to make a virtual environment.
**macOS/Linux**
```
$ python3 -m venv .venv
$ .venv/bin/activate
$ pip install Flask
```
**Windows:(**
```
> py -3 -m venv .venv
> .venv\Scripts\activate
> pip install Flask
```

#### 5. Execution
* You should have been emailed a two folders containing the images that you will classify. Choose one.
* The folder's structure should be where MONTH is either 3 or 2 and DAY is between 1 and 10 if MONTH is 3 or between 21 and 28 if MONTH is 2 (inclusive):
.
├── MONTH DAY
│   ├── C pops
│   └── D pops
* Choose a folder C pops or D pops.
* Do what you did when finding the path to the Classifier-Site directory to find the path of the folder you just chose again. This path you chose should end with C pops or D pops.
EX) ./MONTH DAY/C pops

Run the following command:
```
$ python3 backend.py [path-to-image-folder]
```

## Help

If you need help, email or text me, I can help with debugging your issues. Please include a screenshot of what the issue is and tell me what OS you're using.

## Authors

Shreya Nakum

[snakum@uci.edu](snakum@uci.edu)

## Version History

* 0.2
    * Added hot-keys
    * Added progress bar
    * Switched to number buttons
    * See [commit change](https://github.com/sn82978/Classifier-Site/graphs/commit-activity)
* 0.1
    * Initial Release

## License

This project is licensed under the MIT Apache License - see the LICENSE.md file for details
