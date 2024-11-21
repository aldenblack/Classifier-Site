document.addEventListener('DOMContentLoaded', () => {
    const currentImage = document.getElementById('current-image');
    const yesButton = document.getElementById('yes-button');
    const noButton = document.getElementById('no-button');
    const stackButton = document.getElementById('stack-button');

    let images = [];
    let currentIndex = 0;

    // Fetch the image list
    fetch('image-list.json')
        .then(response => response.json())
        .then(data => {
            images = data.images;
            loadNextImage();
        })
        .catch(error => console.error('Error loading image list:', error));

    function loadNextImage() {
        if (currentIndex < images.length) {
            currentImage.src = images[currentIndex];
            currentIndex++;
        } else {
            console.log('No more images to classify');
        }
    }

    function classifyImage(classification) {
        if (currentIndex > 0) {
            const imagePath = images[currentIndex - 1];
           
            // Send classification to server
            fetch('/classify-image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    classification: classification,
                    imagePath: imagePath
                }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log(`Image classified as: ${classification}`);
                    // Remove the classified image from the local array
                    images.splice(currentIndex - 1, 1);
                    currentIndex--;
                    loadNextImage();
                } else {
                    console.error('Error classifying image:', data.error);
                }
            })
            .catch(error => console.error('Error:', error));
        }
        loadNextImage();
    }

    yesButton.addEventListener('click', () => classifyImage('p'));
    noButton.addEventListener('click', () => classifyImage('n'));
    stackButton.addEventListener('click', () => classifyImage('stack'));
});