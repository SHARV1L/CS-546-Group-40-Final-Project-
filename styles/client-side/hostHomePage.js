async function uploadImage() {
    const imageInput = document.getElementById('imageInput');
    if (imageInput.files && imageInput.files[0]) {
      const imageFile = imageInput.files[0];
      const base64Image = await convertImageToBase64(imageFile);

      // Make an HTTP request to your server to upload the image
      const response = await fetch('/upload-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageData: base64Image }),
      });

      // Handle the response from the server
      if (response.ok) {
        location.reload(); // Reload the page to show the uploaded image
      } else {
        alert('Failed to upload image');
      }
    } else {
      alert('Please select an image');
    }
  }

  function convertImageToBase64(imageFile) {
    return new Promise((resolve) => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.readAsDataURL(imageFile);
    });
  }

const postButton = document.getElementById('post-property');
postButton.addEventListener('click', function() {
  window.location.href = '/host/post_property';
});
  const personalDetailsButton = document.getElementById('personal-details');
  personalDetailsButton.addEventListener('click', function() {
  window.location.href = '/host/personaldetails';
});
  const viewPropertyButton = document.getElementById('view-property');
  viewPropertyButton.addEventListener('click', function() {
  window.location.href = '/host/viewProperty';
});