const reviewForm = document.getElementById(-review-form);
const submitButton = document.getElementById('submit-review');

submitButton.addEventListener('click', (event) => {
    event.preventDefault();

    const rating = document.getElementById('rating').value;
    const review = document.getElementById('review-text').value;
    const propertyId = document.getElementById('property_id').value;

    const xhr = new XMLHttpRequest();

    xhr.open('POST', '/review');
    xhr.setRequestHeader('Content-Type', 'application/json');

    const requestbody = JSON.stringify({ rating, review, propertyId });

    xhr.onload = () => {
        if(xhr.status === 200) {
            alert('Review Submitted successfully!');
            window.location.href = '/review';
        } else {
            const errorMessage = xhr.responseText;
            alert(`Error: ${errorMessage}`);
        }
    };

    xhr.send(requestbody);
})