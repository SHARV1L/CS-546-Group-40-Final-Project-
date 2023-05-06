function validateForm(form) {
    const propertyName = form.propertyName.value.trim();
    const description = form.description.value.trim();
    const numberOfRooms = form.numberOfRooms.valueAsNumber;
    const numberOfBathrooms = form.numberOfBathrooms.valueAsNumber;
    const amenities=form.amenities.value.trim();
    const address = form.address.value.trim();
    const latitude = form.latitude.value.trim();
    const longitude = form.longitude.value.trim();
    const pricePerNight = form.pricePerNight.valueAsNumber;
  
    if (!propertyName) {
      alert('Property Name is required.');
      return false;
    }
  
    if (!description || description.length < 10) {
      alert('Description is required and must be at least 10 characters long.');
      return false;
    }
  
    if (isNaN(numberOfRooms) || numberOfRooms <= 0) {
      alert('Number of Rooms is required and must be greater than 0.');
      return false;
    }
  
    if (isNaN(numberOfBathrooms) || numberOfBathrooms <= 0) {
      alert('Number of Bathrooms is required and must be greater than 0.');
      return false;
    }
    if(!amenities){
        alert('Amenities is required');
        return false;
    }
  
    if (!address) {
      alert('Address is required.');
      return false;
    }
  
    if (!latitude || isNaN(latitude)) {
      alert('Latitude is required and must be a valid number.');
      return false;
    }
  
    if (!longitude || isNaN(longitude)) {
      alert('Longitude is required and must be a valid number.');
      return false;
    }
  
    if (isNaN(pricePerNight) || pricePerNight < 0) {
      alert('Price per Night is required and must be greater than or equal to 0.');
      return false;
    }
  
    return true;
  }
  
  flatpickr('#availability', {
    mode: 'range',
    dateFormat: 'Y-m-d',
    minDate: 'today'
  });
  
  const addPropertyButton = document.getElementById('add-property');
  addPropertyButton.addEventListener('click', function(event) {
    event.preventDefault(); // prevent the default form submission behavior
  
    const form = document.getElementById('add--property');
  
    // Perform form validation
    if (!validateForm(form)) {
      return;
    }
  
  
    form.submit(); // submit the form if validation is successful
   
  });
  