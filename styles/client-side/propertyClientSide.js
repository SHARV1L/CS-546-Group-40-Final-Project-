async function bookNow(checkin,checkout,id,pp) {
    
    
    const checkInDate = new Date(checkin);
    const checkOutDate = new Date(checkout);
    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / 86400000);
    
    // Validate the dates
    if (!checkin || !checkout) {
        alert('Please enter check-in and checkout dates.');
        return;
    }
    
   // code to hit booking api // http://localhost:3000/booking //post request //send obj in req.body
            const response = await fetch('/booking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify({totalPrice: pp*nights, property_id:id, checkInDate:checkin, checkOutDate:checkout})
              }); 
            const result = await response.json();   
            
             window.location.href = `${result.redirectUrl}?bookingId=${result.booking}`;
        
}

function openMap(location, lat, lng) {

  alert('Lets open the map');
  

  const map = L.map('map').setView([lat, lng], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
      '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
  }).addTo(map);
  L.marker([lat, lng]).addTo(map)
    .bindPopup(location)
    .openPopup();

}