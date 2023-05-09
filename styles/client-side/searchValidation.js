function validateSearchForm(form) {
    const location = form.location.value.trim();
    const charges = form.price.value.trim();
    const checkinDate = form.checkinDate.value.trim();
    const checkoutDate = form.checkoutDate.value.trim();
    const amenities = form.amenities.value.trim();
  
    if (!location) {
      alert('Location is required.');
      return false;
    }
  
    if (!charges) {
      alert('Charges per night is required.');
      return false;
    }
          
    // if (!availability) {
    //   alert('Availability is required.');
    //   return false;
    // }
  
    if (!amenities) {
      alert('Amenities are required.');
      return false;
    }
    
  
    return true;
  }
  
  const searchButton = document.getElementById('search-btn');
  searchButton.addEventListener('click', function(event) {
    event.preventDefault(); // prevent the default form submission behavior
  
    const form = document.getElementById('search-form');
  
    // Perform form validation
    if (!validateSearchForm(form)) {
      return;
    }
  
    form.submit(); // submit the form if validation is successful
  });
  