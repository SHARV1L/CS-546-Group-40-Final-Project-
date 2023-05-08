function initMap() {
    const apiKey = 'API Key'
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
    document.head.appendChild(script);
}

// Handle form submission
const locationForm = document.getElementById('location-form');

locationForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Get the location entered by the user
    const location = document.getElementById('location').value;

    // Use the Google Maps API to geocode the location
    const geocoder = new google.maps.Geocoder();
    const results = await geocoder.geocode({ address: location });

    if (results.length === 0) {
        throw 'Location not found, again eneter the location';
    }

    // Get the geographic coordinates of the location
    const { lat, lng } = results[0].geometry.location;

    // Display a map with a marker at the location
    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat, lng },
        zoom: 12
    });
    const marker = new google.maps.Marker({ position: { lat, lng }, map });

    // Send the location data to the server
    const response = await fetch('/save-location', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ location: location, lat: lat, lng: lng })
  });
});
