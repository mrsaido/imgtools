// Function to download YouTube thumbnail
function downloadYouTubeThumbnail(videoId) {
    const apiKey = '325354895eaedf47a2d72cb8ef3d9de8f1b5cf75';
    const apiUrl = 'https://sdk.photoroom.com/v1/segment';
    const thumbnailImage = document.getElementById('thumbnail-image');

    // Create a FormData object to send the image file
    const formData = new FormData();
    formData.append('image_file', new Blob([videoId], { type: 'image/jpeg' }));

    // Set up the headers for the request
    const headers = {
        'x-api-key': apiKey,
    };

    // Make the API request using the fetch function
    fetch(apiUrl, {
        method: 'POST',
        headers: headers,
        body: formData,
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.blob();
        })
        .then((blob) => {
            // Handle the API response here, e.g., set it as the thumbnail image
            thumbnailImage.src = URL.createObjectURL(blob);
        })
        .catch((error) => {
            console.error('API request failed:', error);
        });
}

// YouTube Thumbnail Downloader
document.getElementById('download-thumbnail').addEventListener('click', function () {
    const videoUrl = document.getElementById('video-url').value;
    const videoId = extractVideoId(videoUrl);
    if (videoId) {
        downloadYouTubeThumbnail(videoId); // Call the function to download the thumbnail
    } else {
        alert('Invalid YouTube URL');
    }
});
