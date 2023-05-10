function validateSearchForm(form) {
  const location = form.location.value.trim();
  const charges = form.price.value.trim();
  const checkinDate = form.checkinDate.value.trim();
  const checkoutDate = form.checkoutDate.value.trim();
  const amenities = form.amenities.value.trim();
 console.log("form:",location,charges,checkinDate,checkoutDate,amenities);
  if (!location) {
    alert('Location is required.');
    return false;
  }

  if (!charges) {
    alert('Charges per night is required.');
    return false;
  }

  if (!checkinDate) {
    alert('Checkin Date is required.');
    return false;
  }
  if (!checkoutDate) {
    alert('Checkout Date is required.');
    return false;
  }
    
  if(checkinDate>checkoutDate){
    alert('Checkout Date should be greater.');
    return false;
  }
   
  const currentDate = new Date();
  currentDate.setHours(0,0,0,0)
  
  // Convert input strings to Date objects
  const checkIn = new Date(checkinDate);
  const checkOut = new Date(checkoutDate);

  // Check if check-in date is greater than or equal to the current date
  if (checkIn < currentDate) {
    alert("Check-in date should be greater than or equal to the current date.");
    return false;
  }

  // Check if check-out date is greater than the check-in date
  if (checkOut <= checkIn) {
    alert("Check-out date should be greater than the check-in date.");
    return false;
  }


  if (!amenities) {
    alert('Amenities are required.');
    return false;
  }
  
  return true;
}

const searchButton = document.getElementById('search-btn');
searchButton.addEventListener('click', function(event) {
  
  event.preventDefault(); // prevent the default form submission behavior
  alert('search!');
  const form = document.getElementById('search-form');

  // Perform form validation
  if (!validateSearchForm(form)) {
    return;
  }
else
 { form.submit();} // submit the form if validation is successful
});