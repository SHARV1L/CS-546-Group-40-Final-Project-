async function bookNow(checkin,checkout,id,pp) {
    
    alert('bookNow!');

    console.log("$",id,checkin,checkout);
    const checkInDate = new Date(checkin);
    const checkOutDate = new Date(checkout);
    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / 86400000);
    console.log("Days:",nights);
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
                body: JSON.stringify({totalPrice:pp*nights,property_id:id,checkInDate:checkin,checkOutDate:checkout})
              }); 
            const result = await response.json();   
            
             window.location.href = result.redirectUrl;
        
}