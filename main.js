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
        console.log(`Classifying image as: ${classification}`);
        // Here you would implement the logic to move the file
        // Since we can't directly access the file system from the browser,
        // you might need to use a different approach or technology for this part
        loadNextImage();
    }

    yesButton.addEventListener('click', () => classifyImage('p'));
    noButton.addEventListener('click', () => classifyImage('n'));
    stackButton.addEventListener('click', () => classifyImage('stack'));
});