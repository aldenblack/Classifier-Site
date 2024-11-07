const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
app.use(express.json());

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

app.use('/images', express.static(imageBankPath));

app.listen(3000, () => console.log('Server running on port 3000'));