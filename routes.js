const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static('public'));

const imageBankPath = path.join(__dirname, 'image-bank');

app.get('/api/next-image', async (req, res) => {
  try {
    const files = await fs.readdir(path.join(imageBankPath, 'unclassified'));
    if (files.length === 0) {
      res.json({ error: 'No more unclassified images' });
      return;
    }
    const randomFile = files[Math.floor(Math.random() * files.length)];
    res.json({ 
      imageId: randomFile,
      imagePath: `/images/unclassified/${randomFile}`
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching image' });
  }
});

app.post('/api/classify', async (req, res) => {
  const { imageId, classification } = req.body;
  const sourcePath = path.join(imageBankPath, 'unclassified', imageId);
  const destPath = path.join(imageBankPath, classification, imageId);
  
  try {
    await fs.rename(sourcePath, destPath);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Error classifying image' });
  }
});

app.post('/classify-image', async (req, res) => {
  try {
    const {classification, imagePath} = req.body;

    let fileToUpdate;
    switch (classification) {
      case 'p':
        fileToUpdate = 'positive-image-list.json';
        break;
      case 'n':
        fileToUpdate = 'negative-image-list.json';
        break;
      case 'stack':
        fileToUpdate = 'stack-image-list.json';
        break;
      default:
        throw new Error('invalid choice :(');
    }

    const targetFilePath = path.join(__dirname, fileToUpdate);
    let targetFileData = JSON.parse(await fs.readFile(targetFilePath, 'utf8'));
    targetFileData.images.push(imagePath);
    await fs.writeFile(targetFilePath, JSON.stringify(targetFileData, null, 2));

    const imageListPath = path.join(__dirname, 'image-list.json');
    let imageListData = JSON.parse(await fs.readFile(imageListPath, 'utf8'));

    imageListData.images = imageListData.images.filter(img => img !== imagePath);
    await fs.writeFile(imageListPath, JSON.stringify(imageListData, null, 2));
    res.json({success : true});
  } catch (error) {
    console.error('Error  ', error);
    res.status(500).json({success: false, error: error.message});
  }
});

app.use('/images', express.static(imageBankPath));

app.listen(3000, () => console.log('Server running on port 3000'));