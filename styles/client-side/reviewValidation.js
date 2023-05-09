const reviewForm = document.getElementById("reviews");
const submitButton = document.getElementById('submit-review');

submitButton.addEventListener('click', (event) => {
    event.preventDefault();

    const rating = document.getElementById('ratings').value;
    const review = document.getElementById('reviewText').value;
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