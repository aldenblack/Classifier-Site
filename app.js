document.addEventListener('DOMContentLoaded', () => {
    const currentImage = document.getElementById('current-image');
    const yesButton = document.getElementById('yes-button');
    const noButton = document.getElementById('no-button');
    const stackButton = document.getElementById('stack-button');

    let currentImageId = null;

    function loadNextImage() {
        fetch('/api/next-image')
            .then(response => response.json())
            .then(data => {
                currentImage.src = data.imageUrl;
                currentImageId = data.imageId;
            })
            .catch(error => console.error('Error loading next image:', error));
    }

    function classifyImage(classification) {
        fetch('/api/classify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imageId: currentImageId, classification: classification })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                loadNextImage();
            } else {
                console.error('Classification failed:', data.error);
            }
        })
        .catch(error => console.error('Error classifying image:', error));
    }

    yesButton.addEventListener('click', () => classifyImage('p'));
    noButton.addEventListener('click', () => classifyImage('n'));
    stackButton.addEventListener('click', () => classifyImage('stack'));

    // Load the first image when the page loads
    loadNextImage();
});