function bookNow() {

    alert('bookNow!');

    console.log("$",data);
    const checkInDate = new Date(document.getElementById(req.body.checkin));
    const checkOutDate = new Date(document.getElementById(req.body.checkout));
    const days = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / 86400000);
        
    // Validate the dates
    if (!checkin || !checkout) {
        alert('Please enter check-in and checkout dates.');
        return;
    }
    
    // obj = {
    //      //"totalPrice": totalPrice, //calculate totalPrice*(checkout-checkin)
    //     "checkInDate": checkInDate,
    //     "checkOutDate": checkOutDate,
    //       //"property_id": propertyDetails.id
    // }

    res.redirect('./booking?checkin=${checkin}&checkout=${checkout}', {checkInDate: checkInDate, checkOutDate: checkOutDate});
    window.location.href = url;
            // code to hit booking api // http://localhost:3000/booking //post request //send obj in req.body
            //const result = await response.json();   
            
        //     if(result.message === 'Invalid credentials'){
        //         throw 'Invalid credentials'
        //     } else {
        //         location.href = '/booking'
        // }
}